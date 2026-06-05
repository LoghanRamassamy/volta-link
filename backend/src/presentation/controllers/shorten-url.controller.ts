import type { Request, Response } from "express";
import type { ShortenUrlUseCase } from "@/application/use-cases/shorten-url.use-case";

export class ShortenUrlController {
  constructor(private readonly shortenUrlUseCase: ShortenUrlUseCase) {}

  public handle = async (req: Request, res: Response): Promise<void> => {
    try {
      const { originalUrl, customCode, expiresAt } = req.body;

      const result = await this.shortenUrlUseCase.execute({
        customCode,
        expiresAt,
        originalUrl,
      });

      res.status(201).json(result);
    } catch (error: unknown) {
      res.status(400).json({
        error: error instanceof Error ? error.message : "An error occurred",
      });
    }
  };
}
