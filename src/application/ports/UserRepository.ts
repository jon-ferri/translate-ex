import { UserError } from "../../domain/errors/UserError";
import { Result } from "../../shared/Result";
import { User } from "../../domain/entities/User";

export interface UserRepository {
    findByEmail(email: string): Promise<User | null>;
    findById(userId: string): Promise<User | null>;
    save(user: User): Promise<Result<void, UserError>>;
}