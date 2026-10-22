import { LearningPath } from '../../domain/entities/LearningPath';
import { LearningPathError } from '../../domain/errors/LearningPathError';
import { Result } from '../../shared/Result';

export interface LearningPathRepository {
    save(learningPath: LearningPath): Promise<Result<void, LearningPathError>>;
    findById(id: string): Promise<LearningPath | null>;
    findAll(): Promise<LearningPath[]>;
    findAllActive(): Promise<LearningPath[]>;
}