import { Translation } from "../../domain/entities/Translation";
import { Result } from "../../shared/Result";

export interface GetNextCardUseCase {
    execute(userId: string): Promise<Result<Translation, Error>>;
}
