// src/routes/agentRoutes.ts

import express from 'express';
import {
  registerAgent,
  loginAgent,
  getAgentDetails,
  LogoutAgent
} from '../controllers/agent/agent-controller';
// import { authMiddleware } from '../helpers/middleware/authMiddleware';

const router = express.Router();

router.post('/register', registerAgent);
router.post('/login', loginAgent);
router.get('/details/:id', getAgentDetails);
router.post('/:id/logout', LogoutAgent);

export default router;
