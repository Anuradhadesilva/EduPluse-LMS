package com.example.lms_backend.Controller;

import com.example.lms_backend.Model.QuizSubmission;
import com.example.lms_backend.Service.QuizSubmissionService;
import com.example.lms_backend.dto.QuizSubmissionRequest;
import com.example.lms_backend.dto.QuizSubmissionResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/submission")
@RequiredArgsConstructor
public class QuizSubmissionController {
    private final QuizSubmissionService quizSubmissionService;

    @PostMapping("/submit")
    public ResponseEntity<QuizSubmissionResponse> submitQuiz(@RequestBody QuizSubmissionRequest request) {
        QuizSubmissionResponse response = quizSubmissionService.submitQuizAnswers(request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
