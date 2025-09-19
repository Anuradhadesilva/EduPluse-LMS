package com.example.lms_backend.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Lesson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(name = "lesson_order")
    private int order;

    @Enumerated(EnumType.STRING)
    private LessonType lessonType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "section_id")
    @JsonBackReference
    private Section section;

    @OneToOne
    @JoinColumn(name = "video_id", unique = true, nullable = true)
    private Video video;

    @OneToOne
    @JoinColumn(name = "document_id", unique = true, nullable = true)
    private Document document;

    @OneToOne
    @JoinColumn(name = "quiz_id", unique = true, nullable = true)
    private Quiz quiz;

    public enum LessonType {
        VIDEO,
        DOCUMENT,
        QUIZ
    }
}


