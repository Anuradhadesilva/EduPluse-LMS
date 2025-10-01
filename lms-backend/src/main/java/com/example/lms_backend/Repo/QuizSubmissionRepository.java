package com.example.lms_backend.Repo;

import com.example.lms_backend.Model.QuizSubmission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizSubmissionRepository extends JpaRepository<QuizSubmission, Long> {
    List<QuizSubmission> findByUserId(Long userId);
    List<QuizSubmission> findByQuizId(Long quizId);
    boolean existsByQuizIdAndUserId(Long quizId, Long userId);

    @Query("SELECT qs FROM QuizSubmission qs JOIN qs.quiz q WHERE q.program.id = :programId")
    List<QuizSubmission> findAllByProgramId(@Param("programId") Long programId);
}
