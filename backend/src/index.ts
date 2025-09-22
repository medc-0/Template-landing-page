// backend/src/index.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { env } from './config/env.js';
import { connectMongo } from './config/mongoose.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import publicRouter from './routes/public.routes.js';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware.js';

async function bootstrap() {
  await connectMongo();

  const app = express();

  app.use(helmet());
  app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));
  app.use(express.json());
  app.use(cookieParser());

  app.use(
    cors({
      origin: env.corsOrigin,
      credentials: true
    })
  );

  app.get('/health', (_req, res) => {
    res.json({ ok: true, uptime: process.uptime() });
  });

  app.use('/api/auth', authRouter);
  app.use('/api/users', userRouter);
  app.use('/api/public', publicRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(env.port, () => {
    console.log(`API running on http://localhost:${env.port}`);
  });
}

bootstrap().catch((err) => {
  console.error('Fatal bootstrap error:', err);
  process.exit(1);
});