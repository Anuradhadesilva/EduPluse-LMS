package com.example.lms_backend.dto;

import com.example.lms_backend.Model.Program;
import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
public class CreateProgramRequest {
    // Basic program info remains the same
    private String title;
    private String subtitle;
    private String description;
    private String language;
    private String category;
    private String subcategory;
    private BigDecimal price;
    private String imageUrl;
    private Program.SkillLevel skillLevel;
    private List<String> learningObjectives;
    private List<String> prerequisites;

    // Hierarchical content structure
    private List<SectionDTO> sections;

    @Data
    public static class SectionDTO {
        private Long id;
        private String title;
        private List<LessonDTO> lessons;
    }

    @Data
    public static class LessonDTO {
        private Long id;
        private String title;
        private String type; // "VIDEO", "DOCUMENT", or "QUIZ"

        // ✅ NEW: Explicit fields for each content type
        private VideoDTO video;      // For creating a new video
        private DocumentDTO document;  // For creating a new document
        private Long quizId;       // For linking an existing quiz
    }
}

//package com.example.lms_backend.dto;
//
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//import java.util.List;
//
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
//public class CreateProgramRequest {
//    private String image;
//    private String category;
//    private Double rating;
//    private String title;
//    private String lessons;
//    private String students;
//    private String duration;
//    private String price;
//
//    private List<VideoDTO> videos;
//    private List<DocumentDTO> documents;
//}
