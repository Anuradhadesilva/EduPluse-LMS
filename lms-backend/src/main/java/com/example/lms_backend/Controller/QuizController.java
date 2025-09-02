package com.example.lms_backend.Controller;

import com.example.lms_backend.Model.Question;
import com.example.lms_backend.Model.Quiz;
import com.example.lms_backend.Service.QuizService;
import com.example.lms_backend.dto.QuizRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quiz")
@CrossOrigin(origins = "http://localhost:3000")
public class QuizController {
    @Autowired
    private QuizService quizService;

    @PostMapping("/create")
    public ResponseEntity<Quiz> createQuiz(@RequestBody QuizRequest quizRequest) {
        Quiz createdQuiz = quizService.createQuiz(quizRequest);
        return ResponseEntity.ok(createdQuiz);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Quiz> updateQuiz(
            @PathVariable Long id,
            @RequestBody QuizRequest request
    ) {
        return ResponseEntity.ok(quizService.updateQuiz(id, request));
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


    @GetMapping("/program/{programId}")
    public List<Quiz> getQuizzesByProgram(@PathVariable Long programId) {
        return quizService.getQuizzesByProgramId(programId);
    }
    @GetMapping
    public List<Quiz> getAllQuizzes() {
        return quizService.getAllQuizzes();
    }

    @DeleteMapping("/{quizId}")
    public ResponseEntity<Void> deleteQuiz(@PathVariable Long quizId) {
        quizService.deleteQuiz(quizId);
        return ResponseEntity.noContent().build();
    }
}
