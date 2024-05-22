// src/helpers/middleware/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import passport from '../../config/passport';
import { IUser } from '../../types/user-types';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    'jwt',
    { session: false },
    (err: Error | null, user: IUser | false, info: any) => {
      if (err || !user) {
        return res.status(401).json({ status: false, message: 'Unauthorized' });
      }
      req.user = user;
      next();
    }
  )(req, res, next);
};
