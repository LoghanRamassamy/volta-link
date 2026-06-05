import { describe, it, expect, beforeEach, vi, Mocked } from 'vitest';
import { ShortenUrlUseCase } from './shorten-url.use-case';
import { ShortLinkRepository } from '../../domain/repositories/short-link.repository';
import { CodeGenerator } from '../interfaces/code-generator.interface';

describe('ShortenUrlUseCase', () => {
  let mockRepo: Mocked<ShortLinkRepository>;
  let mockGenerator: Mocked<CodeGenerator>;
  let useCase: ShortenUrlUseCase;

  beforeEach(() => {
    mockRepo = {
      save: vi.fn(),
      findByCode: vi.fn(),
      codeExists: vi.fn(),
    };
    mockGenerator = {
      generate: vi.fn(),
    };
    useCase = new ShortenUrlUseCase(mockRepo, mockGenerator);
  });

  it('should successfully shorten a url with a generated code', async () => {
    mockRepo.codeExists.mockResolvedValue(false);
    mockGenerator.generate.mockReturnValue('genXYZ');

    const result = await useCase.execute({
      originalUrl: 'https://google.com',
    });

    expect(result.code).toBe('genXYZ');
    expect(result.originalUrl).toBe('https://google.com');
    expect(mockRepo.save).toHaveBeenCalled();
  });

  it('should throw error if custom code is already in use', async () => {
    mockRepo.codeExists.mockResolvedValue(true);

    await expect(
      useCase.execute({
        originalUrl: 'https://google.com',
        customCode: 'custom1',
      })
    ).rejects.toThrow('This custom code is already in use.');
  });
});
