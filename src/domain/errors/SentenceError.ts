export type SentenceError =
    | { errorType: "SENTENCE_NOT_FOUND" }
    | { errorType: "SENTENCE_ALREADY_EXISTS" }
    | { errorType: "INVALID_SOURCE_TEXT" }
    | { errorType: "UNABLE_TO_SAVE_SENTENCE" }
