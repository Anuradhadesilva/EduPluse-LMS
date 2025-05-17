package com.example.lms_backend.DTO;

import lombok.Data;

@Data
public class AnswerDTO {
    private Long questionId;
    private String selectedAnswer;
}
