package com.example.lms_backend.Service;

import com.example.lms_backend.Model.*;
import com.example.lms_backend.Repo.ProgramRepository;
import com.example.lms_backend.Repo.SubmittedAnswerRepository;
import com.example.lms_backend.dto.CreateProgramRequest;
import com.example.lms_backend.dto.DocumentDTO;
import com.example.lms_backend.dto.VideoDTO;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProgramServiceImpl implements ProgramService {

    @Autowired
    private ProgramRepository programRepository;

    @Autowired
    private final SubmittedAnswerRepository submittedAnswerRepository;


    @Override
    public Program createProgram(CreateProgramRequest request) {
        Program program = new Program();
        updateProgramFromRequest(program, request);
        return programRepository.save(program);
    }

    @Override
    public List<Program> getAllPrograms() {
        return programRepository.findAll();
    }

    @Override
    public Program getProgramById(Long id) {
        return programRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Program not found with id: " + id));
    }

    @Override
    @Transactional
    public void deleteProgram(Long id) {
        Program program = getProgramById(id);
        for (Quiz quiz : program.getQuizzes()) {
            for(Question question : quiz.getQuestions()) {
                submittedAnswerRepository.deleteByQuestion(question);
            }
        }
        programRepository.delete(program);
    }

    @Override
    public Program updateProgram(Long id, CreateProgramRequest request) {
        Program program = getProgramById(id);

        updateProgramFromRequest(program, request);
        return programRepository.save(program);
    }


    // 🔧 Extracted helper to populate program from DTO
    private void updateProgramFromRequest(Program program, CreateProgramRequest request) {
        program.setImage(request.getImage());
        program.setCategory(request.getCategory());
        program.setRating(request.getRating());
        program.setTitle(request.getTitle());
        program.setLessons(request.getLessons());
        program.setStudents(request.getStudents());
        program.setDuration(request.getDuration());
        program.setPrice(request.getPrice());

        // Update videos
        Map<Long, Video> existingVideos = program.getVideos().stream()
                .filter(v -> v.getId() != null)
                .collect(Collectors.toMap(Video::getId, v -> v));

        List<Video> updatedVideos = new ArrayList<>();

        if (request.getVideos() != null) {
            for (VideoDTO dto : request.getVideos()) {
                if (dto.getId() != null && existingVideos.containsKey(dto.getId())) {
                    // Update existing video
                    Video existing = existingVideos.get(dto.getId());
                    existing.setTitle(dto.getTitle());
                    existing.setUrl(dto.getUrl());
                    updatedVideos.add(existing);
                } else {
                    // Add new video
                    Video newVideo = new Video();
                    newVideo.setTitle(dto.getTitle());
                    newVideo.setUrl(dto.getUrl());
                    newVideo.setProgram(program);
                    updatedVideos.add(newVideo);
                }
            }
        }

        program.getVideos().clear();
        program.getVideos().addAll(updatedVideos);

        // Update documents
        Map<Long, Document> existingDocs = program.getDocuments().stream()
                .filter(d -> d.getId() != null)
                .collect(Collectors.toMap(Document::getId, d -> d));

        List<Document> updatedDocs = new ArrayList<>();

        if (request.getDocuments() != null) {
            for (DocumentDTO dto : request.getDocuments()) {
                if (dto.getId() != null && existingDocs.containsKey(dto.getId())) {
                    Document existing = existingDocs.get(dto.getId());
                    existing.setTitle(dto.getTitle());
                    existing.setLink(dto.getLink());
                    updatedDocs.add(existing);
                } else {
                    Document newDoc = new Document();
                    newDoc.setTitle(dto.getTitle());
                    newDoc.setLink(dto.getLink());
                    newDoc.setProgram(program);
                    updatedDocs.add(newDoc);
                }
            }
        }

        program.getDocuments().clear();
        program.getDocuments().addAll(updatedDocs);
    }
}
