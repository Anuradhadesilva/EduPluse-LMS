package com.example.lms_backend.Repo;

import com.example.lms_backend.Model.Document;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DocumentRepository extends JpaRepository<Document, Long> {
    List<Document> findByProgramId(Long programId);
}
