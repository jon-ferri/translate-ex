import { LearningPathError } from "../../domain/errors/LearningPathError";
import { Result } from "../../shared/Result";

export interface SwitchActiveLearningPathUseCase {
    execute(
        userId: string,
        learningPathId: string
    ): Promise<Result<void, LearningPathError>>;
}
