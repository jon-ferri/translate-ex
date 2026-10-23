# ROADMAP

## Next Up
1. Implement `CreateLearningPath` (admin use case)
2. Implement `GetAvailableLearningPaths` and `GetUserEnrollments`
3. Design the `LearningPath → Levels → Lessons` hierarchy

---

## Phase 1: Domain Foundation ✅
- [x] Set up TypeScript project with strict mode
- [x] Establish clean architecture folder structure
- [x] Create domain entities (User, Sentence, Translation, Lesson, UserProgress)
- [x] Create value objects (Language, Level, TranslationAnswer)
- [x] Implement Result pattern in `src/shared/`
- [x] Create AGENTS.md for AI assistant guidance
- [x] Define error types in `src/domain/errors/` (User, Sentence, Translation, Lesson, Auth, LearningPath, Enrollment)
- [x] Define all use case interfaces in `src/application/use-cases/`
- [x] Define ports in `src/application/ports/` (User, PasswordHasher, TokenGenerator, LearningPath, Enrollment)
- [x] Split `LearningPath` (content, target-language-only) from `Enrollment` (user state)

## Phase 2: Use Cases
- [x] Define use case interfaces in `src/application/`
- [x] Implement `RegisterUser` — creates a new user account (email + password)
- [x] Implement `LoginUser` — authenticates and returns a session token
- [x] Implement `EnrollInLearningPath` — subscribes a user to a course
- [ ] Implement `CreateLearningPath` — admin creates a course (target language only)
- [ ] Implement `GetAvailableLearningPaths` — catalog of active courses
- [ ] Implement `GetUserEnrollments` — user's course subscriptions
- [ ] Implement `UpdateUserSettings` — updates user profile
- [ ] Implement `GetNextCard` — returns the next sentence pair (needs `enrollmentId`)
- [ ] Implement `SubmitTranslation` — evaluates a user's answer
- [ ] Implement `GetLesson` — returns a lesson with its translations
- [ ] Implement `GetUserProgress` — returns user's practice history (scope per enrollment)
- [ ] Implement `GetCurriculum` — returns levels + lessons for a course
- [ ] Design the `LearningPath → Levels → Lessons` hierarchy

## Phase 3: Infrastructure
- [ ] Set up Express server with basic routing
- [ ] Set up PostgreSQL database
- [ ] Set up Prisma ORM with schema
- [ ] Implement repository adapters (User, LearningPath, Enrollment, ...)
- [ ] Implement `PasswordHasher` adapter (bcrypt or argon2)
- [ ] Implement `TokenGenerator` adapter (JWT)
- [ ] Add request validation middleware
- [ ] Add error handling middleware
- [ ] Add DTOs (Data Transfer Objects) for API responses

## Phase 4: Content
- [ ] Design database schema for content (learning paths, levels, lessons, sentences, translations)
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
- [ ] `supportedLanguages` in `EnrollInLearningPath` is a placeholder list — eventually derive it from the available translations in the content
- [ ] Decide how archived enrollments behave (they currently trigger `ALREADY_ENROLLED` and count toward the max limit)
- [ ] Scope `UserProgress` per enrollment so different courses don't mix histories
- [ ] `GetNextCard` should take an `enrollmentId` to resolve source/target languages
- [ ] Remove `Lesson.targetLanguage` once lessons belong to a `LearningPath` (becomes redundant)

## Future improvements
- [ ] Implement OAuth or other advanced Authentication method
