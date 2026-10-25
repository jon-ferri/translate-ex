import { randomUUID } from "node:crypto";
import { Sentence } from "../../domain/entities/Sentence";
import { SentenceError } from "../../domain/errors/SentenceError";
import { Result } from "../../shared/Result";
import { SentenceRepository } from "../ports/SentenceRepository";
import { CreateSentenceUseCase } from "./CreateSentenceUseCase";

export class CreateSentence implements CreateSentenceUseCase {
    constructor(private readonly sentenceRepository: SentenceRepository) {}

    private validateSourceText(sourceText: string): Result<void, SentenceError> {
        if (sourceText.trim().length === 0) {
            return Result.fail({ errorType: "INVALID_SOURCE_TEXT" });
        }
        return Result.ok(undefined);
    }

    async execute(sourceText: string): Promise<Result<Sentence, SentenceError>> {
        const validation = this.validateSourceText(sourceText);
        if (validation.isFail()) {
            return Result.fail(validation.getError());
        }

        const normalizedText = sourceText.trim();

        const existingSentence = await this.sentenceRepository.findByText(normalizedText);
        if (existingSentence !== null) {
            return Result.fail({ errorType: "SENTENCE_ALREADY_EXISTS" });
        }

        const sentence = new Sentence(normalizedText, randomUUID());
        const saveResult = await this.sentenceRepository.save(sentence);
        if (saveResult.isFail()) {
            return Result.fail(saveResult.getError());
        }

        return Result.ok(sentence);
    }
}
