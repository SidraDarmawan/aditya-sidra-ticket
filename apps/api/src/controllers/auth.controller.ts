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
  async registerController(req: Request, res: Response, next: NextFunction) {
    try {
      const { referralNumber, ...userData } = req.body; 
      const result = await registerService({ ...userData, referralCode: referralNumber });

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async loginController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await loginService(req.body);

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async verifyController(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(res.locals.user.id);
      const password = req.body.password;
      const result = await verifyService(userId, password);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getUserController(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const result = await getUserService(Number(id));

      return res.status(200).send(result);
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