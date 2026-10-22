export type LessonError =
    | { errorType: "LESSON_NOT_FOUND" }
    | { errorType: "INVALID_LESSON_ID" }
    | { errorType: "LESSON_ALREADY_EXISTS" }
    | { errorType: "LESSON_UPDATE_FAILED" }
    | { errorType: "LESSON_DELETE_FAILED" }
    | { errorType: "LESSON_CREATION_FAILED" }
    
    