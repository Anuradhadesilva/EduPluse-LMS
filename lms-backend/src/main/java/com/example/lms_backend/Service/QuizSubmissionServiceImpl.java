package com.example.lms_backend.Service;

import com.example.lms_backend.Model.QuizSubmission;
import com.example.lms_backend.Repo.QuestionRepository;
import com.example.lms_backend.Repo.QuizRepository;
import com.example.lms_backend.Repo.QuizSubmissionRepository;
import com.example.lms_backend.Repo.UserRepository;
import com.example.lms_backend.dto.AnswerDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuizSubmissionServiceImpl implements QuizSubmissionService {
    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;
    private final QuizSubmissionRepository quizSubmissionRepository;

    @Override
    public QuizSubmission submitQuizAnswers(Long quizId, Long userId, List<AnswerDTO> answers) {
        return null;
    }
}
