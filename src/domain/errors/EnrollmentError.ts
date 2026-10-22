export type EnrollmentError = 
    | { errorType: "ENROLLMENT_NOT_FOUND" }
    | { errorType: "ALREADY_ENROLLED" }
    | { errorType: "MAX_ENROLLMENTS_REACHED" }
    | { errorType: "INVALID_SOURCE_LANGUAGE" }
    | { errorType: "SOURCE_LANGUAGE_NOT_SUPPORTED" }
    | { errorType: "SOURCE_LANGUAGE_MATCHES_TARGET_LANGUAGE" }