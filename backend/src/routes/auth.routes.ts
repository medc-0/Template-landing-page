import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import { User } from '../models/User.js';
import { loginSchema, registerSchema } from '../validators/auth.schema.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt.js';
import { env } from '../config/env.js';

const router = Router();

function setRefreshCookie(res: any, token: string) {
  res.cookie('refresh_token', token, {
    httpOnly: true,
    secure: env.nodeEnv === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    domain: env.cookieDomain
  });
}

router.post('/register', async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: parsed.error.flatten() });
  }
  const { email, name, password } = parsed.data;

  const existing = await User.findOne({ email }).lean();
  if (existing) {
    return res.status(StatusCodes.CONFLICT).json({ error: 'Email already in use' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, name, passwordHash });

  const accessToken = signAccessToken(user.id);
  const refreshToken = signRefreshToken(user.id);
  setRefreshCookie(res, refreshToken);

  return res.status(StatusCodes.CREATED).json({
    user: { id: user.id, email: user.email, name: user.name },
    accessToken
  });
});

router.post('/login', async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: parsed.error.flatten() });
  }
  const { email, password } = parsed.data;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid credentials' });
  }

  const valid = await user.comparePassword(password);
  if (!valid) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid credentials' });
  }

  const accessToken = signAccessToken(user.id);
  const refreshToken = signRefreshToken(user.id);
  setRefreshCookie(res, refreshToken);

  return res.json({
    user: { id: user.id, email: user.email, name: user.name },
    accessToken
  });
});

router.post('/refresh', async (req, res) => {
  const token = req.cookies?.refresh_token as string | undefined;
  if (!token) return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Missing refresh token' });

  try {
    const payload = verifyRefreshToken(token);
    if (payload.typ !== 'refresh') throw new Error('Invalid token typ');
    const accessToken = signAccessToken(payload.sub);
    return res.json({ accessToken });
  } catch {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid refresh token' });
  }
});

router.post('/logout', async (_req, res) => {
  res.clearCookie('refresh_token', {
    httpOnly: true,
    secure: env.nodeEnv === 'production',
    sameSite: 'lax',
    domain: env.cookieDomain
  });
  return res.status(204).send();
});

export default router;

