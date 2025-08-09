package com.example.lms_backend.Repo;

import com.example.lms_backend.Model.Enrollment;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findByUserId(Long userId);
    List<Enrollment> findByProgramId(Long programId);
    boolean existsByUserIdAndProgramId(Long userId, Long programId);
    @Transactional
    void deleteByUserIdAndProgramId(Long userId, Long programId);
}
