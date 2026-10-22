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
    entities/       ← Objects with identity (User, Sentence, Translation, Lesson, UserProgress)
    value-objects/  ← Objects without identity (Language, Level, TranslationAnswer)
  application/      ← Use cases. Orchestrates domain objects. (Not yet implemented)
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
- Properties/methods: `camelCase` (e.g., `sentenceId`, `addTranslation`)
- Private properties: `camelCase` with `private` keyword

### Domain Entities
- All properties are `readonly` unless there is a compelling reason
- Entities have an `id: string` (UUID via `crypto.randomUUID()`)
- Value objects have no `id` — they are identified by their value
- Use `private` for properties that should only be accessed within the class

### Imports
- Use relative imports within the same layer
- Use relative imports across layers (e.g., `../value-objects/Language`)
- No barrel files (index.ts) — import directly from the file

### Error Handling
- Use `Result<T, E>` from `src/shared/Result.ts` for use case return types
- Domain errors should be explicit and type-safe (not generic `Error` strings)
- Exceptions are acceptable in the domain layer for invariant violations

## Rules

1. **No `any` types** — always use proper types or `unknown` with type narrowing
2. **No external dependencies in domain/** — no Express, no Prisma, no database imports
3. **No `console.log` in domain/** — use cases handle output
4. **Always use English** for code, comments, and commit messages
5. **Do not add npm dependencies without explicit user approval**
6. **Do not modify AGENTS.md without explicit user approval**

## Content Model

- **Sentence** — a meaning container with a `sourceText` (internal only) and multiple `Translation` objects
- **Translation** — belongs to a Sentence via `sentenceId`, has a `Language`, `text`, `Level`, optional `variants`, `notes`, `ideas`
- **Level** — a value object (e.g., A1, A2, B1) with `name` and `order`
- **Lesson** — a curated group of Translations with `order` within a Level
- **User** — has `motherTongue` and `targetLanguage` (both `Language` value objects)
- **UserProgress** — tracks which Translations a user has practiced and their score

## Future Plans (Not Yet Implemented)

- **Use cases:** `GetNextCard`, `SubmitTranslation`, `RegisterUser`, `LoginUser`
- **Evaluation:** fuzzy match (algorithmic) and AI-based (API) translation checking
- **Content tiers:** pre-set content (MVP), AI-generated content (advanced), PDF import (advanced)
- **Audio:** handled client-side (Web Speech API / native mobile APIs) — backend serves text only
- **Auth:** JWT-based with persistent sessions
