import { test } from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { EnrollInLearningPath } from "./EnrollInLearningPath";
import { InMemoryUserRepository } from "../../testing/fakes/InMemoryUserRepository";
import { InMemoryLearningPathRepository } from "../../testing/fakes/InMemoryLearningPathRepository";
import { InMemoryEnrollmentRepository } from "../../testing/fakes/InMemoryEnrollmentRepository";
import { User } from "../../domain/entities/User";
import { LearningPath } from "../../domain/entities/LearningPath";
import { Enrollment } from "../../domain/entities/Enrollment";
import { EnrollmentError } from "../../domain/errors/EnrollmentError";
import { Language } from "../../domain/value-objects/Language";
import { Result } from "../../shared/Result";

async function setup(maxEnrollmentsPerUser?: number) {
  const userRepository = new InMemoryUserRepository();
  const learningPathRepository = new InMemoryLearningPathRepository();
  const enrollmentRepository = new InMemoryEnrollmentRepository();

  const useCase = new EnrollInLearningPath(
    userRepository,
    enrollmentRepository,
    learningPathRepository,
    maxEnrollmentsPerUser,
  );

  const user = new User(randomUUID(), "ana@example.com", "hash");
  await userRepository.save(user);

  const learningPath = new LearningPath(
    randomUUID(),
    "Spanish Basics",
    "Starter course",
    new Language("es"),
  );
  await learningPathRepository.save(learningPath);

  return {
    userRepository,
    learningPathRepository,
    enrollmentRepository,
    useCase,
    user,
    learningPath,
  };
}

test("enrolls a user in a learning path", async () => {
  const { enrollmentRepository, useCase, user, learningPath } = await setup();

  const result = await useCase.execute(user.id, learningPath.id, "en");

  assert.equal(result.isOk(), true);
  const enrollment = result.getValue();
  assert.equal(enrollment.userId, user.id);
  assert.equal(enrollment.learningPathId, learningPath.id);
  assert.equal(enrollment.sourceLanguage.code, "en");
  assert.equal(enrollment.isArchived, false);
  assert.equal((await enrollmentRepository.findById(enrollment.id))?.userId, user.id);
});

test("rejects an invalid source language code", async () => {
  const { useCase, user, learningPath } = await setup();

  const result = await useCase.execute(user.id, learningPath.id, "spanish");

  assert.deepEqual(result.getError(), { errorType: "INVALID_SOURCE_LANGUAGE" });
});

test("rejects a source language that is not supported", async () => {
  const { useCase, user, learningPath } = await setup();

  const result = await useCase.execute(user.id, learningPath.id, "it");

  assert.deepEqual(result.getError(), { errorType: "SOURCE_LANGUAGE_NOT_SUPPORTED" });
});

test("validates the source language before looking up the user", async () => {
  const { useCase } = await setup();

  const result = await useCase.execute(randomUUID(), randomUUID(), "spanish");

  assert.deepEqual(result.getError(), { errorType: "INVALID_SOURCE_LANGUAGE" });
});

test("rejects an unknown user", async () => {
  const { useCase, learningPath } = await setup();

  const result = await useCase.execute(randomUUID(), learningPath.id, "en");

  assert.deepEqual(result.getError(), { errorType: "USER_NOT_FOUND" });
});

test("rejects an unknown learning path", async () => {
  const { useCase, user } = await setup();

  const result = await useCase.execute(user.id, randomUUID(), "en");

  assert.deepEqual(result.getError(), { errorType: "LEARNING_PATH_NOT_FOUND" });
});

test("rejects an inactive learning path", async () => {
  const { learningPathRepository, useCase, user } = await setup();

  const inactive = new LearningPath(
    randomUUID(),
    "Retired course",
    "No longer offered",
    new Language("fr"),
    false,
  );
  await learningPathRepository.save(inactive);

  const result = await useCase.execute(user.id, inactive.id, "en");

  assert.deepEqual(result.getError(), { errorType: "LEARNING_PATH_NOT_ACTIVE" });
});

test("rejects a second enrollment in the same learning path", async () => {
  const { enrollmentRepository, useCase, user, learningPath } = await setup();

  await useCase.execute(user.id, learningPath.id, "en");
  const result = await useCase.execute(user.id, learningPath.id, "en");

  assert.deepEqual(result.getError(), { errorType: "ALREADY_ENROLLED" });
  assert.equal(enrollmentRepository.getAll().length, 1);
});

test("rejects enrollment when the limit is reached", async () => {
  const { userRepository, learningPathRepository, enrollmentRepository, user } =
    await setup(2);
  const useCase = new EnrollInLearningPath(
    userRepository,
    enrollmentRepository,
    learningPathRepository,
    2,
  );

  for (let index = 0; index < 2; index++) {
    const path = new LearningPath(randomUUID(), `Course ${index}`, "", new Language("fr"));
    await learningPathRepository.save(path);
    const result = await useCase.execute(user.id, path.id, "en");
    assert.equal(result.isOk(), true);
  }

  const extra = new LearningPath(randomUUID(), "Course X", "", new Language("de"));
  await learningPathRepository.save(extra);
  const result = await useCase.execute(user.id, extra.id, "en");

  assert.deepEqual(result.getError(), { errorType: "MAX_ENROLLMENTS_REACHED" });
});

test("rejects a source language that matches the target language", async () => {
  const { useCase, user, learningPath } = await setup();

  const result = await useCase.execute(user.id, learningPath.id, "es");

  assert.deepEqual(result.getError(), {
    errorType: "SOURCE_LANGUAGE_MATCHES_TARGET_LANGUAGE",
  });
});

test("ignores archived enrollments when checking for duplicates", async () => {
  const { enrollmentRepository, useCase, user, learningPath } = await setup();

  await enrollmentRepository.save(
    new Enrollment(
      randomUUID(),
      user.id,
      learningPath.id,
      new Language("en"),
      new Date(),
      true,
    ),
  );

  const result = await useCase.execute(user.id, learningPath.id, "en");

  assert.equal(result.isOk(), true);
});

test("ignores archived enrollments when counting the limit", async () => {
  const { userRepository, learningPathRepository, enrollmentRepository, user } =
    await setup(1);
  const useCase = new EnrollInLearningPath(
    userRepository,
    enrollmentRepository,
    learningPathRepository,
    1,
  );

  const other = new LearningPath(randomUUID(), "Other course", "", new Language("fr"));
  await learningPathRepository.save(other);

  await enrollmentRepository.save(
    new Enrollment(randomUUID(), user.id, other.id, new Language("en"), new Date(), true),
  );

  const path = new LearningPath(randomUUID(), "Third course", "", new Language("de"));
  await learningPathRepository.save(path);
  const result = await useCase.execute(user.id, path.id, "en");

  assert.equal(result.isOk(), true);
});

test("reports a persistence failure through Result", async () => {
  class FailingEnrollmentRepository extends InMemoryEnrollmentRepository {
    override async save(): Promise<Result<void, EnrollmentError>> {
      return Result.fail({ errorType: "UNABLE_TO_SAVE_ENROLLMENT" });
    }
  }

  const { userRepository, learningPathRepository, user, learningPath } = await setup();
  const useCase = new EnrollInLearningPath(
    userRepository,
    new FailingEnrollmentRepository(),
    learningPathRepository,
  );

  const result = await useCase.execute(user.id, learningPath.id, "en");

  assert.deepEqual(result.getError(), { errorType: "UNABLE_TO_SAVE_ENROLLMENT" });
});
