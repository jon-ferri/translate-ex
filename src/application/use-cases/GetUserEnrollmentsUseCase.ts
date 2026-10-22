import { Enrollment } from '../../domain/entities/Enrollment';
import { EnrollmentError } from '../../domain/errors/EnrollmentError';
import { Result } from '../../shared/Result';

export interface GetUserEnrollmentsUseCase {
    execute(userId: string): Promise<Result<Enrollment[], EnrollmentError>>;
}