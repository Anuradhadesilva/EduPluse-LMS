package com.example.lms_backend.dto;

import com.example.lms_backend.Model.Program;
import lombok.Data;

import java.util.List;

@Data
public class ProgramDTO {
    // Copy all fields from the Program entity
    private Long id;
    private String title;
    private String subtitle;
    private String description;
    private String language;
    private String category;
    private String subcategory;
    private String imageUrl;
    private Program.SkillLevel skillLevel;
    private Program.ProgramStatus status;
    private List<String> learningObjectives;
    private List<String> prerequisites;

    // ✅ Add the new field for the enrollment count
    private int enrollmentCount;
}
