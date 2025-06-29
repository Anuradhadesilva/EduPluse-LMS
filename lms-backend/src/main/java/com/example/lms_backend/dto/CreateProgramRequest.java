package com.example.lms_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateProgramRequest {
    private String image;
    private String category;
    private Double rating;
    private String title;
    private String lessons;
    private String students;
    private String duration;
    private String price;

    private List<VideoDTO> videos;
    private List<DocumentDTO> documents;
}
