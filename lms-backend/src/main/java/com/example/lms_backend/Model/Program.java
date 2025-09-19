package com.example.lms_backend.Model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Program {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // --- Core Program Information ---
    private String title;
    private String subtitle;
    @Column(length = 2000)
    private String description;
    private String language;
    private String category;
    private String subcategory;
    private String imageUrl;

    // --- Professional Metadata ---
    @Enumerated(EnumType.STRING)
    private SkillLevel skillLevel;

    @Enumerated(EnumType.STRING)
    private ProgramStatus status;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "instructor_id")
//    private User instructor;

    // --- Student-Facing Details ---
    @ElementCollection
    @CollectionTable(name = "program_learning_objectives", joinColumns = @JoinColumn(name = "program_id"))
    @Column(name = "objective", length=1000)
    private List<String> learningObjectives = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "program_prerequisites", joinColumns = @JoinColumn(name = "program_id"))
    @Column(name = "prerequisite", length=1000)
    private List<String> prerequisites = new ArrayList<>();

    // --- Hierarchical Course Structure ---
    @OneToMany(mappedBy = "program", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    @OrderBy("order ASC")
    private List<Section> sections = new ArrayList<>();


    // --- Enums for structured data ---
    public enum SkillLevel {
        BEGINNER,
        INTERMEDIATE,
        ADVANCED,
        ALL_LEVELS
    }

    public enum ProgramStatus {
        DRAFT,
        PUBLISHED,
        ARCHIVED
    }
}
//
//package com.example.lms_backend.Model;
//
//import com.fasterxml.jackson.annotation.JsonBackReference;
//import com.fasterxml.jackson.annotation.JsonManagedReference;
//import jakarta.persistence.*;
//        import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//import java.awt.print.Book;
//import java.nio.MappedByteBuffer;
//import java.util.ArrayList;
//import java.util.List;
//
//@Entity
//@Data
//@AllArgsConstructor
//@NoArgsConstructor
//public class Program {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    private String image;
//    private String category;
//    private Double rating;
//    private String title;
//    private String lessons;
//    private String students;
//    private String duration;
//    private String price;
//
//    @OneToMany(mappedBy ="program", cascade = CascadeType.ALL, orphanRemoval = true)
//    @JsonManagedReference
//    private List<Video> videos = new ArrayList<>();
//
//    @OneToMany(mappedBy ="program", cascade = CascadeType.ALL, orphanRemoval = true)
//    @JsonManagedReference
//    private List<Document> documents = new ArrayList<>();
//
//    @OneToMany(mappedBy = "program", cascade = CascadeType.ALL, orphanRemoval = true)
//    @JsonManagedReference
//    private List<Quiz> quizzes = new ArrayList<>();
//
//}

