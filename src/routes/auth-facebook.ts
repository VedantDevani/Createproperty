import { Router, Request, Response, NextFunction } from "express";
import passport from "../config/passport";

const router = Router();

// Route for initiating Facebook OAuth authentication
router.get("/", passport.authenticate("facebook", { scope: ["email"] }));

// Route for handling Facebook OAuth callback
router.get(
  "/callback",
  passport.authenticate("facebook", {
    successRedirect: "/facebook/protected", // Redirect to a protected route on successful authentication
    failureRedirect: "/login", // Redirect to login page on authentication failure
  })
);

// Middleware function to check if user is authenticated
function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.sendStatus(401); // Unauthorized if not authenticated
}

// Protected route example
router.get("/protected", isLoggedIn, (req, res) => {
  res.send("Hello there, authenticated user via Facebook!");
});

export default router;
