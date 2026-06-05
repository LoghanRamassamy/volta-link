import { ShortLinkGateway, ShortenLinkParams } from '../../domain/gateways/short-link-gateway.interface';
import { HistoryRepository } from '../../domain/gateways/history-repository.interface';
import { ShortLink } from '../../domain/entities/short-link.entity';
import { OriginalUrl } from '../../domain/value-objects/original-url.vo';
import { ExpirationDate } from '../../domain/value-objects/expiration-date.vo';

export class ShortenUrlUseCase {
  constructor(
    private readonly gateway: ShortLinkGateway,
    private readonly historyRepository: HistoryRepository
  ) {}

  public async execute(params: ShortenLinkParams): Promise<ShortLink> {
    // Perform value object validations before API requests
    OriginalUrl.create(params.originalUrl);
    ExpirationDate.create(params.expiresAt);

    const result = await this.gateway.shorten(params);
    await this.historyRepository.save(result);
    return result;
  }
}
