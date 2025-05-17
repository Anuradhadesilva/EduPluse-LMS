package com.example.lms_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuizSubmissionRequest {
    private Long quizId;
    private Long userId;
    private List<AnswerDTO> answers;
}
