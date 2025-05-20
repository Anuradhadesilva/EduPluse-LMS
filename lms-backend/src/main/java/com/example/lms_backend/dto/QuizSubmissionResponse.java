package com.example.lms_backend.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuizSubmissionResponse {
    private String message;
    private int score;
    private int totalQuestions;
    private int totalAnswers;
    private List<QuestionFeedback> details;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class QuestionFeedback {
        private Long questionId;
        private String question;
        private String selectedAnswer;
        private String correctAnswer;
        private boolean isCorrect;
    }
}
