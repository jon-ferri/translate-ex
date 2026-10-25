export class Sentence {
  private readonly sourceText: string;
  public readonly id: string;

  constructor(sourceText: string, id: string) {
    if (sourceText.trim().length === 0) {
      throw new Error("Sentence sourceText cannot be empty.");
    }

    this.sourceText = sourceText.trim();
    this.id = id;
  }

  getText(): string {
    return this.sourceText;
  }
}
