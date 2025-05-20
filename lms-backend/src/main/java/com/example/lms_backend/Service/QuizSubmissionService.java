package com.example.lms_backend.Service;

import com.example.lms_backend.dto.QuizSubmissionRequest;
import com.example.lms_backend.dto.QuizSubmissionResponse;

public interface QuizSubmissionService {
    QuizSubmissionResponse submitQuizAnswers(QuizSubmissionRequest request);
}
