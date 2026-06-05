import { PrismaClient } from '@prisma/client';
import { ShortLinkRepository } from '../../domain/repositories/short-link.repository';
import { ShortLink } from '../../domain/entities/short-link.entity';
import { OriginalUrl } from '../../domain/value-objects/original-url.vo';
import { UrlCode } from '../../domain/value-objects/url-code.vo';
import { ExpirationDate } from '../../domain/value-objects/expiration-date.vo';

export class PrismaShortLinkRepository implements ShortLinkRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public async save(shortLink: ShortLink): Promise<void> {
    await this.prisma.shortLink.upsert({
      where: { code: shortLink.code.value },
      update: {
        originalUrl: shortLink.originalUrl.value,
        expiresAt: shortLink.expiresAt.value,
      },
      create: {
        id: shortLink.id,
        code: shortLink.code.value,
        originalUrl: shortLink.originalUrl.value,
        createdAt: shortLink.createdAt,
        expiresAt: shortLink.expiresAt.value,
      },
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
      id: record.id,
      originalUrl: OriginalUrl.create(record.originalUrl),
      code: UrlCode.create(record.code),
      createdAt: record.createdAt,
      expiresAt: ExpirationDate.create(record.expiresAt),
    });
  }

  public async codeExists(code: string): Promise<boolean> {
    const count = await this.prisma.shortLink.count({
      where: { code },
    });
    return count > 0;
  }
}
