import { Result } from "../../shared/Result";
import { AuthError } from "../../domain/errors/AuthError";

export interface LoginUserUseCase {
    execute(email: string, password: string): Promise<Result<string, AuthError>>;
}
