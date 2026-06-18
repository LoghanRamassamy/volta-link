import { Router } from "express";
import type { ShortenUrlController } from "@/presentation/controllers/shorten-url.controller";
import type { RedirectUrlController } from "@/presentation/controllers/redirect-url.controller";
import { createAuthMiddleware } from "@/presentation/middlewares/auth.middleware";

export function createShortLinkRouter(
  shortenUrlController: ShortenUrlController,
  redirectUrlController: RedirectUrlController,
): Router {
  const router = Router();

  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY is not defined");
  }

  const authMiddleware = createAuthMiddleware(apiKey);

  // Protected route: Create a new short link
  router.post("/api/shorten", authMiddleware, (req, res) => shortenUrlController.handle(req, res));

  // Public route: Redirect using the short code
  router.get("/:code", (req, res) => redirectUrlController.handle(req, res));

  return router;
}
