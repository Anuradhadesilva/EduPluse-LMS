package com.example.lms_backend.Service;

import com.example.lms_backend.Model.QuizAttempt;
import com.example.lms_backend.Model.User;
import com.example.lms_backend.dto.QuizAttemptDTO;
import com.example.lms_backend.dto.SaveProgressRequest;

import java.util.Optional;

public interface QuizAttemptService {
    void saveProgress(SaveProgressRequest request, User user);
    Optional<QuizAttemptDTO> getInProgressAttempt(Long quizId, User user); // Changed return type
}
