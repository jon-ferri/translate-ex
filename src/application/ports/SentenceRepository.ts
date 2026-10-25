import { Sentence } from "../../domain/entities/Sentence";
import { SentenceError } from "../../domain/errors/SentenceError";
import { Result } from "../../shared/Result";

export interface SentenceRepository {
    findById(id: string): Promise<Sentence | null>;
    findByText(text: string): Promise<Sentence | null>;
    save(sentence: Sentence): Promise<Result<void, SentenceError>>;
    delete(id: string): Promise<Result<void, SentenceError>>;
}
