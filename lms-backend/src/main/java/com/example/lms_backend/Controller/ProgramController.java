package com.example.lms_backend.Controller;

import com.example.lms_backend.Model.Program;
import com.example.lms_backend.Repo.ProgramRepository;
import com.example.lms_backend.Service.ProgramService;
import com.example.lms_backend.Service.QuizService;
import com.example.lms_backend.dto.CreateProgramRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/program")
@CrossOrigin(origins = "http://localhost:3000")
public class ProgramController {

    @Autowired
    private final ProgramService programService;


    public ProgramController(ProgramService programService) {
        this.programService = programService;
    }

    @PostMapping
    public ResponseEntity<Program> createProgram(@RequestBody CreateProgramRequest request) {
        return new ResponseEntity<>(programService.createProgram(request), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Program>> getAllPrograms() {
        return ResponseEntity.ok(programService.getAllPrograms());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Program> getProgramById(@PathVariable Long id) {
        return ResponseEntity.ok(programService.getProgramById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Program> updateProgram(@PathVariable Long id, @RequestBody CreateProgramRequest request) {
        Program updated = programService.updateProgram(id, request);
        return ResponseEntity.ok(updated);
    }
}
