import { UserProgress } from "../../domain/entities/UserProgress";
import { Result } from "../../shared/Result";

export interface GetUserProgressUseCase {
    execute(userId: string): Promise<Result<UserProgress[], Error>>;
}
