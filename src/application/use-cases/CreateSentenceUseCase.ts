import { Sentence } from "../../domain/entities/Sentence";
import { SentenceError } from "../../domain/errors/SentenceError";
import { Result } from "../../shared/Result";

export interface CreateSentenceUseCase {
    execute(sourceText: string): Promise<Result<Sentence, SentenceError>>;
}
