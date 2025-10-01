package com.example.lms_backend.Repo;

import com.example.lms_backend.Model.SubmittedAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<SubmittedAnswer, Long> {

    /**
     * Finds all submitted answers for all quizzes within a specific program.
     * It joins through QuizSubmission and Quiz to link back to the Program.
     * @param programId The ID of the program.
     * @return A list of submitted answers.
     */
    @Query("SELECT sa FROM SubmittedAnswer sa JOIN sa.quizSubmission qs JOIN qs.quiz q WHERE q.program.id = :programId")
    List<SubmittedAnswer> findAllByProgramId(@Param("programId") Long programId);
}