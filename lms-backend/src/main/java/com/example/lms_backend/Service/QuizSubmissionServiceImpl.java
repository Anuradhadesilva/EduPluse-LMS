package com.example.lms_backend.Service;

import com.example.lms_backend.Model.*;
import com.example.lms_backend.Repo.*;
import com.example.lms_backend.dto.AnswerRequest;
import com.example.lms_backend.dto.QuizSubmissionRequest;
import com.example.lms_backend.dto.QuizSubmissionResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QuizSubmissionServiceImpl implements QuizSubmissionService {
    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;
    private final QuizSubmissionRepository quizSubmissionRepository;
    private final QuizAttemptRepository quizAttemptRepository;
    private final AnswerRepository answerRepository;



    @Override
    public QuizSubmissionResponse submitQuizAnswers(QuizSubmissionRequest request) {
        Quiz quiz = quizRepository.findById(request.getQuizId()).orElseThrow(()->new RuntimeException("Quiz not found"));
        User user = userRepository.findById(request.getUserId()).orElseThrow(()->new RuntimeException("User not found"));

        boolean alreadySubmitted = quizSubmissionRepository.existsByQuizIdAndUserId(
                request.getQuizId(), request.getUserId()
        );
        if (alreadySubmitted) {
            throw new RuntimeException("You have already attempted this quiz.");
        }

        QuizSubmission submission = new QuizSubmission();
        submission.setQuiz(quiz);
        submission.setUser(user);

        List<SubmittedAnswer> answerList = new ArrayList<>();
        List<QuizSubmissionResponse.QuestionFeedback> feedbackList =new ArrayList<>();
        int correctCount = 0;
        for(AnswerRequest answerRequest : request.getAnswers()) {
            Question question = questionRepository.findById(answerRequest.getQuestionId()).orElseThrow(()-> new RuntimeException("Question not found"));

            SubmittedAnswer answer = new SubmittedAnswer();
            answer.setQuestion(question);
            answer.setSelectedAnswer(answerRequest.getSelectedAnswer());
            answer.setQuizSubmission(submission);
            answerList.add(answer);

            boolean isCorrect = question.getCorrectAnswer().equalsIgnoreCase(answer.getSelectedAnswer());
            if (isCorrect) correctCount++;

            feedbackList.add(new QuizSubmissionResponse.QuestionFeedback(
                    question.getId(),
                    question.getQuestion(),
                    answer.getSelectedAnswer(),
                    question.getCorrectAnswer(),
                    isCorrect
            ));

            System.out.println("Answers received: " + answer.getSelectedAnswer());
        }
        submission.setAnswers(answerList);
        submission.setScore(correctCount);
        quizSubmissionRepository.save(submission);

        Optional<QuizAttempt> inProgressAttempt = quizAttemptRepository
                .findByUserIdAndQuizIdAndStatus(user.getId(), quiz.getId(), QuizAttempt.AttemptStatus.IN_PROGRESS);

        inProgressAttempt.ifPresent(quizAttemptRepository::delete);
        return new QuizSubmissionResponse(
                "Quiz submitted successfully",
                correctCount,
                request.getAnswers().size(),
                correctCount,
                feedbackList
        );
    }

    @Override
    public List<QuizSubmission> getSubmissionsByUserId(Long userId) {
        return quizSubmissionRepository.findByUserId(userId);
    }
}




