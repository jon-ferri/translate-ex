import { UserError } from "../../domain/errors/UserError";
import { Result } from "../../shared/Result";
import { User } from "../../domain/entities/User";

export interface UserRepository {
    findUserByEmail(email: string): Promise<User | null>;
    findUserById(userId: string): Promise<Result<User, UserError>>;
    saveUser(user: User): Promise<Result<void, UserError>>;
}