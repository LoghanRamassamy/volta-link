import { ShortLink } from "../../domain/entities/short-link.entity";
import type { ShortLinkRepository } from "../../domain/repositories/short-link.repository";
import { OriginalUrl } from "../../domain/value-objects/original-url.vo";
import { UrlCode } from "../../domain/value-objects/url-code.vo";
import { ExpirationDate } from "../../domain/value-objects/expiration-date.vo";
import type { CodeGenerator } from "../interfaces/code-generator.interface";
import type { ShortenUrlRequest, ShortenUrlResponse } from "../dtos/shorten-url.dto";
import * as crypto from "crypto";

export class ShortenUrlUseCase {
  constructor(
    private readonly shortLinkRepository: ShortLinkRepository,
    private readonly codeGenerator: CodeGenerator,
  ) {}

  public async execute(request: ShortenUrlRequest): Promise<ShortenUrlResponse> {
    const originalUrlVo = OriginalUrl.create(request.originalUrl);
    const expiresAtVo = ExpirationDate.create(request.expiresAt);

    const codeVo = request.customCode
      ? await this.validateCustomCode(request.customCode)
      : await this.generateUniqueCode();

    const shortLinkId = crypto.randomUUID();
    const shortLink = ShortLink.create({
      code: codeVo,
      expiresAt: expiresAtVo,
      id: shortLinkId,
      originalUrl: originalUrlVo,
    });

    await this.shortLinkRepository.save(shortLink);

    return {
      code: shortLink.code.value,
      createdAt: shortLink.createdAt.toISOString(),
      expiresAt: shortLink.expiresAt.value ? shortLink.expiresAt.value.toISOString() : null,
      id: shortLink.id,
      originalUrl: shortLink.originalUrl.value,
    };
  }

  private async validateCustomCode(customCode: string): Promise<UrlCode> {
    const codeVo = UrlCode.create(customCode);
    const exists = await this.shortLinkRepository.codeExists(codeVo.value);
    if (exists) {
      throw new Error("This custom code is already in use.");
    }
    return codeVo;
  }

  private async generateUniqueCode(attempts: number = 0): Promise<UrlCode> {
    if (attempts > 10) {
      throw new Error("Could not generate a unique short code after several attempts.");
    }

    const generatedCode = this.codeGenerator.generate(6);
    const exists = await this.shortLinkRepository.codeExists(generatedCode);

    return exists ? this.generateUniqueCode(attempts + 1) : UrlCode.create(generatedCode);
  }
}
