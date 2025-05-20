package com.example.lms_backend.Controller;

import com.example.lms_backend.Model.Question;
import com.example.lms_backend.Model.Quiz;
import com.example.lms_backend.Service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quiz")
public class QuizController {
    @Autowired
    private QuizService quizService;

    @PostMapping("/create")
    public ResponseEntity<Quiz> createQuiz (@RequestBody Quiz quiz){
        for(Question question:quiz.getQuestions()){
            question.setQuiz(quiz);
        }
        return new ResponseEntity<>(quizService.createQuiz(quiz), HttpStatus.CREATED);
    }

    @PostMapping("/add/{quizId}")
    public ResponseEntity<Question> addQuestionToQuiz (@PathVariable Long quizId, @RequestBody Question question){
        Question createdQuestion = quizService.addQuestionToQuiz(quizId, question);
        return new ResponseEntity<>(createdQuestion, HttpStatus.CREATED);

    }

    @GetMapping("/{quizId}")
    public ResponseEntity<Quiz> getQuizById(@PathVariable Long quizId){
        return new ResponseEntity<>(quizService.getQuizById(quizId), HttpStatus.OK);
    }
    @GetMapping
    public List<Quiz> getAllQuizzes() {
        return quizService.getAllQuizzes();
    }
}
