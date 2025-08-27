package com.example.lms_backend.Repo;

import com.example.lms_backend.Model.Question;
import com.example.lms_backend.Model.SubmittedAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubmittedAnswerRepository extends JpaRepository<SubmittedAnswer, Long> {
        void deleteByQuestion(Question question);
}
