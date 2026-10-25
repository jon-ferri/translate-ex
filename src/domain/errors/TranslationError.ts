export type TranslationError =
    | { errorType: "UNABLE_TO_SAVE_TRANSLATION" }
    | { errorType: "UNABLE_TO_TRANSLATE_TEXT" }
    | { errorType: "INVALID_LEVEL" }
    | { errorType: "INVALID_LANGUAGE" }
    | { errorType: "TEXT_CANNOT_BE_EMPTY" }
    | { errorType: "INVALID_TEXT" }
    | { errorType: "DUPLICATE_TRANSLATION_FOR_LANGUAGE" }
