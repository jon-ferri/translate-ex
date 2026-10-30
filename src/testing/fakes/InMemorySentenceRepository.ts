import { Sentence } from "../../domain/entities/Sentence";
import { SentenceError } from "../../domain/errors/SentenceError";
import { Result } from "../../shared/Result";
import { SentenceRepository } from "../../application/ports/SentenceRepository";

export class InMemorySentenceRepository implements SentenceRepository {
  private readonly sentences = new Map<string, Sentence>();

  async findById(id: string): Promise<Sentence | null> {
    return this.sentences.get(id) ?? null;
  }

  async findByText(text: string): Promise<Sentence | null> {
    const normalizedText = text.trim();

    for (const sentence of this.sentences.values()) {
      if (sentence.getText() === normalizedText) {
        return sentence;
      }
    }

    return null;
  }

  async save(sentence: Sentence): Promise<Result<void, SentenceError>> {
    this.sentences.set(sentence.id, sentence);
    return Result.ok(undefined);
  }

  async delete(id: string): Promise<Result<void, SentenceError>> {
    this.sentences.delete(id);
    return Result.ok(undefined);
  }

  // Test helper, not part of the port.
  getAll(): Sentence[] {
    return [...this.sentences.values()];
  }
}
