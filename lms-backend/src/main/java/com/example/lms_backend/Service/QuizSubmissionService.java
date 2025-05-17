package com.example.lms_backend.Service;

import com.example.lms_backend.Model.QuizSubmission;
import com.example.lms_backend.dto.AnswerDTO;

import java.util.List;

public interface QuizSubmissionService {
    QuizSubmission submitQuizAnswers(Long quizId, Long userId, List<AnswerDTO> answers);
}
