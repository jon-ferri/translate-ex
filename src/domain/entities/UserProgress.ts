import { Translation } from "./Translation";
import { User } from "./User";

export class UserProgress {
  constructor(
    public readonly id: string,
    public readonly user: User,
    public readonly translation: Translation,
    public readonly score: number,
    public readonly practicedAt: Date = new Date()
  ) {}
}
