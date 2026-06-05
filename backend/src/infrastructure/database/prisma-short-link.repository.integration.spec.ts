import { describe, it, expect, beforeEach } from "vitest";
import { PrismaShortLinkRepository } from "./prisma-short-link.repository";
import { prisma } from "../../../tests/setup-integration";
import { ShortLink } from "../../domain/entities/short-link.entity";
import { OriginalUrl } from "../../domain/value-objects/original-url.vo";
import { UrlCode } from "../../domain/value-objects/url-code.vo";
import { ExpirationDate } from "../../domain/value-objects/expiration-date.vo";

describe("PrismaShortLinkRepository (Integration)", () => {
  let repository: PrismaShortLinkRepository;

  beforeEach(() => {
    repository = new PrismaShortLinkRepository(prisma);
  });

  const createDummyShortLink = (code: string) => {
    return ShortLink.create({
      originalUrl: OriginalUrl.create("https://www.google.com"),
      code: UrlCode.create(code),
      expiresAt: ExpirationDate.create(null, new Date()),
    });
  };

  describe("save", () => {
    it("should successfully save a new short link to the database", async () => {
      const shortLink = createDummyShortLink("xyz123");
      await repository.save(shortLink);

      const saved = await prisma.shortLink.findUnique({
        where: { code: "xyz123" },
      });

      expect(saved).not.toBeNull();
      expect(saved?.originalUrl).toBe("https://www.google.com");
      expect(saved?.code).toBe("xyz123");
    });
  });

  describe("findByCode", () => {
    it("should return null if code does not exist", async () => {
      const result = await repository.findByCode("nonexist");
      expect(result).toBeNull();
    });

    it("should return a ShortLink entity if code exists", async () => {
      const shortLink = createDummyShortLink("findme");
      await repository.save(shortLink);

      const found = await repository.findByCode("findme");
      expect(found).not.toBeNull();
      expect(found?.code.value).toBe("findme");
      expect(found?.originalUrl.value).toBe("https://www.google.com");
    });
  });

  describe("codeExists", () => {
    it("should return false if code does not exist", async () => {
      const exists = await repository.codeExists("nonexist");
      expect(exists).toBe(false);
    });

    it("should return true if code exists", async () => {
      const shortLink = createDummyShortLink("exists");
      await repository.save(shortLink);

      const exists = await repository.codeExists("exists");
      expect(exists).toBe(true);
    });
  });
});
