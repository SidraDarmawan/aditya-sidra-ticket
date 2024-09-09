import { Request, Response, NextFunction } from 'express';

export const verifyRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = res.locals.user.role; // Role user seharusnya disimpan di res.locals.user

    if (!roles.includes(userRole)) {
      return res.status(400).send({ message: 'Access denied. Insufficient permissions.' });
    }

    next();
  };
};