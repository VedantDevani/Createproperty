import { Router, Request, Response, NextFunction } from "express";
import passport from "../config/passport";

const router = Router();

router.get("/", passport.authenticate("facebook", { scope: ["email"] }));

router.get(
  "/callback",
  passport.authenticate("facebook", {
    successRedirect: "/facebook/protected",
    failureRedirect: "/login",
  })
);

function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.sendStatus(401);
}

router.get("/protected", isLoggedIn, (req, res) => {
  res.send("Hello there, authenticated user via Facebook!");
});

export default router;
