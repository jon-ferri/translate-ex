export type SentenceError =
    | { errorType: "SENTENCE_NOT_FOUND" }
    | { errorType: "SENTENCE_ALREADY_EXISTS" }
    | { errorType: "INVALID_SOURCE_TEXT" };
