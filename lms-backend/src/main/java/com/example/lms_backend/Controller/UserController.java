package com.example.lms_backend.Controller;

import com.example.lms_backend.Model.Enrollment;
import com.example.lms_backend.Model.User;
import com.example.lms_backend.Model.USER_ROLE;
import com.example.lms_backend.Service.EnrollmentService;
import com.example.lms_backend.Service.UserService;
import com.example.lms_backend.dto.UserRegisterDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")

public class UserController {
    @Autowired
    private final UserService userService;

    @Autowired
    private final EnrollmentService enrollmentService;

    public UserController(UserService userService, EnrollmentService enrollmentService) {
        this.userService = userService;
        this.enrollmentService = enrollmentService;
    }

    @PostMapping("/create")
    public ResponseEntity<User> createUser(@Valid @RequestBody UserRegisterDTO userDTO) {
        User user = new User();
        user.setFullName(userDTO.getFullName());
        user.setFullName(userDTO.getFullName());
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());
        user.setRole(USER_ROLE.ROLE_STUDENT); // Default role

        User createdUser = userService.createUser(user);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PostMapping("/enroll/{programId}")
    public ResponseEntity<Enrollment> enroll(@RequestHeader("Authorization") String jwt,
                                             @PathVariable Long programId) throws Exception {
        return new ResponseEntity<>(enrollmentService.enrollInProgram(jwt, programId), HttpStatus.CREATED);
    }

    @GetMapping("/enroll/getAll")
    public ResponseEntity<List<Enrollment>> getMyEnrollments(@RequestHeader("Authorization") String jwt) throws Exception {
        return new ResponseEntity<>(enrollmentService.getStudentEnrollments(jwt), HttpStatus.OK);
    }

    @DeleteMapping("/enroll/delete/{programId}")
    public ResponseEntity<?> unEnroll(@RequestHeader("Authorization") String jwt,
                                      @PathVariable Long programId) {
        try {
            String message = enrollmentService.unEnrollInProgram(jwt, programId);
            return ResponseEntity.ok(Map.of("message", message));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
