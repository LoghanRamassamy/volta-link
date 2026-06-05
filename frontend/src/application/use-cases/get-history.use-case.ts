import { HistoryRepository } from '../../domain/gateways/history-repository.interface';
import { ShortLink } from '../../domain/entities/short-link.entity';

export class GetHistoryUseCase {
  constructor(private readonly historyRepository: HistoryRepository) {}

  public async execute(): Promise<ReadonlyArray<ShortLink>> {
    return this.historyRepository.getAll();
  }
}
