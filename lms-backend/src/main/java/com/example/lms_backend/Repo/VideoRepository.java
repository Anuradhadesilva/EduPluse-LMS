package com.example.lms_backend.Repo;

import com.example.lms_backend.Model.Video;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VideoRepository extends JpaRepository<Video, Long> {
    List<Video> findByProgramId(Long programId);
}
