// backend/src/config/mongoose.ts
import mongoose from 'mongoose';
import { env } from './env.js';

export async function connectMongo(): Promise<void> {
  mongoose.set('strictQuery', true);
  await mongoose.connect(env.mongoUri);
}