import { Translation } from "./Translation";
import { Level } from "../value-objects/Level";
import { Language } from "../value-objects/Language";
import { randomUUID } from "crypto";
export class Sentence {
  public readonly translations: Translation[] = [];

  constructor(
    private readonly sourceText: string,
    public readonly id: string = randomUUID(),
  ) {}

  addTranslation(
    language: Language,
    text: string,
    level: Level,
    variants?: string[],
    notes?: string[],
    ideas?: string[],
  ): void {
    const translation = new Translation(
      randomUUID(),
      this.id,
      language,
      text,
      level,
      variants,
      notes,
      ideas,
    );
    this.translations.push(translation);
  }
}
