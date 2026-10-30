import { LearningPath } from "../../domain/entities/LearningPath";
import { LearningPathError } from "../../domain/errors/LearningPathError";
import { Result } from "../../shared/Result";
import { LearningPathRepository } from "../../application/ports/LearningPathRepository";

export class InMemoryLearningPathRepository implements LearningPathRepository {
  private readonly learningPaths = new Map<string, LearningPath>();

  async save(learningPath: LearningPath): Promise<Result<void, LearningPathError>> {
    this.learningPaths.set(learningPath.id, learningPath);
    return Result.ok(undefined);
  }

  async findById(id: string): Promise<LearningPath | null> {
    return this.learningPaths.get(id) ?? null;
  }

  async findAll(): Promise<LearningPath[]> {
    return [...this.learningPaths.values()];
  }

  async findAllActive(): Promise<LearningPath[]> {
    return [...this.learningPaths.values()].filter((path) => path.isActive);
  }
}
