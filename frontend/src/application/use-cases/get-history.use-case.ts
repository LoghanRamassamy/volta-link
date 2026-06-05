import type { HistoryRepository } from "../../domain/gateways/history-repository.interface";
import type { ShortLink } from "../../domain/entities/short-link.entity";

export class GetHistoryUseCase {
  constructor(private readonly historyRepository: HistoryRepository) {}

  public async execute(): Promise<readonly ShortLink[]> {
    return this.historyRepository.getAll();
  }
}
