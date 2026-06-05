import type { ShortLink } from "../entities/short-link.entity";

export interface HistoryRepository {
  save(link: ShortLink): Promise<void>;
  getAll(): Promise<readonly ShortLink[]>;
  clear(): Promise<void>;
}
