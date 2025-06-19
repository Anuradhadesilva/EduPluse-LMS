package com.example.lms_backend.Service;

import com.example.lms_backend.Model.Question;
import com.example.lms_backend.Model.Quiz;
import com.example.lms_backend.dto.QuizRequest;

import java.util.List;
import java.util.Optional;


public interface QuizService {
    Quiz createQuiz( QuizRequest request);
    Quiz getQuizById(Long id);
    List<Quiz> getAllQuizzes();
    List<Quiz> getQuizzesByProgramId(Long programId);
    Question addQuestionToQuiz(Long quizId,Question question);
}
