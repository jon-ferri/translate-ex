import { Language } from "../value-objects/Language";
import { User } from "./User";

export class LearningPath {
    constructor(
        public readonly id: string,
        public readonly user: User,
        public readonly sourceLanguage: Language,
        public readonly targetLanguage: Language,
        public readonly createdAt: Date = new Date()
    ) {}
}
