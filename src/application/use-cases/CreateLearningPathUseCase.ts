import { Language } from "../../domain/value-objects/Language";
import { LearningPathError } from "../../domain/errors/LearningPathError";
import { Result } from "../../shared/Result";

export interface CreateLearningPathUseCase {
    execute(
        userId: string,
        sourceLanguage: Language,
        targetLanguage: Language
    ): Promise<Result<string, LearningPathError>>;
}
