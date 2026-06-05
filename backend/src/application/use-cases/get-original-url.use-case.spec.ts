import { beforeEach, describe, expect, it } from "vitest";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { GetOriginalUrlUseCase } from "@/application/use-cases/get-original-url.use-case";
import type { ShortLinkRepository } from "@/domain/repositories/short-link.repository";
import { ShortLink } from "@/domain/entities/short-link.entity";
import { OriginalUrl } from "@/domain/value-objects/original-url.vo";
import { UrlCode } from "@/domain/value-objects/url-code.vo";
import { ExpirationDate } from "@/domain/value-objects/expiration-date.vo";

describe("GetOriginalUrlUseCase", () => {
  let mockRepo: DeepMocked<ShortLinkRepository>;
  let useCase: GetOriginalUrlUseCase;

  beforeEach(() => {
    mockRepo = createMock<ShortLinkRepository>();
    useCase = new GetOriginalUrlUseCase(mockRepo);
  });

  it("should return original url when not expired and code exists", async () => {
    const link = ShortLink.create({
      code: UrlCode.create("valid"),
      expiresAt: ExpirationDate.create(null),
      id: "uuid-1",
      originalUrl: OriginalUrl.create("https://google.com"),
    });
    mockRepo.findByCode.mockResolvedValue(link);

    const result = await useCase.execute("valid");
    expect(result).toBe("https://google.com");
  });

  it("should throw error when code does not exist", async () => {
    mockRepo.findByCode.mockResolvedValue(null);

    await expect(useCase.execute("missing")).rejects.toThrow(
      "Short link with code 'missing' not found.",
    );
  });

  it("should throw expired error when code is expired", async () => {
    const pastDate = new Date("2020-01-01");
    const expiredLink = ShortLink.create({
      code: UrlCode.create("expired"),
      expiresAt: ExpirationDate.create(pastDate, new Date("2019-01-01")),
      id: "uuid-2",
      originalUrl: OriginalUrl.create("https://google.com"),
    });
    mockRepo.findByCode.mockResolvedValue(expiredLink);

    await expect(useCase.execute("expired")).rejects.toThrow(/expired at/);
  });
});
