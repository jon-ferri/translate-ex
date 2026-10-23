import { EnrollmentError } from '../../domain/errors/EnrollmentError';
import { Enrollment } from '../../domain/entities/Enrollment';
import { Language } from '../../domain/value-objects/Language';
import { Result } from '../../shared/Result';
import { EnrollInLearningPathUseCase } from './EnrollInLearningPathUseCase';
import { randomUUID } from 'crypto';
import { UserRepository } from '../ports/UserRepository';
import { EnrollmentRepository } from '../ports/EnrollmentRepository';
import { LearningPathRepository } from '../ports/LearningPathRepository';

export class EnrollInLearningPath implements EnrollInLearningPathUseCase {
    constructor(
        private userRepository: UserRepository,
        private enrollmentRepository: EnrollmentRepository,
        private learningPathRepository: LearningPathRepository,
        private maxEnrollmentsPerUser: number = 5,
        private supportedLanguages: string[] = ['en', 'es', 'fr', 'de'] // Example supported languages 
    ) {}

    async execute(
        userId: string,
        learningPathId: string,
        sourceLanguage: Language,
    ): Promise<Result<Enrollment, EnrollmentError>> {
        
        // Check if the source language is valid and supported
        if (!sourceLanguage.code) {
            return Result.fail({ errorType: "INVALID_SOURCE_LANGUAGE" });
        }

        // Assuming we have a list of supported languages
        if (!this.supportedLanguages.includes(sourceLanguage.code)) {
            return Result.fail({ errorType: "SOURCE_LANGUAGE_NOT_SUPPORTED" });
        }

        // The user must exist in the system before enrolling in a learning path
        const user = await this.userRepository.findById(userId);
        if (!user) {
            return Result.fail({ errorType: "USER_NOT_FOUND" });
        }

        // The learning path must exist in the system before enrolling
        const learningPath = await this.learningPathRepository.findById(learningPathId);
        if (!learningPath) {
            return Result.fail({ errorType: "LEARNING_PATH_NOT_FOUND" });
        }

        // The learning path must be active to allow enrollment
        if (!learningPath.isActive) {
            return Result.fail({ errorType: "LEARNING_PATH_NOT_ACTIVE" });
        }

        // Check if the user is already enrolled in the learning path
        const existingEnrollments = await this.enrollmentRepository.findByUserId(userId);
        const notArchivedEnrollments = existingEnrollments.filter(e => !e.isArchived);
        if (notArchivedEnrollments.some(e => e.learningPathId === learningPathId)) {
            return Result.fail({ errorType: "ALREADY_ENROLLED" });
        }

        // Check if the user has reached the maximum number of enrollments
        if (notArchivedEnrollments.length >= this.maxEnrollmentsPerUser) {
            return Result.fail({ errorType: "MAX_ENROLLMENTS_REACHED" });
        }
        
        // Check if the source language matches the target language of the learning path
        if (sourceLanguage.equals(learningPath.targetLanguage)) {
            return Result.fail({ errorType: "SOURCE_LANGUAGE_MATCHES_TARGET_LANGUAGE" });
        }

        const enrollment = new Enrollment(randomUUID(), userId, learningPathId, sourceLanguage);
        const saveResult = await this.enrollmentRepository.save(enrollment);
        if (saveResult.isFail()) {
            return Result.fail(saveResult.getError());
        }
        
        return Result.ok(enrollment);
    }
}