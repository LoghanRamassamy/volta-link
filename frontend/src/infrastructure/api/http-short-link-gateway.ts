import type {
  ShortLinkGateway,
  ShortenLinkParams,
} from "../../domain/gateways/short-link-gateway.interface";
import { ShortLink } from "../../domain/entities/short-link.entity";
import { OriginalUrl } from "../../domain/value-objects/original-url.vo";
import { ExpirationDate } from "../../domain/value-objects/expiration-date.vo";

export class HttpShortLinkGateway implements ShortLinkGateway {
  constructor(private readonly baseUrl: string) {}

  public async shorten(params: ShortenLinkParams): Promise<ShortLink> {
    const response = await fetch(`${this.baseUrl}/api/shorten`, {
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_API_KEY || "default-secret-key",
      },
      method: "POST",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "DEFAULT_GATEWAY_ERROR");
    }

    // Map network response DTO to Domain Entity
    return ShortLink.create({
      code: data.code,
      createdAt: new Date(data.createdAt),
      expiresAt: ExpirationDate.create(data.expiresAt),
      id: data.id,
      originalUrl: OriginalUrl.create(data.originalUrl),
    });
  }
}
