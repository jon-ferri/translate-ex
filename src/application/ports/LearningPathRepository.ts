import { LearningPath } from '../../domain/entities/LearningPath';
import { LearningPathError } from '../../domain/errors/LearningPathError';
import { Result } from '../../shared/Result';

export interface LearningPathRepository {
    save(name: string, description: string): Promise<Result<void, LearningPathError>>;
    findById(id: string): Promise<Result<LearningPath, LearningPathError>>;
    findAll(): Promise<Result<LearningPath[], LearningPathError>>;
    findAllActive(): Promise<Result<LearningPath[], LearningPathError>>;
}