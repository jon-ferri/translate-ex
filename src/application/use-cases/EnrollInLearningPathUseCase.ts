import { Enrollment } from '../../domain/entities/Enrollment';
import { EnrollmentError } from '../../domain/errors/EnrollmentError';
import { Result } from '../../shared/Result';

export interface EnrollInLearningPathUseCase {
    execute(
        userId: string,
        learningPathId: string,
        sourceLanguageCode: string,
    ): Promise<Result<Enrollment, EnrollmentError>>;
}   
