import { UserError } from "../../domain/errors/UserError";
import { Result } from "../../shared/Result";

export interface UpdateUserSettingsUseCase {
    execute(
        userId: string,
        email?: string
    ): Promise<Result<void, UserError>>;
}
