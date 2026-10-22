import { RegisterUserUseCase } from "./RegisterUserUseCase";
import { UserRepository } from "../ports/UserRepository";
import { UserError } from "../../domain/errors/UserError";
import { Result } from "../../shared/Result";
import { PasswordHasher } from "../ports/PasswordHasher";
import { User } from "../../domain/entities/User";
import { randomUUID } from "crypto";

export class RegisterUser implements RegisterUserUseCase {
    constructor(private userRepository: UserRepository, private passwordHasher: PasswordHasher) {}

    private validateEmail(email: string): Result<void, UserError> {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return Result.fail({ errorType: "INVALID_EMAIL" });
        }
        return Result.ok(undefined);
    }

    private validatePassword(password: string): Result<void, UserError> {
        if (password.length < 8) {
            return Result.fail({ errorType: "INVALID_PASSWORD" });
        }
        return Result.ok(undefined);
    }

    async execute(email: string, password: string): Promise<Result<User, UserError>> {
        
        const emailValidationResult = this.validateEmail(email);
        const passwordValidationResult = this.validatePassword(password);
        
        if (emailValidationResult.isFail()) {
            return Result.fail(emailValidationResult.getError());
        }
        if (passwordValidationResult.isFail()) {
            return Result.fail(passwordValidationResult.getError());
        }
        
        const existingUser = await this.userRepository.findUserByEmail(email);
        if (existingUser !== null) {
            return Result.fail({ errorType: "USER_ALREADY_EXISTS" });
        }
        
        
        const hashedPassword = await this.passwordHasher.hash(password);
        const user = new User(randomUUID(), email, hashedPassword);
        const savedUserResult = await this.userRepository.saveUser(user);
        if (savedUserResult.isFail()) {
            return Result.fail(savedUserResult.getError());
        }

        return Result.ok(user);
    }
}