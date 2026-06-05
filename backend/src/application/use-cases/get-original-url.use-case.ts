import { ShortLinkRepository } from '../../domain/repositories/short-link.repository';
import { UrlCode } from '../../domain/value-objects/url-code.vo';
import { LinkNotFoundError } from '../errors/link-not-found.error';
import { LinkExpiredError } from '../errors/link-expired.error';

export class GetOriginalUrlUseCase {
  constructor(private readonly shortLinkRepository: ShortLinkRepository) {}

  public async execute(code: string): Promise<string> {
    const codeVo = UrlCode.create(code);
    const shortLink = await this.shortLinkRepository.findByCode(codeVo.value);

    if (!shortLink) {
      throw new LinkNotFoundError(codeVo.value);
    }

    if (shortLink.isExpired()) {
      throw new LinkExpiredError(shortLink.code.value, shortLink.expiresAt.value!);
    }

    return shortLink.originalUrl.value;
  }
}
