import { Router } from 'express';
import { ShortenUrlController } from '../controllers/shorten-url.controller';
import { RedirectUrlController } from '../controllers/redirect-url.controller';

export function createShortLinkRouter(
  shortenController: ShortenUrlController,
  redirectController: RedirectUrlController
): Router {
  const router = Router();

  router.post('/api/shorten', shortenController.handle);
  router.get('/:code', redirectController.handle);

  return router;
}
