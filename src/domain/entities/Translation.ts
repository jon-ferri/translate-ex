import { Level } from "../value-objects/Level";
import { Language } from "../value-objects/Language";

export class Translation {
  public readonly id: string;
  public readonly sentenceId: string;
  public readonly language: Language;
  public readonly text: string;
  public readonly level: Level;
  public readonly variants?: string[];
  public readonly notes?: string[];
  public readonly ideas?: string[];
  public readonly labels?: string[];

  constructor(
    id: string,
    sentenceId: string,
    language: Language,
    text: string,
    level: Level,
    variants?: string[], // Optional alternative accepted answers
    notes?: string[], // Optional notes for the translation
    ideas?: string[], // Optional study tips or ideas
    labels?: string[] // Optional labels for categorization
  ) {
    if (sentenceId.trim().length === 0) {
      throw new Error("Translation sentenceId cannot be empty.");
    }

    if (text.trim().length === 0) {
      throw new Error("Translation text cannot be empty.");
    }

    this.id = id;
    this.sentenceId = sentenceId.trim();
    this.language = language;
    this.text = text.trim();
    this.level = level;
    this.variants = variants;
    this.notes = notes;
    this.ideas = ideas;
    this.labels = labels;
  }
}
