import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const createUserValidator = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long'),
  body('email')
    .isEmail()
    .withMessage('Invalid email format')
    .notEmpty()
    .withMessage('Email is required'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('role')
    .isIn(['customer', 'organizer'])
    .withMessage('Invalid role')
    .notEmpty()
    .withMessage('Role is required'),
  body('referralCode').optional().isString().withMessage('Referral code must be a string'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    next();
  },
];