import { Result } from "../../shared/Result";
import { Translation } from "../../domain/entities/Translation";
import { TranslationError } from "../../domain/errors/TranslationError";
import { SentenceError } from "../../domain/errors/SentenceError";
import { Language } from "../../domain/value-objects/Language";
import { Level } from "../../domain/value-objects/Level";

export interface CreateTranslationUseCase {
    execute(
        sentenceId: string,
        language: Language,
        level: Level,
        text: string,
    ): Promise<Result<Translation, TranslationError | SentenceError>>;
}
