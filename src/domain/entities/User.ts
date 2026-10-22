export class User {
  public activeEnrollments: string[] = [];

  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly passwordHash: string,
    public readonly createdAt: Date = new Date()
  ) {}
}
