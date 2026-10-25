import { randomUUID } from "node:crypto";
import { CreateTranslationUseCase } from "./CreateTranslationUseCase";
import { TranslationRepository } from "../ports/TranslationRepository";
import { SentenceRepository } from "../ports/SentenceRepository";
import { Result } from "../../shared/Result";
import { Translation } from "../../domain/entities/Translation";
import { TranslationError } from "../../domain/errors/TranslationError";
import { SentenceError } from "../../domain/errors/SentenceError";
import { Language } from "../../domain/value-objects/Language";
import { Level } from "../../domain/value-objects/Level";

// A translation is a sentence: one thousand characters is a generous limit.
const MAX_TEXT_LENGTH = 1000;

export class CreateTranslation implements CreateTranslationUseCase {
  constructor(
    private readonly translationRepository: TranslationRepository,
    private readonly sentenceRepository: SentenceRepository,
  ) {}

  private validateSentenceId(sentenceId: string): Result<void, SentenceError> {
    if (!sentenceId || sentenceId.trim().length === 0) {
      return Result.fail({ errorType: "SENTENCE_NOT_FOUND" });
    }
    return Result.ok(undefined);
  }

  private validateLanguage(language: Language): Result<void, TranslationError> {
    if (!language || !language.code || language.code.trim().length === 0) {
      return Result.fail({ errorType: "INVALID_LANGUAGE" });
    }
    return Result.ok(undefined);
  }

  private validateLevel(level: Level): Result<void, TranslationError> {
    if (!level || !level.name || level.name.trim().length === 0) {
      return Result.fail({ errorType: "INVALID_LEVEL" });
    }
    return Result.ok(undefined);
  }

  private validateText(text: string): Result<void, TranslationError> {
    if (!text || text.trim().length === 0) {
      return Result.fail({ errorType: "TEXT_CANNOT_BE_EMPTY" });
    }
    if (text.length > MAX_TEXT_LENGTH) {
      return Result.fail({ errorType: "INVALID_TEXT" });
    }
    return Result.ok(undefined);
  }

  async execute(
    sentenceId: string,
    language: Language,
    level: Level,
    text: string,
  ): Promise<Result<Translation, TranslationError | SentenceError>> {
    // Fail fast: validate all input before touching the database.
    const sentenceIdValidation = this.validateSentenceId(sentenceId);
    if (sentenceIdValidation.isFail()) {
      return Result.fail(sentenceIdValidation.getError());
    }

    const languageValidation = this.validateLanguage(language);
    if (languageValidation.isFail()) {
      return Result.fail(languageValidation.getError());
    }

    const levelValidation = this.validateLevel(level);
    if (levelValidation.isFail()) {
      return Result.fail(levelValidation.getError());
    }

    const textValidation = this.validateText(text);
    if (textValidation.isFail()) {
      return Result.fail(textValidation.getError());
    }

    const normalizedSentenceId = sentenceId.trim();

    // The sentence must exist before it can be translated.
    const sentence = await this.sentenceRepository.findById(normalizedSentenceId);
    if (!sentence) {
      return Result.fail({ errorType: "SENTENCE_NOT_FOUND" });
    }

    // One translation per sentence and language.
    const existingTranslation = await this.translationRepository.findBySentenceIdAndLanguage(
      sentence.id,
      language,
    );
    if (existingTranslation !== null) {
      return Result.fail({ errorType: "DUPLICATE_TRANSLATION_FOR_LANGUAGE" });
    }

    const translation = new Translation(randomUUID(), sentence.id, language, text, level);

    const saveResult = await this.translationRepository.save(translation);
    if (saveResult.isFail()) {
      return Result.fail(saveResult.getError());
    }

    return Result.ok(translation);
  }
}
