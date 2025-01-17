import { body, param } from 'express-validator';

export const TodoValidator = [
  body('title').isString().notEmpty().withMessage('Title is required'),
  body('description').isString().withMessage('Description must be a string'),
];

export const TodoIdValidator = [
  param('id').isUUID().withMessage('Invalid Todo ID'),
];
