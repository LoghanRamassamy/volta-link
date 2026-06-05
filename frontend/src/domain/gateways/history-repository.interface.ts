import { ShortLink } from '../entities/short-link.entity';

export interface HistoryRepository {
  save(link: ShortLink): Promise<void>;
  getAll(): Promise<ReadonlyArray<ShortLink>>;
  clear(): Promise<void>;
}
