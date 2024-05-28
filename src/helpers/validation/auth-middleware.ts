//@ts-nocheck
import { Request, Response, NextFunction } from "express";
import passport from "../../config/passport";
import { IAgent } from "../../models/agent";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  passport.authenticate(
    "jwt",
    { session: false },
    (err: Error, user: IAgent | false) => {
      if (err || !user) {
        return res.status(401).json({ status: false, message: "Unauthorized" });
      }
      // If authentication is successful, attach the user object to the request
      req.user = user;
      next();
    }
  )(req, res, next);
};
