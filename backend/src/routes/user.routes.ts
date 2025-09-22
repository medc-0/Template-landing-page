import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { User } from '../models/User.js';

const router = Router();

router.get('/me', requireAuth, async (req, res) => {
  const user = await User.findById(req.userId).lean();
  return res.json(user ? { id: user._id, email: user.email, name: user.name } : null);
});

export default router;

