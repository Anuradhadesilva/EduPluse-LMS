package com.example.lms_backend.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuizSubmission {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;


    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name="quiz_id")
    private Quiz quiz;

    private double score;

    @OneToMany(mappedBy = "submission", cascade = CascadeType.ALL)
    private List<SubmittedAnswer> answers = new ArrayList<>();

}
