import { Request, Response, NextFunction } from 'express';

export const createAuthMiddleware = (expectedApiKey: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const providedKey = req.headers['x-api-key'];

    if (!providedKey || providedKey !== expectedApiKey) {
      res.status(401).json({ error: 'Unauthorized: Invalid or missing API Key' });
      return;
    }

    next();
  };
};
