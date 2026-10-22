export class TranslationAnswer {
  constructor(public readonly text: string) {
    if (!text || text.trim().length === 0) {
      throw new Error("Answer cannot be empty");
    }
  }

  normalized(): string {
    return this.text.trim().toLowerCase();
  }
}
