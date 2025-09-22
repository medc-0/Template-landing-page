import { Request, Response, NextFunction } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

export function notFoundHandler(_req: Request, res: Response) {
  res.status(StatusCodes.NOT_FOUND).json({ error: getReasonPhrase(StatusCodes.NOT_FOUND) });
}

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  const status = err.status ?? StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message ?? 'Internal Server Error';
  res.status(status).json({ error: message });
}
