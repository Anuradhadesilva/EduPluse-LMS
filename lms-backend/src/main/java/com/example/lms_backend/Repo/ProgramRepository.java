package com.example.lms_backend.Repo;

import com.example.lms_backend.Model.Program;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface ProgramRepository extends JpaRepository<Program, Long> {
}
