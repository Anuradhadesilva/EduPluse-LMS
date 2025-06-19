package com.example.lms_backend.Service;

import com.example.lms_backend.Model.Program;
import com.example.lms_backend.Model.Question;
import com.example.lms_backend.Model.Quiz;
import com.example.lms_backend.Repo.ProgramRepository;
import com.example.lms_backend.Repo.QuestionRepository;
import com.example.lms_backend.Repo.QuizRepository;
import com.example.lms_backend.Repo.UserRepository;
import com.example.lms_backend.dto.QuizRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuizServiceImpl implements QuizService {

    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;
    private final ProgramRepository programRepository;



    @Override
    public Question addQuestionToQuiz(Long quizId, Question question) {
        Quiz quiz = quizRepository.findById(quizId).orElseThrow(()-> new RuntimeException("Quiz not found with id: " + quizId));
        question.setQuiz(quiz);
        return questionRepository.save(question);
    }

    @Override
    public Quiz createQuiz(QuizRequest quizRequest) {
        Program program = programRepository.findById(quizRequest.getProgramId())
                .orElseThrow(() -> new RuntimeException("Program not found"));

        Quiz quiz = new Quiz();
        quiz.setTitle(quizRequest.getTitle());
        quiz.setProgram(program);

        List<Question> questions = new ArrayList<>();
        for (QuizRequest.QuestionRequest q : quizRequest.getQuestions()) {
            Question question = new Question();
            question.setQuestion(q.getQuestion());
            question.setOptionA(q.getOptionA());
            question.setOptionB(q.getOptionB());
            question.setOptionC(q.getOptionC());
            question.setOptionD(q.getOptionD());
            question.setCorrectAnswer(q.getCorrectAnswer());
            question.setQuiz(quiz);
            questions.add(question);
        }

        quiz.setQuestions(questions);
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
}