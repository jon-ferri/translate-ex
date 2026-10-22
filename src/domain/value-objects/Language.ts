export class Language {
  constructor(
    public readonly code: string,
    public readonly name: string
  ) {}

  equals(other: Language): boolean {
    return this.code === other.code;
  }

  toString(): string {
    return `${this.name} (${this.code})`;
  }
}
