import { Language } from "../value-objects/Language";

export class LearningPath {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly description: string,
        public readonly targetLanguage: Language,
        public readonly isActive: boolean,
        public readonly createdAt: Date = new Date()
    ) {}
}
