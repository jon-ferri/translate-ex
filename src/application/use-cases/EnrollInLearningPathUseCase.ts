import { Enrollment } from '../../domain/entities/Enrollment';
import { EnrollmentError } from '../../domain/errors/EnrollmentError';
import { Language } from '../../domain/value-objects/Language';
import { Result } from '../../shared/Result';

export interface EnrollInLearningPathUseCase {
    execute(
        userId: string,
        learningPathId: string,
        sourceLanguage: Language,
    ): Promise<Result<Enrollment, EnrollmentError>>;
}   