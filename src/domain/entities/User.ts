export class User {
  public activeLearningPathId: string | null = null;

  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly passwordHash: string,
    public readonly createdAt: Date = new Date()
  ) {}
}
