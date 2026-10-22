import { Lesson } from "../../domain/entities/Lesson";
import { Result } from "../../shared/Result";

export interface GetCurriculumUseCase {
    execute(sourceLanguage: string, targetLanguage: string): Promise<Result<Lesson[], Error>>;
}
