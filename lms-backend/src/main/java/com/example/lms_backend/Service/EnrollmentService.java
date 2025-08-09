package com.example.lms_backend.Service;

import com.example.lms_backend.Model.Enrollment;
import com.example.lms_backend.Model.Program;
import com.example.lms_backend.Model.User;
import com.example.lms_backend.Repo.EnrollmentRepository;
import com.example.lms_backend.Repo.ProgramRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EnrollmentService {
    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private ProgramRepository programRepository;

    public Enrollment enrollInProgram(String jwt, Long programId) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Program program = programRepository.findById(programId)
                .orElseThrow(() -> new Exception("Program not found"));
        boolean alreadyEnrolled = enrollmentRepository.existsByUserIdAndProgramId(user.getId(), programId);
        if (alreadyEnrolled) {
            throw new Exception("Already Enrolled");
        }

        Enrollment enrollment = new Enrollment();
        enrollment.setUser(user);
        enrollment.setProgram(program);
        return enrollmentRepository.save(enrollment);
    }
    @Transactional
    public String unEnrollInProgram(String jwt, Long programId) throws Exception {
        User user = userService.findUserByJwtToken(jwt);

        boolean enrollExist = enrollmentRepository.existsByUserIdAndProgramId(user.getId(), programId);
        if (!enrollExist) {
            throw new Exception("Not enrolled in this program");
        }

        enrollmentRepository.deleteByUserIdAndProgramId(user.getId(), programId);
        return "Unenrolled successfully";
    }


    public List<Enrollment> getStudentEnrollments(String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        return enrollmentRepository.findByUserId(user.getId());
    }

    public List<User> getStudentsByProgram(Long programId) throws Exception {
        List<Enrollment> enrollments = enrollmentRepository.findByProgramId(programId);
        return enrollments.stream()
                .map(Enrollment::getUser)
                .collect(Collectors.toList());
    }
}
