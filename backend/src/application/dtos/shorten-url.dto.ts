export interface ShortenUrlRequest {
  readonly originalUrl: string;
  readonly customCode?: string;
  readonly expiresAt?: string;
}

export interface ShortenUrlResponse {
  readonly id: string;
  readonly originalUrl: string;
  readonly code: string;
  readonly createdAt: string;
  readonly expiresAt: string | null;
}
