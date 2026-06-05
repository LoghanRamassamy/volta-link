import { Router } from "express";
import type { ShortenUrlController } from "../controllers/shorten-url.controller";
import type { RedirectUrlController } from "../controllers/redirect-url.controller";
import { createAuthMiddleware } from "../middlewares/auth.middleware";

export function createShortLinkRouter(
  shortenUrlController: ShortenUrlController,
  redirectUrlController: RedirectUrlController,
  apiKey: string,
): Router {
  const router = Router();
  const authMiddleware = createAuthMiddleware(apiKey);

  // Protected route: Create a new short link
  router.post("/api/shorten", authMiddleware, (req, res) => shortenUrlController.handle(req, res));

  // Public route: Redirect using the short code
  router.get("/:code", (req, res) => redirectUrlController.handle(req, res));

  return router;
}
