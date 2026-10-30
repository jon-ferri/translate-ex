import { Enrollment } from "../../domain/entities/Enrollment";
import { EnrollmentError } from "../../domain/errors/EnrollmentError";
import { Result } from "../../shared/Result";
import { EnrollmentRepository } from "../../application/ports/EnrollmentRepository";

export class InMemoryEnrollmentRepository implements EnrollmentRepository {
  private readonly enrollments = new Map<string, Enrollment>();

  async save(enrollment: Enrollment): Promise<Result<void, EnrollmentError>> {
    this.enrollments.set(enrollment.id, enrollment);
    return Result.ok(undefined);
  }

  async findById(id: string): Promise<Enrollment | null> {
    return this.enrollments.get(id) ?? null;
  }

  async findByUserId(userId: string): Promise<Enrollment[]> {
    return [...this.enrollments.values()].filter(
      (enrollment) => enrollment.userId === userId,
    );
  }

  // Test helper, not part of the port.
  getAll(): Enrollment[] {
    return [...this.enrollments.values()];
  }
}
