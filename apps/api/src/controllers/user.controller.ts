import { Request, Response, NextFunction } from 'express';
import { createReferralService, getReferralByCodeService, updateReferralPointsService } from '@/services/referral/referral.service'; // Pastikan path benar
import { getUsersService } from '@/services/user/get-user.service';
import { updateUserService } from '@/services/user/update-user.service';
import { deleteUserService } from '@/services/user/delete-user.service';
import { verifyRole } from '@/middlewares/verifyRole';

export class UserController {
  
  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        take: parseInt(req.query.take as string) || 8,
        page: parseInt(req.query.page as string) || 1,
        sortBy: (req.query.sortBy as string) || 'name',
        sortOrder: (req.query.sortOrder as string) || 'desc',
        search: (req.query.search as string) || '',
        role: (req.query.role as string) || 'all',
      };

      const result = await getUsersService(query);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const result = await updateUserService(id, req.body, res.locals.user);
  
      return res.status(200).send(result);
    } catch (error) {
     
      return res.status(400).send({ message: (error as Error).message });
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      verifyRole(['admin'])(req, res, next);
      const id = parseInt(req.params.id);
      const result = await deleteUserService(id, res.locals.user);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async createReferral(req: Request, res: Response, next: NextFunction) {
    try {
      const referralData = req.body;
      const referral = await createReferralService(referralData);
      return res.status(200).send(referral);
    } catch (error) {
      next(error);
    }
  }

  async getReferralByCode(req: Request, res: Response, next: NextFunction) {
    try {
      const { code } = req.params;
      const referral = await getReferralByCodeService(code);
      if (!referral) {
        return res.status(400).send({ message: 'Referral not found' });
      }
      return res.status(200).send(referral);
    } catch (error) {
      next(error);
    }
  }

  async updateReferralPoints(req: Request, res: Response, next: NextFunction) {
    try {
      const { code } = req.params;
      const { points } = req.body;
      const updatedReferral = await updateReferralPointsService(code, points);

      return res.status(200).send(updatedReferral);
    } catch (error) {
      next(error);
    }
  }
}