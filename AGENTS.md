# AGENTS.md

This file provides guidance to AI coding assistants working on this project.

## Project Overview

**translate-ex** is the backend for a language learning app. Users see a sentence (or word) and listen to audio, then try to translate it into a target language. The core loop is flashcard-style practice with translation evaluation.

## Tech Stack

- **Language:** TypeScript (strict mode)
- **Runtime:** Node.js
- **Framework:** Express (planned)
- **Database:** PostgreSQL (planned)
- **ORM:** Prisma (planned)
- **Package Manager:** npm

## Architecture

This project follows **Clean Architecture** with layered separation:

```
src/
  domain/           ← Innermost layer. Pure business logic. No external dependencies.
    entities/       ← Objects with identity (User, Sentence, Translation, Lesson, UserProgress, LearningPath, Enrollment)
    value-objects/  ← Objects without identity (Language, Level, TranslationAnswer)
    errors/         ← Type-safe error unions, one per entity
  application/      ← Use cases and ports. Orchestrates domain objects.
    use-cases/      ← One class per user intention, with its interface alongside
    ports/          ← Interfaces for persistence and external services
  infrastructure/   ← Outermost layer. Database, Express, external APIs. (Not yet implemented)
  shared/           ← Cross-cutting utilities (Result)
```

### Dependency Rule

Dependencies point **inward only**:
- Infrastructure → Application → Domain
- Domain knows nothing about outer layers
- The domain layer must never import from Express, Prisma, or any external library

## Code Conventions

### Naming
- Files: `PascalCase.ts` for classes, `camelCase.ts` for utilities
- Classes: `PascalCase` (e.g., `User`, `Sentence`, `Translation`)
- Properties/methods: `camelCase` (e.g., `sentenceId`, `getTranslations`)
- Private properties: `camelCase` with `private` keyword

### Domain Entities
- All properties are `readonly` unless there is a compelling reason
- Entities have an `id: string` (UUID via `crypto.randomUUID()`)
- Value objects have no `id` — they are identified by their value
- Use `private` for properties that should only be accessed within the class
- Normalize input in the constructor (e.g., `trim()`) so no caller has to remember to do it

### Imports
- Use relative imports within the same layer
- Use relative imports across layers (e.g., `../value-objects/Language`)
- No barrel files (index.ts) — import directly from the file

### Error Handling

Use case return types use `Result<T, E>` from `src/shared/Result.ts`. Failures are reported at two layers:

- **Use cases** return `Result.fail` for recoverable, user-facing errors. Validate input first and fail fast, before touching the database.
- **Entities and value objects** throw for invariant violations. Those represent impossible states, not user mistakes.

Never throw instead of returning `Result` for an expected failure. An entity throwing means a caller bypassed validation.

Persistence failures stay in the same error union as domain errors (e.g. `UNABLE_TO_SAVE_SENTENCE`), so a repository can report them through `Result`.

## Rules

1. **No `any` types** — always use proper types or `unknown` with type narrowing
2. **No external dependencies in domain/** — no Express, no Prisma, no database imports
3. **No `console.log` in domain/** — use cases handle output
4. **Always use English** for code, comments, and commit messages
5. **Do not add npm dependencies without explicit user approval**
6. **Do not modify AGENTS.md without explicit user approval**

## Content Model

A `Sentence` is a **translation group**: it anchors every language rendition of one piece of text.

- **Sentence** — `id` + `sourceText`. `sourceText` is the English authoring pivot (`en-US`). A Sentence does **not** own its translations; they are created separately.
- **Translation** — one rendition of a Sentence, linked by `sentenceId`. Has `language`, `text`, `level`, and optional `variants`, `notes`, `ideas`, `labels`.
- **English is a Translation too** — it can be a source prompt or a target answer, so it is stored like any other language.
- **Level** — a value object (A1, A2, B1, B2, C1, C2) with `name` and a catalog-derived `order`. It describes the difficulty of that rendition, not of the Sentence.
- **Lesson** — a curated group of Translations with `order`; it currently also carries `level` and `targetLanguage`.
- **LearningPath** — a course for one target language (`name`, `description`, `targetLanguage`, `isActive`).
- **Enrollment** — a user↔path subscription (`userId`, `learningPathId`, `sourceLanguage`, `startedAt`, `isArchived`). The source language lives here, not on `User`.
- **User** — identity only (`id`, `email`, `passwordHash`, `createdAt`).
- **UserProgress** — tracks which Translations a user has practiced and their score (to be scoped per enrollment).

Language codes are currently 2–3 letters (`en`, `es`). Regional tags (BCP 47, e.g. `es-ES`) are an open decision.

## Future Plans (Not Yet Implemented)

- **Use cases:** `CreateLearningPath`, `GetCurriculum`, `GetLesson`, `GetNextCard`, `SubmitTranslation`, `GetUserProgress`, `GetAvailableLearningPaths`, `GetUserEnrollments`, `UpdateUserSettings`
- **Evaluation:** fuzzy match (algorithmic) and AI-based (API) translation checking
- **Content tiers:** pre-set content (MVP), AI-generated content (advanced), PDF import (advanced)
- **Audio:** handled client-side (Web Speech API / native mobile APIs) — backend serves text only
- **Auth:** JWT-based with persistent sessions

Open design decisions are tracked in `ROADMAP.md` → "Open decisions / follow-ups".
