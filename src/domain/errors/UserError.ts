export type UserError =
    | { errorType: "USER_NOT_FOUND" }
    | { errorType: "USER_ALREADY_EXISTS" }
    | { errorType: "INVALID_EMAIL" }
    | { errorType: "INVALID_PASSWORD" }
    | { errorType: "UNABLE_TO_SAVE_USER" }
