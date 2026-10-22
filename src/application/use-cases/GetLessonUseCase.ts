import { Lesson } from "../../domain/entities/Lesson";
import { Result } from "../../shared/Result";
import { LessonError } from "../../domain/errors/LessonError";

export interface GetLessonUseCase {
    execute(lessonId: string): Promise<Result<Lesson, LessonError>>;

}


