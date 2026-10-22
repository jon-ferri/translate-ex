import { LearningPath } from "../../domain/entities/LearningPath";
import { LearningPathError } from "../../domain/errors/LearningPathError";
import { Result } from "../../shared/Result";

export interface GetAvailableLearningPathsUseCase {
    execute(): Promise<Result<LearningPath[], LearningPathError>>;
}
