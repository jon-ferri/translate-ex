import { UserRepository } from "../ports/UserRepository";
import { PasswordHasher } from "../ports/PasswordHasher";
import { TokenGenerator } from "../ports/TokenGenerator";
import { LoginUserUseCase } from "./LoginUserUseCase";
import { AuthError } from "../../domain/errors/AuthError";
import { Result } from "../../shared/Result";
import { User } from "../../domain/entities/User";

export class LoginUser implements LoginUserUseCase {
    constructor(
        private userRepository: UserRepository,
        private passwordHasher: PasswordHasher,
        private tokenGenerator: TokenGenerator
    ) {}

    private async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.userRepository.findUserByEmail(email);
        if (!user) {
            return null;
        }
        const isPasswordValid = await this.passwordHasher.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            return null;
        }
        return user;
    }

    async execute(email: string, password: string): Promise<Result<string, AuthError>> {
        const user = await this.validateUser(email, password);
        if (!user) {
            return Result.fail({ errorType: "INVALID_CREDENTIALS"});
        }
        
        const token = await this.tokenGenerator.generate({ userId: user.id });
        
        return Result.ok(token);
    }
}