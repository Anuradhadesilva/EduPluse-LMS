package com.example.lms_backend.Service;


import com.example.lms_backend.Model.Quiz;
import com.example.lms_backend.Model.QuizAttempt;
import com.example.lms_backend.Model.User;
import com.example.lms_backend.Repo.QuizAttemptRepository;
import com.example.lms_backend.Repo.QuizRepository;
import com.example.lms_backend.dto.QuizAttemptDTO;
import com.example.lms_backend.dto.SaveProgressRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QuizAttemptServiceImpl implements QuizAttemptService {

    private final QuizAttemptRepository quizAttemptRepository;
    private final QuizRepository quizRepository;

    @Override
    @Transactional
    public void saveProgress(SaveProgressRequest request, User user) {
        Quiz quiz = quizRepository.findById(request.getQuizId())
                .orElseThrow(() -> new RuntimeException("Quiz not found with id: " + request.getQuizId()));

        QuizAttempt attempt = quizAttemptRepository
                .findByUserIdAndQuizIdAndStatus(user.getId(), request.getQuizId(), QuizAttempt.AttemptStatus.IN_PROGRESS)
                .orElse(new QuizAttempt());

        attempt.setUser(user);
        attempt.setQuiz(quiz);
        attempt.setAnswers(request.getAnswers());
        attempt.setStatus(QuizAttempt.AttemptStatus.IN_PROGRESS);
        attempt.setLastUpdated(LocalDateTime.now());

        quizAttemptRepository.save(attempt);
    }

    @Override
    @Transactional(readOnly = true) // Ensures the database session stays open
    public Optional<QuizAttemptDTO> getInProgressAttempt(Long quizId, User user) {
        return quizAttemptRepository
                .findByUserIdAndQuizIdAndStatus(user.getId(), quizId, QuizAttempt.AttemptStatus.IN_PROGRESS)
                .map(this::convertToDto); // Convert entity to DTO
    }

    // Helper method to perform the conversion
    private QuizAttemptDTO convertToDto(QuizAttempt attempt) {
        return new QuizAttemptDTO(
                attempt.getId(),
                attempt.getQuiz().getId(),
                attempt.getUser().getId(),
                attempt.getAnswers()
        );
    }
}