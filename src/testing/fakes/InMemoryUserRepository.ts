import { User } from "../../domain/entities/User";
import { UserError } from "../../domain/errors/UserError";
import { Result } from "../../shared/Result";
import { UserRepository } from "../../application/ports/UserRepository";

export class InMemoryUserRepository implements UserRepository {
  private readonly users = new Map<string, User>();

  async findByEmail(email: string): Promise<User | null> {
    for (const user of this.users.values()) {
      if (user.email === email) {
        return user;
      }
    }

    return null;
  }

  async findById(userId: string): Promise<User | null> {
    return this.users.get(userId) ?? null;
  }

  async save(user: User): Promise<Result<void, UserError>> {
    this.users.set(user.id, user);
    return Result.ok(undefined);
  }

  // Test helper, not part of the port.
  getAll(): User[] {
    return [...this.users.values()];
  }
}
