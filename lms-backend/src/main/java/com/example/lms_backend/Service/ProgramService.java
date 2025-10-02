package com.example.lms_backend.Service;

import com.example.lms_backend.Model.Program;
import com.example.lms_backend.Model.User;
import com.example.lms_backend.dto.CreateProgramRequest;
import com.example.lms_backend.dto.ProgramDTO;

import java.util.List;

public interface ProgramService {
    Program createProgram(CreateProgramRequest request);
    List<ProgramDTO> getAllPrograms();
    Program getProgramById(Long id);
    Program updateProgram(Long id, CreateProgramRequest request);
    void deleteProgram(Long id);
}


