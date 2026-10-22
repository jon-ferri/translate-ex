export class Result<T,E> {
    private constructor(
        private readonly isSuccess: boolean,
        private readonly value?: T,
        private readonly error?: E
    ) {}

    // Creates a successful result with an optional value.
    public static ok<T,E = never>(value: T): Result<T,E> {
        return new Result<T,E>(true, value);
    }

    // Creates a failed result with an error.
    public static fail<T,E>(error: E): Result<T,E> {
        return new Result<T,E>(false, undefined, error);
    }

    // Retrieves the value of the result. Throws if the result is a failure.
    public getValue(): T {
        if (!this.isSuccess) {
            throw new Error("Cannot get the value of a failed result.");
        }
        return this.value as T;
    }
    
    // Retrieves the error of the result. Throws if the result is successful.
    public getError(): E {
        if (this.isSuccess) {
            throw new Error("Cannot get the error of a successful result.");
        }
        return this.error as E;
    }

    // Checks if the result is successful.
    public isOk(): boolean {
        return this.isSuccess;
    }

    // Checks if the result is a failure.
    public isFail(): boolean {
        return !this.isSuccess;
    }
    /*
        TODO:
        - Consider adding a method to map the value if the result is successful.
        - Consider adding a method to map the error if the result is a failure.
        - Consider adding a method to chain results (flatMap).
        - map() — transform the value if success
        - flatMap() — chain another Result-returning operation
        - match() — handle both cases in one call
    */ 
}