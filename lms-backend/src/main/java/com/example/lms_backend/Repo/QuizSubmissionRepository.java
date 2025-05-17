package com.example.lms_backend.Repo;

import com.example.lms_backend.Model.QuizSubmission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizSubmissionRepository extends JpaRepository<QuizSubmission, Long> {
    List<QuizSubmission> findByUserId(Long userId);
    List<QuizSubmission> findByQuizId(Long quizId);
}
