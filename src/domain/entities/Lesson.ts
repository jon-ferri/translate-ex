import { Language } from "../value-objects/Language";
import { Level } from "../value-objects/Level";
import { Translation } from "./Translation";

export class Lesson {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly order: number,
    public readonly level: Level,
    public readonly targetLanguage: Language,
    private readonly translations: Translation[] = []
  ) {}

  getTranslations(): Translation[] {
    return [...this.translations];
  }
}
