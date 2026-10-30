export class Level {
  // The six CEFR levels, ordered from lowest to highest.
  private static readonly CATALOG: string[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

  public readonly name: string;
  public readonly order: number;

  constructor(name: string, order?: number) {
    const normalizedName = typeof name === "string" ? name.trim().toUpperCase() : "";
    const index = Level.CATALOG.indexOf(normalizedName);

    if (index === -1) {
      throw new Error(
        `Level "${name}" is not valid. Valid levels: ${Level.CATALOG.join(", ")}.`
      );
    }

    // The catalog is the single source of truth for the order of the levels.
    const expectedOrder = index + 1;
    if (order !== undefined && order !== expectedOrder) {
      throw new Error(
        `Level "${normalizedName}" must have order ${expectedOrder}, received ${order}.`
      );
    }

    this.name = normalizedName;
    this.order = expectedOrder;
  }

  // Builds a Level from untrusted input without throwing.
  static tryCreate(name: string): Level | null {
    try {
      return new Level(name);
    } catch {
      return null;
    }
  }
}
