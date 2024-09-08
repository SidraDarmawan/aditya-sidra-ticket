import { NEXT_BASE_URL, SECRET_KEY } from '@/config'; // Pastikan SECRET_KEY diimpor dengan benar
import { transporter } from '@/libs/nodemailer';
import prisma from '@/prisma';
import { User } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

export const registerService = async (body: { referralCode?: string } & Omit<User, 'id'>) => {
  try {
    const { email, referralCode, role, ...userData } = body;

    // Periksa apakah email sudah ada
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

    // Generate kode referral unik
    const generatedReferralCode = uuidv4();

    // Buat atau update pengguna
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

    // Tangani poin dan diskon referral
    if (referralCode) {
      const referral = await prisma.referral.findUnique({
        where: { code: referralCode },
      });

      if (referral) {
        // Hitung tanggal kedaluwarsa (3 bulan dari sekarang)
        const now = new Date();
        const expiryDate = new Date(now.setMonth(now.getMonth() + 3));

        // Update poin referral dan masa berlaku
        await prisma.referral.update({
          where: { code: referralCode },
          data: {
            points: referral.points + 10000,
            expiresAt: expiryDate, // Masa berlaku referral
          },
        });

        // Update poin pengguna dan buat kupon diskon
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
              code: uuidv4(), // Gunakan uuidv4 untuk generate kode kupon
              expiresAt: expiryDate, // Kupon kedaluwarsa 3 bulan dari sekarang
            },
          });
        }
      }
    }

    // Generate token JWT
    const token = sign(
      { id: Number(newUser?.id) || existingUser?.id },
      SECRET_KEY,
      {
        expiresIn: '30m',
      }
    );

    // Buat link verifikasi
    const link = `${NEXT_BASE_URL}/verification?token=${token}`;

    // Kirim email verifikasi dengan HTML sederhana
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