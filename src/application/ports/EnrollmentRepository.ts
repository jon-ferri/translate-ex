import { Enrollment } from "../../domain/entities/Enrollment";
import { EnrollmentError } from "../../domain/errors/EnrollmentError";
import { Result } from "../../shared/Result";

export interface EnrollmentRepository {
  save(enrollment: Enrollment): Promise<Result<void, EnrollmentError>>;
  findById(id: string): Promise<Result<Enrollment, EnrollmentError>>;
  findByUserId(userId: string): Promise<Result<Enrollment[], EnrollmentError>>;
}
