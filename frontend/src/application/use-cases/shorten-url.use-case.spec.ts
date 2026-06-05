import type { Mocked } from "vitest";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { ShortenUrlUseCase } from "./shorten-url.use-case";
import type { ShortLinkGateway } from "../../domain/gateways/short-link-gateway.interface";
import type { HistoryRepository } from "../../domain/gateways/history-repository.interface";
import { ShortLink } from "../../domain/entities/short-link.entity";
import { OriginalUrl } from "../../domain/value-objects/original-url.vo";
import { ExpirationDate } from "../../domain/value-objects/expiration-date.vo";

describe("Frontend ShortenUrlUseCase", () => {
  let mockGateway: Mocked<ShortLinkGateway>;
  let mockRepo: Mocked<HistoryRepository>;
  let useCase: ShortenUrlUseCase;

  beforeEach(() => {
    mockGateway = {
      shorten: vi.fn(),
    };
    mockRepo = {
      clear: vi.fn(),
      getAll: vi.fn(),
      save: vi.fn(),
    };
    useCase = new ShortenUrlUseCase(mockGateway, mockRepo);
  });

  it("should validate inputs, request API, and update local history", async () => {
    const mockLink = ShortLink.create({
      code: "shortY",
      expiresAt: ExpirationDate.create(null),
      id: "uuid-1",
      originalUrl: OriginalUrl.create("https://example.com"),
    });

    mockGateway.shorten.mockResolvedValue(mockLink);

    const result = await useCase.execute({
      originalUrl: "https://example.com",
    });

    expect(result).toBe(mockLink);
    expect(mockGateway.shorten).toHaveBeenCalledWith({ originalUrl: "https://example.com" });
    expect(mockRepo.save).toHaveBeenCalledWith(mockLink);
  });

  it("should reject invalid URL string before calling the gateway", async () => {
    await expect(
      useCase.execute({
        originalUrl: "invalid-url",
      }),
    ).rejects.toThrow(/Invalid URL format/);

    expect(mockGateway.shorten).not.toHaveBeenCalled();
    expect(mockRepo.save).not.toHaveBeenCalled();
  });
});
