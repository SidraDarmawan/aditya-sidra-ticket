import { prisma } from '@/config/prismaClient';
import bcrypt from 'bcrypt'; // Pastikan bcrypt diimpor
import { changePasswordService } from '@/services/auth/change-password.service';
import { forgotPasswordService } from '@/services/auth/forgot-password.service';
import { getUserService } from '@/services/auth/get-user.service';
import { loginService } from '@/services/auth/login.service';
import { registerService } from '@/services/auth/register.service';
import { resetPasswordService } from '@/services/auth/reset-password.service';
import { sendChangePasswordService } from '@/services/auth/send-change-password.service';
import { updateUserDetailsService } from '@/services/auth/update-user-details.service';
import { verifyService } from '@/services/auth/verify.service';
import { NextFunction, Request, Response } from 'express';

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    const { email, password, name, role, referralCode } = req.body;

    try {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).send({ message: 'Email already registered' });
      }

      const hashedPassword = await bcrypt.hash(password, 10); 

      const userReferralCode = Math.random().toString(36).substr(2, 8).toUpperCase();

      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role,
          referralCode: userReferralCode,
          points: referralCode ? 10000 : 0, 
        },
      });

      if (referralCode) {
        const referrer = await prisma.user.findUnique({ where: { referralCode } });

        if (referrer) {
          await prisma.referral.create({
            data: {
              code: referralCode,
              userId: referrer.id,
              points: 10000,
            },
          });

          await prisma.user.update({
            where: { id: referrer.id },
            data: { points: { increment: 10000 } },
          });
        }
      }

      res.status(200).send({ message: 'User registered successfully', user: newUser });
    } catch (error) {
      next(error);
    }
  }

  async sendChangePasswordController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const id = Number(res.locals.user.id);
      const result = await sendChangePasswordService(id);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async changePasswordController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = Number(res.locals.user.id);
      const password = req.body.password;
      const result = await changePasswordService(userId, password);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async forgotPasswordController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await forgotPasswordService(req.body);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async resetPasswordController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = Number(res.locals.user.id);
      const password = req.body.password;
      const result = await resetPasswordService(userId, password);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async updateUserDetailsController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const files = req.files as Express.Multer.File[];
      const userId = Number(req.params.id);
      const result = await updateUserDetailsService(userId, req.body, files[0]);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
