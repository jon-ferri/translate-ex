import { Result } from "../../shared/Result";
import { Translation } from "../../domain/entities/Translation";
import { TranslationError } from "../../domain/errors/TranslationError";
import { SentenceError } from "../../domain/errors/SentenceError";

export interface CreateTranslationUseCase {
    execute(
        sentenceId: string,
        languageCode: string,
        levelName: string,
        text: string,
    ): Promise<Result<Translation, TranslationError | SentenceError>>;
}
