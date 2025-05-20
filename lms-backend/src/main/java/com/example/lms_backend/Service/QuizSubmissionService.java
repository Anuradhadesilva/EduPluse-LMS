package com.example.lms_backend.Service;

import com.example.lms_backend.Model.QuizSubmission;
import com.example.lms_backend.dto.QuizSubmissionRequest;
import com.example.lms_backend.dto.QuizSubmissionResponse;

import java.util.List;

public interface QuizSubmissionService {
    QuizSubmissionResponse submitQuizAnswers(QuizSubmissionRequest request);
    List<QuizSubmission> getSubmissionsByUserId(Long userId);
}
