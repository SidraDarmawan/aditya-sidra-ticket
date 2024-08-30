import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!;

export class AuthController {
  static async register(req: Request, res: Response) {
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
      if (error instanceof Error) {
        res.status(400).send({ message: 'Server error', error: error.message });
      } else {
        res.status(400).send({ message: 'Server error', error: 'Unknown error' });
      }
    }
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(400).send({ message: 'Invalid credentials' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).send({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
        expiresIn: '1h',
      });

      res.status(200).send({ token });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ message: 'Server error', error: error.message });
      } else {
        res.status(400).send({ message: 'Server error', error: 'Unknown error' });
      }
    }
  }
}