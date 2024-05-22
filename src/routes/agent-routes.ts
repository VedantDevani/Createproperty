import express from 'express';
import { registerAgent, loginAgent,getAgentDetails } from '../controllers/agent/agent-controller';
import passport from 'passport';
import { authMiddleware } from '../helpers/middleware/authMiddleware';

const router = express.Router();

// Register agent
router.post('/register', registerAgent);


// Login agent
router.post('/login', loginAgent);

router.get('/profile', authMiddleware, getAgentDetails);

router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.status(200).json({ status: true, message: 'Protected route accessed' });
  });



export default router;
