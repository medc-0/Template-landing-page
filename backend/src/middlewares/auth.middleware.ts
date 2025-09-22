import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verifyAccessToken } from '../utils/jwt.js';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization ?? '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : undefined;

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Missing access token' });
  }

  try {
    const payload = verifyAccessToken(token);
    if (payload.typ !== 'access') throw new Error('Invalid token typ');
    req.userId = payload.sub;
    next();
  } catch {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid or expired token' });
  }
}
