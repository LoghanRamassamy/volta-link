import type { ShortLink } from "@/domain/entities/short-link.entity";

export interface ShortLinkRepository {
  save(shortLink: ShortLink): Promise<void>;
  findByCode(code: string): Promise<ShortLink | null>;
  codeExists(code: string): Promise<boolean>;
}
