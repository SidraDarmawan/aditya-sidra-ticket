import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const createEventValidator = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters long'),
  body('description')
    .notEmpty()
    .withMessage('Description is required'),
  body('date')
    .isISO8601()
    .withMessage('Invalid date format')
    .notEmpty()
    .withMessage('Date is required'),
  body('location')
    .notEmpty()
    .withMessage('Location is required'),
  body('price')
    .optional()
    .isFloat({ gt: 0 })
    .withMessage('Price must be a positive number'),
  body('availableSeats')
    .isInt({ gt: 0 })
    .withMessage('Available seats must be a positive integer'),
  body('ticketTypes')
    .optional()
    .isArray()
    .withMessage('Ticket types must be an array'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    next();
  },
];