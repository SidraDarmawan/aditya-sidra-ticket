import { NEXT_BASE_URL, SECRET_KEY } from '@/config'; 
import { transporter } from '@/libs/nodemailer';
import prisma from '@/prisma';
import { User } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

export const registerService = async (body: { referralCode?: string } & Omit<User, 'id'>) => {
  try {
    const { email, referralCode, role, ...userData } = body;

    const existingUser = await prisma.user.findFirst({
      where: { email },
    });

    const deletedUser = await prisma.user.findFirst({
      where: { email, isDelete: true },
    });

    if (existingUser && !deletedUser) {
      throw new Error('Email already exists');
    }

    let newUser;

    const generatedReferralCode = uuidv4();

    if (!existingUser) {
      newUser = await prisma.user.create({
        data: {
          ...userData,
          email,
          referralCode: generatedReferralCode,
          isVerified: false,
          role: role || 'USER',
        },
      });

    } else if (deletedUser) {
      newUser = await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          ...userData,
          isDelete: false,
          referralCode: existingUser.referralCode || generatedReferralCode,
        },
      });
    }


    if (referralCode) {
      const referral = await prisma.referral.findUnique({
        where: { code: referralCode },
      });

      if (referral) {
        const now = new Date();
        const expiryDate = new Date(now.setMonth(now.getMonth() + 3));
        
        await prisma.referral.update({
          where: { code: referralCode },
          data: {
            points: referral.points + 10000,
            expiresAt: expiryDate, // Masa berlaku referral
          },
        });

        if (newUser) {
          await prisma.user.update({
            where: { id: referral.userId },
            data: {
              points: {
                increment: 10000,
              },
            },
          });

          await prisma.coupon.create({
            data: {
              userId: newUser.id,
              discountPercentage: 10,
              code: uuidv4(), 
              expiresAt: expiryDate,
            },
          });
        }
      }
    }

    const token = sign(
      { id: Number(newUser?.id) || existingUser?.id },
      SECRET_KEY,
      {
        expiresIn: '30m',
      }
    );

    const link = `${NEXT_BASE_URL}/verification?token=${token}`;

    await transporter.sendMail({
      from: 'Admin <admin@example.com>',
      to: email,
      subject: 'Please verify your account',
      html: `<p>Hello ${newUser?.name},</p><p>Please verify your account by clicking the following link:</p><a href="${link}">${link}</a>`,
    });

    return {
      message: 'Register success, please check your email',
      token,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Registration failed: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred during registration.');
    }
  }
};
