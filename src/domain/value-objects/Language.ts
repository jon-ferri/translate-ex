export class Language {
  public readonly code: string;

  constructor(code: string) {
    const normalizedCode = typeof code === "string" ? code.trim().toLowerCase() : "";

    if (!/^[a-z]{2,3}$/.test(normalizedCode)) {
      throw new Error(`Language code "${code}" is not a valid 2-3 letter code.`);
    }

    this.code = normalizedCode;
  }

  // Builds a Language from untrusted input without throwing.
  static tryCreate(code: string): Language | null {
    try {
      return new Language(code);
    } catch {
      return null;
    }
  }

  equals(other: Language): boolean {
    return this.code === other.code;
  }

  toString(): string {
    return this.code;
  }
}
