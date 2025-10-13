package com.example.lms_backend.Service;

import com.example.lms_backend.Model.Program;
import com.example.lms_backend.Model.Question;
import com.example.lms_backend.Model.Quiz;
import com.example.lms_backend.Model.QuizSubmission;
import com.example.lms_backend.Repo.*;
import com.example.lms_backend.dto.QuizRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuizServiceImpl implements QuizService {

    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;
    private final ProgramRepository programRepository;
    private final QuizSubmissionRepository quizSubmissionRepository;


    @Override
    public Question addQuestionToQuiz(Long quizId, Question question) {
        Quiz quiz = quizRepository.findById(quizId).orElseThrow(()-> new RuntimeException("Quiz not found with id: " + quizId));
        question.setQuiz(quiz);
        return questionRepository.save(question);
    }

    @Transactional
    public void deleteQuiz(Long quizId) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        // 1️⃣ Delete all quiz submissions linked to this quiz
        List<QuizSubmission> submissions = quizSubmissionRepository.findByQuizId(quizId);
        if (!submissions.isEmpty()) {
            quizSubmissionRepository.deleteAll(submissions);
        }

        // 2️⃣ Delete questions (if cascade doesn’t handle them)
        if (!quiz.getQuestions().isEmpty()) {
            quiz.getQuestions().clear();
        }

        // 3️⃣ Now safely delete the quiz
        quizRepository.delete(quiz);
    }

    @Override
    public Quiz createQuiz(QuizRequest quizRequest) {
        Program program = programRepository.findById(quizRequest.getProgramId())
                .orElseThrow(() -> new RuntimeException("Program not found"));

        Quiz quiz = new Quiz();
        quiz.setProgram(program);
        updateQuizFromRequest(quiz, quizRequest);

        return quizRepository.save(quiz);
    }

    @Override
    public Quiz getQuizById(Long id) {
        return quizRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Quiz not found with ID: " + id));

    }



    @Override
    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }

    @Override
    public List<Quiz> getQuizzesByProgramId(Long programId) {
        return quizRepository.findByProgramId(programId);
    }

    @Override
    public Quiz updateQuiz(Long id, QuizRequest request) {
        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        updateQuizFromRequest(quiz, request);
        return quizRepository.save(quiz);
    }

    private void updateQuizFromRequest(Quiz quiz, QuizRequest request) {
        quiz.setTitle(request.getTitle());

        // Keep track of existing questions
        Map<Long, Question> existingQuestions = quiz.getQuestions().stream()
                .filter(q -> q.getId() != null)
                .collect(Collectors.toMap(Question::getId, q -> q));

        List<Question> updatedQuestions = new ArrayList<>();

        if (request.getQuestions() != null) {
            for (QuizRequest.QuestionRequest dto : request.getQuestions()) {
                if (dto.getQuestion() == null || dto.getQuestion().isBlank()) continue;

                if (dto.getId() != null && existingQuestions.containsKey(dto.getId())) {
                    Question existing = existingQuestions.get(dto.getId());
                    existing.setQuestion(dto.getQuestion());
                    existing.setOptionA(dto.getOptionA());
                    existing.setOptionB(dto.getOptionB());
                    existing.setOptionC(dto.getOptionC());
                    existing.setOptionD(dto.getOptionD());
                    existing.setCorrectAnswer(dto.getCorrectAnswer());
                    updatedQuestions.add(existing);
                } else {
                    // ➕ New question
                    Question newQ = new Question();
                    newQ.setQuestion(dto.getQuestion());
                    newQ.setOptionA(dto.getOptionA());
                    newQ.setOptionB(dto.getOptionB());
                    newQ.setOptionC(dto.getOptionC());
                    newQ.setOptionD(dto.getOptionD());
                    newQ.setCorrectAnswer(dto.getCorrectAnswer());
                    newQ.setQuiz(quiz);
                    updatedQuestions.add(newQ);
                }
            }
        }

        // 🧹 Clear & replace (orphanRemoval = true will delete old)
        quiz.getQuestions().clear();
        quiz.getQuestions().addAll(updatedQuestions);
    }
}