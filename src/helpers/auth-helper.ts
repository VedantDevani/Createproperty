// import { Request, Response, NextFunction } from "express";
// import passport from "../config/passport";
// import { IUser } from "../types/user-types";
// 
// export const authMiddleware = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   if (req.isAuthenticated()) {
//     return next();
//   }
// 
//   passport.authenticate(
//     "jwt",
//     { session: false },
//     (err: Error, user: IUser | false) => {
//       if (err || !user) {
//         return res.status(401).json({ status: false, message: "Unauthorized" });
//       }
//       // If authentication is successful, attach the user object to the request
//       req.user = user;
//       next();
//     }
//   )(req, res, next);
// };
// 