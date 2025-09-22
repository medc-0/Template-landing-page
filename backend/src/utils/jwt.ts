import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export type JwtPayload = { sub: string; typ: 'access' | 'refresh' };

export function signAccessToken(userId: string): string {
  return jwt.sign({ sub: userId, typ: 'access' } satisfies JwtPayload, env.jwtAccessSecret, {
    expiresIn: '15m'
  });
}

export function signRefreshToken(userId: string): string {
  return jwt.sign({ sub: userId, typ: 'refresh' } satisfies JwtPayload, env.jwtRefreshSecret, {
    expiresIn: '7d'
  });
}

export function verifyAccessToken(token: string): JwtPayload {
  return jwt.verify(token, env.jwtAccessSecret) as JwtPayload;
}

export function verifyRefreshToken(token: string): JwtPayload {
  return jwt.verify(token, env.jwtRefreshSecret) as JwtPayload;
}
