import { ShortLink } from '../entities/short-link.entity';

export interface ShortenLinkParams {
  originalUrl: string;
  customCode?: string;
  expiresAt?: string;
}

export interface ShortLinkGateway {
  shorten(params: ShortenLinkParams): Promise<ShortLink>;
}
