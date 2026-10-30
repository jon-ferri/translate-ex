import { Translation } from "../../domain/entities/Translation";
import { TranslationError } from "../../domain/errors/TranslationError";
import { SentenceError } from "../../domain/errors/SentenceError";
import { Result } from "../../shared/Result";
import { TranslationRepository } from "../../application/ports/TranslationRepository";
import { Language } from "../../domain/value-objects/Language";

export class InMemoryTranslationRepository implements TranslationRepository {
  private readonly translations = new Map<string, Translation>();

  async findById(id: string): Promise<Translation | null> {
    return this.translations.get(id) ?? null;
  }

  async findBySentenceIdAndLanguage(
    sentenceId: string,
    language: Language,
  ): Promise<Translation | null> {
    for (const translation of this.translations.values()) {
      if (
        translation.sentenceId === sentenceId &&
        translation.language.equals(language)
      ) {
        return translation;
      }
    }

    return null;
  }

  async save(
    translation: Translation,
  ): Promise<Result<void, TranslationError | SentenceError>> {
    this.translations.set(translation.id, translation);
    return Result.ok(undefined);
  }

  // Test helper, not part of the port.
  getAll(): Translation[] {
    return [...this.translations.values()];
  }
}
