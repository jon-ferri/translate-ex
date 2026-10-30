import { test } from "node:test";
import assert from "node:assert/strict";
import { CreateSentence } from "./CreateSentence";
import { InMemorySentenceRepository } from "../../testing/fakes/InMemorySentenceRepository";
import { SentenceError } from "../../domain/errors/SentenceError";
import { Result } from "../../shared/Result";

test("creates and stores a sentence", async () => {
  const repository = new InMemorySentenceRepository();
  const useCase = new CreateSentence(repository);

  const result = await useCase.execute("The cat sleeps.");

  assert.equal(result.isOk(), true);
  const sentence = result.getValue();
  assert.equal(sentence.getText(), "The cat sleeps.");
  assert.equal((await repository.findById(sentence.id))?.getText(), "The cat sleeps.");
});

test("trims the source text before storing it", async () => {
  const repository = new InMemorySentenceRepository();
  const useCase = new CreateSentence(repository);

  const result = await useCase.execute("  Hello.  ");

  assert.equal(result.getValue().getText(), "Hello.");
});

test("rejects empty source text", async () => {
  const repository = new InMemorySentenceRepository();
  const useCase = new CreateSentence(repository);

  const result = await useCase.execute("   ");

  assert.equal(result.isFail(), true);
  assert.deepEqual(result.getError(), { errorType: "INVALID_SOURCE_TEXT" });
  assert.equal(repository.getAll().length, 0);
});

test("rejects a sentence that already exists", async () => {
  const repository = new InMemorySentenceRepository();
  const useCase = new CreateSentence(repository);

  await useCase.execute("The cat sleeps.");
  const result = await useCase.execute("  The cat sleeps.  ");

  assert.deepEqual(result.getError(), { errorType: "SENTENCE_ALREADY_EXISTS" });
  assert.equal(repository.getAll().length, 1);
});

test("reports a persistence failure through Result", async () => {
  class FailingSentenceRepository extends InMemorySentenceRepository {
    override async save(): Promise<Result<void, SentenceError>> {
      return Result.fail({ errorType: "UNABLE_TO_SAVE_SENTENCE" });
    }
  }

  const useCase = new CreateSentence(new FailingSentenceRepository());

  const result = await useCase.execute("The cat sleeps.");

  assert.deepEqual(result.getError(), { errorType: "UNABLE_TO_SAVE_SENTENCE" });
});
