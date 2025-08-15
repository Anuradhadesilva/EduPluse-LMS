package com.example.lms_backend.Controller;

import com.example.lms_backend.Model.User;
import com.example.lms_backend.Service.EnrollmentService;
import com.example.lms_backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class AdminController {
    @Autowired
    private UserService userService;

    @Autowired
    private EnrollmentService enrollmentService;

    @GetMapping("/students")
    ResponseEntity<?> getAllStudents() {
        return ResponseEntity.ok(userService.getAllStudents());
    }

    @GetMapping("/program/{programId}/students")
    ResponseEntity<?> getAllStudentsByProgram(@PathVariable Long programId) throws Exception {
        List<User> students = enrollmentService.getStudentsByProgram(programId);
        return ResponseEntity.ok(students);
    }

    @DeleteMapping("/programs/{programId}/students/{studentId}")
    ResponseEntity<?> removeStudentFromProgram(@PathVariable Long programId, @PathVariable Long studentId) throws Exception {
        try {
            String msg = enrollmentService.deleteStudentEnrollment(studentId, programId);
            return ResponseEntity.ok(Map.of("message", msg));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
