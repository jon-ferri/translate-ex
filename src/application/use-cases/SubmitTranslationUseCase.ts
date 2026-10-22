import { TranslationAnswer } from "../../domain/value-objects/TranslationAnswer";
import { Result } from "../../shared/Result";

export interface SubmitTranslationUseCase {
    execute(
        userId: string,
        translationId: string,
        answer: TranslationAnswer
    ): Promise<Result<number, Error>>;
}
