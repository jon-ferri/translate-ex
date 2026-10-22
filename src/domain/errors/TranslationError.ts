export type TranslationError =
    | { errorType: "TRANSLATION_NOT_FOUND" }
    | { errorType: "TRANSLATION_ALREADY_EXISTS" }
    | { errorType: "INVALID_TRANSLATION_TEXT" }
    | { errorType: "DUPLICATE_TRANSLATION_FOR_LANGUAGE" };
