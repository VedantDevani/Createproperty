import { authMiddleware } from "./../helpers/validation/auth-middleware";
import express from "express";
import {
  registerAgent,
  loginAgent,
  LogoutAgent,
  getPropertiesByAgent,
} from "../controllers/agent/agent-controller";
import passport from "passport";

const router = express.Router();

router.post("/register", registerAgent);
router.post("/login", loginAgent);
router.post("/:id/logout", authMiddleware, LogoutAgent);

// Protected routes that require authentication with JWT
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  getPropertiesByAgent
);

// Routes for Google Authentication


router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).json({ status: true, message: "Protected route accessed" });
  }
);


export default router;
