import { authMiddleware } from "./../helpers/validation/auth-middleware";
import express, { Request, Response, NextFunction } from "express";
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

// Protected routes that require authentication with JWT
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  getPropertiesByAgent
);

router.post("/:id/logout", authMiddleware, LogoutAgent);

export default router;
