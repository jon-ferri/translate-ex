import { Language } from "../value-objects/Language";

export class Enrollment {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly learningPathId: string,
    public readonly sourceLanguage: Language,
    public readonly startedAt: Date = new Date(),
    public readonly isArchived: boolean = false,
  ) {}
}
