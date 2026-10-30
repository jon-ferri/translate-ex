export type LearningPathError =
    | { errorType: "LEARNING_PATH_NOT_FOUND" }
    | { errorType: "LEARNING_PATH_ALREADY_EXISTS" }
    | { errorType: "LEARNING_PATH_NOT_ACTIVE" }
    | { errorType: "INVALID_TARGET_LANGUAGE" }
    | { errorType: "UNABLE_TO_SAVE_LEARNING_PATH" }
