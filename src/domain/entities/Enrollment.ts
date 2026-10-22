import { Language } from "../value-objects/Language";

export class Enrollment {
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly learningPathId: string,
        public readonly sourceLanguage: Language,
        public readonly startedAtDate: Date = new Date()
    ) {}
}