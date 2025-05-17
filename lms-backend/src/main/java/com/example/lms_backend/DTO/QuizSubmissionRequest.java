package com.example.lms_backend.DTO;

import lombok.Data;

import java.util.List;

@Data
public class QuizSubmissionRequest {
    private Long quizId;
    private List<AnswerDTO> answers;
}
