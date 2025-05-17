package com.example.lms_backend.Service;

import com.example.lms_backend.Model.Quiz;

import java.util.List;
import java.util.Optional;


public interface QuizService {
    Quiz createQuiz(Quiz quiz);
    Quiz getQuizById(Long id);
    List<Quiz> getAllQuizzes();
}
