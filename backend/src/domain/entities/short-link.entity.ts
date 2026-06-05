import { OriginalUrl } from '../value-objects/original-url.vo';
import { UrlCode } from '../value-objects/url-code.vo';
import { ExpirationDate } from '../value-objects/expiration-date.vo';

export class ShortLink {
  public readonly id: string;
  public readonly originalUrl: OriginalUrl;
  public readonly code: UrlCode;
  public readonly createdAt: Date;
  public readonly expiresAt: ExpirationDate;

  private constructor(
    id: string,
    originalUrl: OriginalUrl,
    code: UrlCode,
    createdAt: Date,
    expiresAt: ExpirationDate
  ) {
    this.id = id;
    this.originalUrl = originalUrl;
    this.code = code;
    this.createdAt = createdAt;
    this.expiresAt = expiresAt;
    Object.freeze(this);
  }

  public static create(properties: {
    id: string;
    originalUrl: OriginalUrl;
    code: UrlCode;
    createdAt?: Date;
    expiresAt: ExpirationDate;
  }): ShortLink {
    return new ShortLink(
      properties.id,
      properties.originalUrl,
      properties.code,
      properties.createdAt || new Date(),
      properties.expiresAt
    );
  }

  public isExpired(now: Date = new Date()): boolean {
    if (this.expiresAt.value === null) {
      return false;
    }
    return now.getTime() > this.expiresAt.value.getTime();
  }
}
