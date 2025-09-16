package com.example.lms_backend.Controller;


import com.example.lms_backend.Model.QuizAttempt;
import com.example.lms_backend.Model.User;
import com.example.lms_backend.Service.QuizAttemptService;
import com.example.lms_backend.Service.UserService;
import com.example.lms_backend.dto.QuizAttemptDTO;
import com.example.lms_backend.dto.SaveProgressRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/quiz/attempts")
@RequiredArgsConstructor
public class QuizAttemptController {

    private final QuizAttemptService quizAttemptService;
    private final UserService userService;

    @PostMapping("/save-progress")
    public ResponseEntity<?> saveProgress(@RequestBody SaveProgressRequest request, @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        quizAttemptService.saveProgress(request, user);
        return ResponseEntity.ok(Map.of("message", "Progress saved successfully."));
    }

    @GetMapping("/in-progress/{quizId}")
    public ResponseEntity<?> getInProgressAttempt(@PathVariable Long quizId, @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Optional<QuizAttemptDTO> attempt = quizAttemptService.getInProgressAttempt(quizId, user);

        if (attempt.isPresent()) {
            return ResponseEntity.ok(attempt.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
