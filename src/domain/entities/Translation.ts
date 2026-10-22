import { Level } from '../value-objects/Level';
import { Language } from '../value-objects/Language';

export class Translation {
  constructor(
    public readonly id: string, // Unique identifier for this translation
    public readonly sentenceId: string, // The ID of the sentence this translation belongs to
    public readonly language: Language, // The language of the translation
    public readonly text: string, // The translated text
    public readonly level: Level, // The proficiency level required for this translation
    public readonly variants?: string[], // Optional alternative accepted answers
    public readonly notes?: string[], // Optional notes for the translation
    public readonly ideas?: string[] // Optional study tips or ideas
  ) {
  }
}