package com.example.lms_backend.Service;

import com.example.lms_backend.Model.Document;
import com.example.lms_backend.Model.Program;
import com.example.lms_backend.Model.Video;
import com.example.lms_backend.Repo.ProgramRepository;
import com.example.lms_backend.dto.CreateProgramRequest;
import com.example.lms_backend.dto.DocumentDTO;
import com.example.lms_backend.dto.VideoDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProgramServiceImpl implements ProgramService {
    @Autowired
    private ProgramRepository programRepository;

    @Override
    public Program createProgram(CreateProgramRequest request) {
        Program program = new Program();
        program.setImage(request.getImage());
        program.setCategory(request.getCategory());
        program.setRating(request.getRating());
        program.setTitle(request.getTitle());
        program.setLessons(request.getLessons());
        program.setStudents(request.getStudents());
        program.setDuration(request.getDuration());
        program.setPrice(request.getPrice());

        if (request.getVideos() != null) {
            for (VideoDTO videoDTO : request.getVideos()) {
                Video video = new Video();
                video.setTitle(videoDTO.getTitle());
                video.setUrl(videoDTO.getUrl());
                video.setProgram(program);
                program.getVideos().add(video);
            }
        }

        if (request.getDocuments() != null) {
            for (DocumentDTO documentDTO : request.getDocuments()) {
                Document doc = new Document();
                doc.setTitle(documentDTO.getTitle());
                doc.setLink(documentDTO.getLink());
                doc.setProgram(program);
                program.getDocuments().add(doc);
            }
        }

        return programRepository.save(program);

    }

    @Override
    public List<Program> getAllPrograms() {
        return programRepository.findAll();
    }

    @Override
    public Program getProgramById(Long id) {
        return programRepository.findById(id).orElseThrow(() -> new RuntimeException("Program not found with id: " + id));
    }
}
