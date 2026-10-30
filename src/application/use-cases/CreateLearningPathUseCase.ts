import { LearningPathError } from "../../domain/errors/LearningPathError";
import { Result } from "../../shared/Result";
import { LearningPath } from "../../domain/entities/LearningPath";

export interface CreateLearningPathUseCase {
    execute(
        name: string,
        description: string,
        targetLanguageCode: string
    ): Promise<Result<LearningPath, LearningPathError>>;
}
