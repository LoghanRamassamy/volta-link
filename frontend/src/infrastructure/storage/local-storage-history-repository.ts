import type { HistoryRepository } from "../../domain/gateways/history-repository.interface";
import { ShortLink } from "../../domain/entities/short-link.entity";
import { OriginalUrl } from "../../domain/value-objects/original-url.vo";
import { ExpirationDate } from "../../domain/value-objects/expiration-date.vo";

export class LocalStorageHistoryRepository implements HistoryRepository {
  private readonly STORAGE_KEY = "volta_shorten_history";

  public async save(link: ShortLink): Promise<void> {
    const list = await this.getAll();
    // Prevent duplicates by checking code, append the new link
    const updated = [...list.filter((item) => item.code !== link.code), link];

    const serialized = updated.map((item) => ({
      code: item.code,
      createdAt: item.createdAt.toISOString(),
      expiresAt: item.expiresAt.value ? item.expiresAt.value.toISOString() : null,
      id: item.id,
      originalUrl: item.originalUrl.value,
    }));

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(serialized));
  }

  public async getAll(): Promise<readonly ShortLink[]> {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) {
      return [];
    }

    try {
      const parsed = JSON.parse(stored) as Record<string, unknown>[];
      return parsed.map((item) =>
        ShortLink.create({
          code: item.code,
          createdAt: new Date(item.createdAt),
          expiresAt: ExpirationDate.create(item.expiresAt),
          id: item.id,
          originalUrl: OriginalUrl.create(item.originalUrl),
        }),
      );
    } catch (error) {
      console.error("Failed to parse history from local storage:", error);
      return [];
    }
  }

  public async clear(): Promise<void> {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
