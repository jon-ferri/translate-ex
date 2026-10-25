import { Result } from "../../shared/Result";
import { Translation } from "../../domain/entities/Translation";
import { Language } from "../../domain/value-objects/Language";
import { TranslationError } from "../../domain/errors/TranslationError";
import { SentenceError } from "../../domain/errors/SentenceError";

export interface TranslationRepository {
  findById(id: string): Promise<Translation | null>;
  findBySentenceIdAndLanguage(
    sentenceId: string,
    language: Language
  ): Promise<Translation | null>;
  save(translation: Translation): Promise<Result<void, TranslationError | SentenceError>>;
}
