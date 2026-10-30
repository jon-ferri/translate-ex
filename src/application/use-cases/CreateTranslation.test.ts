import { test } from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { CreateTranslation } from "./CreateTranslation";
import { InMemorySentenceRepository } from "../../testing/fakes/InMemorySentenceRepository";
import { InMemoryTranslationRepository } from "../../testing/fakes/InMemoryTranslationRepository";
import { Sentence } from "../../domain/entities/Sentence";
import { SentenceError } from "../../domain/errors/SentenceError";
import { TranslationError } from "../../domain/errors/TranslationError";
import { Result } from "../../shared/Result";

async function setup() {
  const sentenceRepository = new InMemorySentenceRepository();
  const translationRepository = new InMemoryTranslationRepository();
  const useCase = new CreateTranslation(translationRepository, sentenceRepository);

  const sentence = new Sentence("The cat sleeps.", randomUUID());
  await sentenceRepository.save(sentence);

  return { sentenceRepository, translationRepository, useCase, sentence };
}

test("creates and stores a translation", async () => {
  const { translationRepository, useCase, sentence } = await setup();

  const result = await useCase.execute(sentence.id, "es", "A2", "El gato duerme.");

  assert.equal(result.isOk(), true);
  const translation = result.getValue();
  assert.equal(translation.sentenceId, sentence.id);
  assert.equal(translation.language.code, "es");
  assert.equal(translation.level.name, "A2");
  assert.equal(translation.text, "El gato duerme.");
  assert.equal((await translationRepository.findById(translation.id))?.text, "El gato duerme.");
});

test("normalizes the language code and the level name", async () => {
  const { useCase, sentence } = await setup();

  const result = await useCase.execute(sentence.id, " ES ", "b1", "El gato duerme.");

  assert.equal(result.getValue().language.code, "es");
  assert.equal(result.getValue().level.name, "B1");
});

test("trims the text", async () => {
  const { useCase, sentence } = await setup();

  const result = await useCase.execute(sentence.id, "es", "A2", "  El gato duerme.  ");

  assert.equal(result.getValue().text, "El gato duerme.");
});

test("rejects an empty sentence id", async () => {
  const { useCase } = await setup();

  const result = await useCase.execute("   ", "es", "A2", "El gato duerme.");

  assert.deepEqual(result.getError(), { errorType: "SENTENCE_NOT_FOUND" });
});

test("rejects an invalid language code", async () => {
  const { useCase, sentence } = await setup();

  const result = await useCase.execute(sentence.id, "spanish", "A2", "El gato duerme.");

  assert.deepEqual(result.getError(), { errorType: "INVALID_LANGUAGE" });
});

test("rejects an invalid level", async () => {
  const { useCase, sentence } = await setup();

  const result = await useCase.execute(sentence.id, "es", "B3", "El gato duerme.");

  assert.deepEqual(result.getError(), { errorType: "INVALID_LEVEL" });
});

test("rejects empty text", async () => {
  const { useCase, sentence } = await setup();

  const result = await useCase.execute(sentence.id, "es", "A2", "   ");

  assert.deepEqual(result.getError(), { errorType: "TEXT_CANNOT_BE_EMPTY" });
});

test("rejects text longer than the limit", async () => {
  const { useCase, sentence } = await setup();

  const result = await useCase.execute(sentence.id, "es", "A2", "a".repeat(1001));

  assert.deepEqual(result.getError(), { errorType: "INVALID_TEXT" });
});

test("accepts text at the length limit", async () => {
  const { useCase, sentence } = await setup();

  const result = await useCase.execute(sentence.id, "es", "A2", "a".repeat(1000));

  assert.equal(result.isOk(), true);
});

test("rejects a sentence that does not exist", async () => {
  const { useCase } = await setup();

  const result = await useCase.execute(randomUUID(), "es", "A2", "El gato duerme.");

  assert.deepEqual(result.getError(), { errorType: "SENTENCE_NOT_FOUND" });
});

test("rejects a second translation for the same language", async () => {
  const { translationRepository, useCase, sentence } = await setup();

  await useCase.execute(sentence.id, "es", "A2", "El gato duerme.");
  const result = await useCase.execute(sentence.id, "es", "B1", "El gato está durmiendo.");

  assert.deepEqual(result.getError(), { errorType: "DUPLICATE_TRANSLATION_FOR_LANGUAGE" });
  assert.equal(translationRepository.getAll().length, 1);
});

test("treats a differently cased language code as the same language", async () => {
  const { useCase, sentence } = await setup();

  await useCase.execute(sentence.id, "es", "A2", "El gato duerme.");
  const result = await useCase.execute(sentence.id, "ES", "A2", "El gato duerme.");

  assert.deepEqual(result.getError(), { errorType: "DUPLICATE_TRANSLATION_FOR_LANGUAGE" });
});

test("allows different languages for the same sentence", async () => {
  const { useCase, sentence } = await setup();

  await useCase.execute(sentence.id, "es", "A2", "El gato duerme.");
  const result = await useCase.execute(sentence.id, "fr", "A2", "Le chat dort.");

  assert.equal(result.isOk(), true);
});

test("reports a persistence failure through Result", async () => {
  class FailingTranslationRepository extends InMemoryTranslationRepository {
    override async save(): Promise<Result<void, TranslationError | SentenceError>> {
      return Result.fail({ errorType: "UNABLE_TO_SAVE_TRANSLATION" });
    }
  }

  const { sentenceRepository, sentence } = await setup();
  const useCase = new CreateTranslation(new FailingTranslationRepository(), sentenceRepository);

  const result = await useCase.execute(sentence.id, "es", "A2", "El gato duerme.");

  assert.deepEqual(result.getError(), { errorType: "UNABLE_TO_SAVE_TRANSLATION" });
});
