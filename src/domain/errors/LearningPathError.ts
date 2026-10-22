export type LearningPathError =
    | { errorType: "LEARNING_PATH_NOT_FOUND" }
    | { errorType: "LEARNING_PATH_ALREADY_EXISTS" }
    | { errorType: "MAX_LEARNING_PATHS_REACHED" }
    | { errorType: "INVALID_SOURCE_LANGUAGE" }
    | { errorType: "INVALID_TARGET_LANGUAGE" }
    | { errorType: "SOURCE_AND_TARGET_LANGUAGES_ARE_THE_SAME" };
