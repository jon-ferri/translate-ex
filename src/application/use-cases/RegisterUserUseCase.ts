import { UserError } from "../../domain/errors/UserError";
import { Result } from "../../shared/Result";
import { User } from "../../domain/entities/User";

export interface RegisterUserUseCase {
    execute(
        email: string,
        password: string
    ): Promise<Result<User, UserError>>;
}
