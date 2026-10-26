# ROADMAP

## Next Up
1. Settle the `Language` value object: regional BCP 47 tags (`es-ES`, `en-US`) or plain codes (`es`, `en`)
2. Decide the curriculum model (`Lesson ↔ LearningPath`) and implement `CreateLesson`
3. Build the practice loop: `GetNextCard` and `SubmitTranslation`

---

## Phase 1: Domain Foundation ✅
- [x] Set up TypeScript project with strict mode
- [x] Establish clean architecture folder structure
- [x] Create domain entities (User, Sentence, Translation, Lesson, UserProgress, LearningPath, Enrollment)
- [x] Create value objects (Language, Level, TranslationAnswer)
- [x] Implement Result pattern in `src/shared/`
- [x] Create AGENTS.md for AI assistant guidance
- [x] Define error types in `src/domain/errors/` (User, Sentence, Translation, Lesson, Auth, LearningPath, Enrollment)
- [x] Define all use case interfaces in `src/application/use-cases/`
- [x] Define ports in `src/application/ports/` (User, PasswordHasher, TokenGenerator, LearningPath, Enrollment, Sentence, Translation)
- [x] Split `LearningPath` (content, target-language-only) from `Enrollment` (user state)
- [x] Model `Sentence` as a translation group (English pivot `sourceText`); translations are created separately
- [x] Add validation to `Language`, `Level`, `Sentence` and `Translation`

## Phase 2: Use Cases
- [x] Define use case interfaces in `src/application/`
- [x] Implement `RegisterUser` — creates a new user account (email + password)
- [x] Implement `LoginUser` — authenticates and returns a session token
- [x] Implement `EnrollInLearningPath` — subscribes a user to a course
- [x] Implement `CreateSentence` — creates a translation group (English source text)
- [x] Implement `CreateTranslation` — adds a language rendition to a sentence
- [ ] Implement `CreateLearningPath` — admin creates a course (target language only)
- [ ] Implement `GetAvailableLearningPaths` — catalog of active courses
- [ ] Implement `GetUserEnrollments` — user's course subscriptions
- [ ] Implement `UpdateUserSettings` — updates user profile
- [ ] Implement `GetNextCard` — returns the next card (needs `enrollmentId`)
- [ ] Implement `SubmitTranslation` — evaluates a user's answer
- [ ] Implement `GetLesson` — returns a lesson with its translations
- [ ] Implement `GetUserProgress` — returns user's practice history (scope per enrollment)
- [ ] Implement `GetCurriculum` — returns blocks of lessons for a course

## Phase 3: Infrastructure
- [ ] Set up Express server with basic routing
- [ ] Set up PostgreSQL database
- [ ] Set up Prisma ORM with schema
- [ ] Implement repository adapters (User, LearningPath, Enrollment, Sentence, Translation)
- [ ] Implement `PasswordHasher` adapter (bcrypt or argon2)
- [ ] Implement `TokenGenerator` adapter (JWT)
- [ ] Add request validation middleware
- [ ] Add error handling middleware
- [ ] Add DTOs (Data Transfer Objects) for API responses

## Phase 4: Content
- [ ] Design database schema for content (learning paths, lessons, sentences, translations)
- [ ] Create seed script with sample content
- [ ] Create admin API endpoints for content management
- [ ] Support multiple source languages for the same sentence

## Phase 5: Evaluation
- [ ] Implement fuzzy match algorithm for answer checking
- [ ] Define evaluation result types (correct, close, incorrect)
- [ ] Add scoring logic (partial credit for close answers)
- [ ] (Advanced) Integrate AI-based evaluation API

## Phase 6: Advanced Features
- [ ] AI-generated content (by language, level, amount)
- [ ] PDF import → AI extracts vocabulary/sentences
- [ ] Audio-only practice mode support
- [ ] Spaced repetition algorithm for card ordering
- [ ] Streak tracking and gamification

## Open decisions / follow-ups

### Language
- [ ] Regional tags (BCP 47, e.g. `es-ES` / `en-US`) are not implemented — `Language` accepts 2–3 letter codes only
- [ ] Decide whether `Language.equals` compares the full tag and add a base-language comparison (`es-MX` vs `es-ES`); `EnrollInLearningPath` must switch to it once regions land
- [ ] `supportedLanguages` in `EnrollInLearningPath` is a placeholder list — eventually derive it from the available translations

### Content model
- [ ] `en-US` is the authoring pivot; English is stored as a regular `Translation`, not as a special case
- [ ] Duplicate translations are keyed by `(sentenceId, language)` using the exact tag
- [ ] Decide whether `level` stays on `Translation` or moves to the placement in a curriculum
- [ ] `Translator` port was removed — AI-assisted content generation is deferred to Phase 6

### Curriculum
- [ ] Decide the `Lesson ↔ LearningPath` relationship: a `PathLesson` join (lessons reusable across paths, level/order per placement) or a direct `Lesson.learningPathId`
- [ ] Remove `Lesson.targetLanguage` once lessons belong to a `LearningPath` (becomes redundant)

### Progress
- [ ] Scope `UserProgress` per enrollment so different courses don't mix histories
- [ ] `GetNextCard` must take an `enrollmentId` to resolve source/target languages

### Cleanup
- [ ] `SentenceRepository.delete` has no use case
- [ ] `LearningPathError.INVALID_TARGET_LANGUAGE` is unused
- [ ] `TranslationError.UNABLE_TO_TRANSLATE_TEXT` is unused after removing the `Translator` port

## Future improvements
- [ ] Implement OAuth or other advanced Authentication method
