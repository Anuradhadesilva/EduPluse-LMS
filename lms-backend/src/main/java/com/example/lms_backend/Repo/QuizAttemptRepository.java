package com.example.lms_backend.Repo;

import com.example.lms_backend.Model.QuizAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface QuizAttemptRepository extends JpaRepository<QuizAttempt, Long> {
    Optional<QuizAttempt> findByUserIdAndQuizIdAndStatus(Long userId, Long quizId, QuizAttempt.AttemptStatus status);
}