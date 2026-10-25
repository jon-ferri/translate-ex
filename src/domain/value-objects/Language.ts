export class Language {
  public readonly code: string;
  public readonly name: string;

  constructor(code: string, name: string) {
    const normalizedCode = typeof code === "string" ? code.trim().toLowerCase() : "";
    const normalizedName = typeof name === "string" ? name.trim() : "";

    if (!/^[a-z]{2,3}$/.test(normalizedCode)) {
      throw new Error(`Language code "${code}" is not a valid 2-3 letter code.`);
    }

    if (normalizedName.length === 0) {
      throw new Error("Language name cannot be empty.");
    }

    this.code = normalizedCode;
    this.name = normalizedName;
  }

  equals(other: Language): boolean {
    return this.code === other.code;
  }

  toString(): string {
    return `${this.name} (${this.code})`;
  }
}
