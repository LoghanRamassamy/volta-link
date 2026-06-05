import type { Express } from "express";
import express from "express";
import cors from "cors";
import type { PrismaClient } from "@prisma/client";
import { PrismaShortLinkRepository } from "@/infrastructure/database/prisma-short-link.repository";
import { CryptoCodeGenerator } from "@/infrastructure/services/crypto-code-generator.service";
import { ShortenUrlUseCase } from "@/application/use-cases/shorten-url.use-case";
import { GetOriginalUrlUseCase } from "@/application/use-cases/get-original-url.use-case";
import { ShortenUrlController } from "@/presentation/controllers/shorten-url.controller";
import { RedirectUrlController } from "@/presentation/controllers/redirect-url.controller";
import { createShortLinkRouter } from "@/presentation/routes/short-link.routes";

export function createExpressApp(prisma: PrismaClient): Express {
  const app = express();

  // Enable CORS for frontend client
  app.use(cors());
  app.use(express.json());

  // Wire up dependencies (Clean Architecture Dependency Injection)
  const shortLinkRepository = new PrismaShortLinkRepository(prisma);
  const codeGenerator = new CryptoCodeGenerator();

  const shortenUrlUseCase = new ShortenUrlUseCase(shortLinkRepository, codeGenerator);
  const getOriginalUrlUseCase = new GetOriginalUrlUseCase(shortLinkRepository);

  const shortenUrlController = new ShortenUrlController(shortenUrlUseCase);
  const redirectUrlController = new RedirectUrlController(getOriginalUrlUseCase);

  const apiKey = process.env.API_KEY || "default-secret-key";
  const router = createShortLinkRouter(shortenUrlController, redirectUrlController, apiKey);
  app.use(router);

  return app;
}
