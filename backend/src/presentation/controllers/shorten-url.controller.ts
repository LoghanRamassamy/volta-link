import { Request, Response } from 'express';
import { ShortenUrlUseCase } from '../../application/use-cases/shorten-url.use-case';

export class ShortenUrlController {
  constructor(private readonly shortenUrlUseCase: ShortenUrlUseCase) {}

  public handle = async (req: Request, res: Response): Promise<void> => {
    try {
      const { originalUrl, customCode, expiresAt } = req.body;

      const result = await this.shortenUrlUseCase.execute({
        originalUrl,
        customCode,
        expiresAt,
      });

      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({
        error: error.message || 'An error occurred while shortening the URL.',
      });
    }
  };
}
