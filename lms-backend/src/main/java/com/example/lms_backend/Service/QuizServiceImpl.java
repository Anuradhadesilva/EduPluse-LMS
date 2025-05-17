package com.example.lms_backend.Service;

import com.example.lms_backend.Model.Question;
import com.example.lms_backend.Model.Quiz;
import com.example.lms_backend.Repo.QuestionRepository;
import com.example.lms_backend.Repo.QuizRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QuizServiceImpl implements QuizService {

    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;

    @Override
    public Quiz createQuiz(Quiz quiz) {
        quiz = quizRepository.save(quiz);
        for (Question question : quiz.getQuestions()) {
            question.setQuiz(quiz);
            questionRepository.save(question);
        }
        return quiz;
    }

    @Override
    public Quiz getQuizById(Long id) {
        return quizRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Quiz not found with ID: " + id));
    }

    @Override
    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }
}