# ROADMAP

## Next Up
1. Implement `RegisterUser` use case
2. Implement `LoginUser` use case
3. Implement `GetNextCard` use case

---

## Phase 1: Domain Foundation ✅
- [x] Set up TypeScript project with strict mode
- [x] Create domain entities (User, Sentence, Translation, Lesson, UserProgress, LearningPath)
- [x] Create value objects (Language, Level, TranslationAnswer)
- [x] Implement Result pattern in `src/shared/`
- [x] Establish clean architecture folder structure
- [x] Create AGENTS.md for AI assistant guidance
- [x] Define error types in `src/domain/errors/` (User, Sentence, Translation, Lesson, LearningPath)
- [x] Define all use case interfaces in `src/application/use-cases/`
- [x] Model multiple concurrent learning paths per user (LearningPath entity)

## Phase 2: Use Cases
- [x] Define use case interfaces in `src/application/`
- [ ] Implement `RegisterUser` — creates a new user account (email + password)
- [ ] Implement `LoginUser` — authenticates and returns a session token
- [ ] Implement `CreateLearningPath` — creates a learning path for a user
- [ ] Implement `GetLearningPaths` — lists a user's learning paths
- [ ] Implement `SwitchActiveLearningPath` — sets the active learning path
- [ ] Implement `UpdateUserSettings` — updates user profile
- [ ] Implement `GetNextCard` — returns the next sentence pair for a user
- [ ] Implement `SubmitTranslation` — evaluates a user's answer
- [ ] Implement `GetLesson` — returns a lesson with its translations
- [ ] Implement `GetUserProgress` — returns user's practice history
- [ ] Implement `GetCurriculum` — returns levels + lessons for a language pair
- [ ] Design curriculum structure (Curriculum → Levels → Lessons)

## Phase 3: Infrastructure
- [ ] Set up Express server with basic routing
- [ ] Set up PostgreSQL database
- [ ] Set up Prisma ORM with schema
- [ ] Implement repository interfaces (infrastructure layer)
- [ ] Implement JWT authentication
- [ ] Add request validation middleware
- [ ] Add error handling middleware
- [ ] Add DTOs (Data Transfer Objects) for API responses

## Phase 4: Content
- [ ] Design database schema for content (sentences, translations, levels, lessons)
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

## Future improvements
- [ ] Implement OAuth or other advanced Authentication method
