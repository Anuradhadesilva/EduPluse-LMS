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

@Service
@RequiredArgsConstructor
public class QuizSubmissionServiceImpl implements QuizSubmissionService {
    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;
    private final QuizSubmissionRepository quizSubmissionRepository;
    private final AnswerRepository answerRepository;



    @Override
    public QuizSubmissionResponse submitQuizAnswers(QuizSubmissionRequest request) {
        Quiz quiz = quizRepository.findById(request.getQuizId()).orElseThrow(()->new RuntimeException("Quiz not found"));
        User user = userRepository.findById(request.getUserId()).orElseThrow(()->new RuntimeException("User not found"));


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
