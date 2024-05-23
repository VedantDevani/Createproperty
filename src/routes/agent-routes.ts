// src/routes/agentRoutes.ts

import express from "express";
import {
  registerAgent,
  loginAgent,
  LogoutAgent,
  getPropertiesByAgent,
} from "../controllers/agent/agent-controller";
// import { authMiddleware } from '../helpers/middleware/authMiddleware';

const router = express.Router();

router.post("/register", registerAgent);
router.post("/login", loginAgent);
router.post("/:id/logout", LogoutAgent);
router.get("/:id", getPropertiesByAgent);

export default router;
