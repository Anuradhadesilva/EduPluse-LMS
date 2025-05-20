package com.example.lms_backend.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SubmittedAnswer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Question question;
    private String selectedAnswer;

    @ManyToOne
    @JoinColumn(name = "submission_id")
    private QuizSubmission quizSubmission;
}
