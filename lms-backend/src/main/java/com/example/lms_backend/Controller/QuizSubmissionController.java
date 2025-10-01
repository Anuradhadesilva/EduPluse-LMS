package com.example.lms_backend.Controller;

import com.example.lms_backend.Model.QuizSubmission;
import com.example.lms_backend.Model.SubmittedAnswer;
import com.example.lms_backend.Service.QuizSubmissionService;
import com.example.lms_backend.dto.QuizSubmissionRequest;
import com.example.lms_backend.dto.QuizSubmissionResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/submission")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class QuizSubmissionController {
    private final QuizSubmissionService quizSubmissionService;

    @PostMapping("/submit")
    public ResponseEntity<QuizSubmissionResponse> submitQuiz(@RequestBody QuizSubmissionRequest request) {
        QuizSubmissionResponse response = quizSubmissionService.submitQuizAnswers(request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<QuizSubmission>> getQuizSubmissionByUser(@PathVariable Long userId) {
        List<QuizSubmission> quizSubmissions = quizSubmissionService.getSubmissionsByUserId(userId);
        return new ResponseEntity<>(quizSubmissions, HttpStatus.OK);
    }
    @GetMapping("/program/{programId}/answers")
    public ResponseEntity<List<SubmittedAnswer>> getSubmittedAnswersByProgram(@PathVariable Long programId) {
        List<SubmittedAnswer> answers = quizSubmissionService.getSubmissionsByProgramId(programId);
        return ResponseEntity.ok(answers);
    }
    @GetMapping("/program/{programId}/submissions")
    public ResponseEntity<List<QuizSubmission>> getSubmissionsByProgram(@PathVariable Long programId) {
        List<QuizSubmission> submissions = quizSubmissionService.getSubmissionsDetailsByProgramId(programId);
        return ResponseEntity.ok(submissions);
    }
}
