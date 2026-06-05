import type { PrismaClient } from "@prisma/client";
import type { ShortLinkRepository } from "../../domain/repositories/short-link.repository";
import { ShortLink } from "../../domain/entities/short-link.entity";
import { OriginalUrl } from "../../domain/value-objects/original-url.vo";
import { UrlCode } from "../../domain/value-objects/url-code.vo";
import { ExpirationDate } from "../../domain/value-objects/expiration-date.vo";

export class PrismaShortLinkRepository implements ShortLinkRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public async save(shortLink: ShortLink): Promise<void> {
    await this.prisma.shortLink.upsert({
      create: {
        code: shortLink.code.value,
        createdAt: shortLink.createdAt,
        expiresAt: shortLink.expiresAt.value,
        id: shortLink.id,
        originalUrl: shortLink.originalUrl.value,
      },
      update: {
        expiresAt: shortLink.expiresAt.value,
        originalUrl: shortLink.originalUrl.value,
      },
      where: { code: shortLink.code.value },
    });
  }

  public async findByCode(code: string): Promise<ShortLink | null> {
    const record = await this.prisma.shortLink.findUnique({
      where: { code },
    });

    if (!record) {
      return null;
    }

    // Map database record to domain entity
    return ShortLink.create({
      code: UrlCode.create(record.code),
      createdAt: record.createdAt,
      expiresAt: ExpirationDate.create(record.expiresAt),
      id: record.id,
      originalUrl: OriginalUrl.create(record.originalUrl),
    });
  }

  public async codeExists(code: string): Promise<boolean> {
    const count = await this.prisma.shortLink.count({
      where: { code },
    });
    return count > 0;
  }
}
