import type { Request, Response } from "express";
import type { GetOriginalUrlUseCase } from "@/application/use-cases/get-original-url.use-case";
import { LinkNotFoundError } from "@/application/errors/link-not-found.error";
import { LinkExpiredError } from "@/application/errors/link-expired.error";

export class RedirectUrlController {
  constructor(private readonly getOriginalUrlUseCase: GetOriginalUrlUseCase) {}

  public handle = async (req: Request, res: Response): Promise<void> => {
    try {
      const code = String(req.params.code);
      const originalUrl = await this.getOriginalUrlUseCase.execute(code);
      res.redirect(302, originalUrl);
    } catch (error: unknown) {
      if (error instanceof LinkNotFoundError) {
        res.status(404).json({ error: "Link Not Found" });
        return;
      }

      if (error instanceof LinkExpiredError) {
        res.status(410).json({ error: "Link Expired" });
        return;
      }

      res.status(400).json({ error: error instanceof Error ? error.message : "An error occurred" });
    }
  };
}
