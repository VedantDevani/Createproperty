import { Router, Request, Response, NextFunction } from "express";
import passport from "../config/passport";

const router = Router();

// Route for initiating Google OAuth authentication
router.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/callback",
  passport.authenticate("google", {
    successRedirect: "/google/protected",
    failureRedirect: "/login",
  })
);

function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.sendStatus(401);
}

// Protected route example
router.get("/protected", isLoggedIn, (req, res) => {
  res.send("Hello there, authenticated user!");
});

export default router;
