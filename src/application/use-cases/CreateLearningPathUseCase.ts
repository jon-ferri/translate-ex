import { Language } from "../../domain/value-objects/Language";
import { LearningPathError } from "../../domain/errors/LearningPathError";
import { Result } from "../../shared/Result";
import { LearningPath } from "../../domain/entities/LearningPath";

export interface CreateLearningPathUseCase {
    execute(
        name: string,
        description: string,
        targetLanguage: Language
    ): Promise<Result<LearningPath, LearningPathError>>;
}
