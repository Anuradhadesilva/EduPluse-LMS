package com.example.lms_backend.Service;

import com.example.lms_backend.Model.*;
import com.example.lms_backend.Repo.*;
import com.example.lms_backend.dto.CreateProgramRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProgramServiceImpl implements ProgramService {

    private final ProgramRepository programRepository;
    // Add repositories for new content types
    private final VideoRepository videoRepository;
    private final DocumentRepository documentRepository;
    private final QuizRepository quizRepository;

    @Override
    @Transactional
    public Program createProgram(CreateProgramRequest request) {
        Program program = new Program();
        updateProgramFromRequest(program, request);
        return programRepository.save(program);
    }

    @Override
    public List<Program> getAllPrograms() {
        return programRepository.findAll();
    }

    @Override
    public Program getProgramById(Long id) {
        return programRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Program not found with id: " + id));
    }

    @Override
    @Transactional
    public void deleteProgram(Long id) {
        Program program = getProgramById(id);

        // ✅ FIX: Manually detach all associated content before deleting the program.
        // This satisfies the foreign key constraints.

        // 1. Find all Videos, Documents, and Quizzes linked to this program.
        // This includes content linked directly OR indirectly through lessons.
        List<Video> videosToDetach = videoRepository.findByProgramId(id);
        List<Document> documentsToDetach = documentRepository.findByProgramId(id);
        List<Quiz> quizzesToDetach = quizRepository.findByProgramId(id);

        // 2. Set their program reference to null to break the foreign key link.
        videosToDetach.forEach(video -> video.setProgram(null));
        documentsToDetach.forEach(doc -> doc.setProgram(null));
        quizzesToDetach.forEach(quiz -> quiz.setProgram(null));

        // 3. Save the changes to the content tables.
        videoRepository.saveAll(videosToDetach);
        documentRepository.saveAll(documentsToDetach);
        quizRepository.saveAll(quizzesToDetach);

        // 4. Now it is safe to delete the program.
        // The cascading delete will handle removing the sections and lessons.
        programRepository.delete(program);
    }

    @Override
    @Transactional
    public Program updateProgram(Long id, CreateProgramRequest request) {
        Program program = getProgramById(id);
        updateProgramFromRequest(program, request);
        return programRepository.save(program);
    }

    // This helper method now handles the professional hierarchical structure
    private void updateProgramFromRequest(Program program, CreateProgramRequest request) {
        // Update professional program details
        program.setTitle(request.getTitle());
        program.setSubtitle(request.getSubtitle());
        program.setDescription(request.getDescription());
        program.setLanguage(request.getLanguage());
        program.setCategory(request.getCategory());
        program.setSubcategory(request.getSubcategory());
        program.setImageUrl(request.getImageUrl());
        program.setSkillLevel(request.getSkillLevel());
        program.setLearningObjectives(request.getLearningObjectives());
        program.setPrerequisites(request.getPrerequisites());
        program.setStatus(Program.ProgramStatus.DRAFT); // Default status

        // Hierarchical Content Update Logic
        if (request.getSections() == null) {
            program.getSections().clear();
            return;
        }

        Map<Long, Section> existingSections = program.getSections().stream()
                .filter(s -> s.getId() != null)
                .collect(Collectors.toMap(Section::getId, Function.identity()));

        List<Section> updatedSections = new ArrayList<>();
        int sectionOrder = 1;

        for (CreateProgramRequest.SectionDTO sectionDto : request.getSections()) {
            Section section = existingSections.getOrDefault(sectionDto.getId(), new Section());
            section.setTitle(sectionDto.getTitle());
            section.setOrder(sectionOrder++);
            section.setProgram(program);

            Map<Long, Lesson> existingLessons = section.getLessons().stream()
                    .filter(l -> l.getId() != null)
                    .collect(Collectors.toMap(Lesson::getId, Function.identity()));
            List<Lesson> updatedLessons = new ArrayList<>();
            int lessonOrder = 1;

            if (sectionDto.getLessons() != null) {
                for (CreateProgramRequest.LessonDTO lessonDto : sectionDto.getLessons()) {
                    Lesson lesson = existingLessons.getOrDefault(lessonDto.getId(), new Lesson());
                    lesson.setTitle(lessonDto.getTitle());
                    lesson.setOrder(lessonOrder++);
                    lesson.setSection(section);

                    if (lessonDto.getType() == null || lessonDto.getType().isBlank()) {
                        throw new IllegalArgumentException("Lesson type cannot be null for lesson: '" + lessonDto.getTitle() + "'");
                    }
                    lesson.setLessonType(Lesson.LessonType.valueOf(lessonDto.getType()));

                    switch (lesson.getLessonType()) {
                        case VIDEO:
                            if (lessonDto.getVideo() == null) throw new IllegalArgumentException("Video details are required for a video lesson.");
                            Video video = lesson.getVideo() != null ? lesson.getVideo() : new Video();
                            video.setTitle(lessonDto.getVideo().getTitle());
                            video.setUrl(lessonDto.getVideo().getUrl());
                            videoRepository.save(video); // Save the video to get an ID
                            lesson.setVideo(video);
                            break;
                        case DOCUMENT:
                            if (lessonDto.getDocument() == null) throw new IllegalArgumentException("Document details are required for a document lesson.");
                            Document doc = lesson.getDocument() != null ? lesson.getDocument() : new Document();
                            doc.setTitle(lessonDto.getDocument().getTitle());
                            doc.setLink(lessonDto.getDocument().getLink());
                            documentRepository.save(doc); // Save the document to get an ID
                            lesson.setDocument(doc);
                            break;
                        case QUIZ:
                            if (lessonDto.getQuizId() == null) throw new IllegalArgumentException("A Quiz ID is required for a quiz lesson.");
                            Quiz quiz = quizRepository.findById(lessonDto.getQuizId()).orElseThrow(() -> new RuntimeException("Quiz not found with ID: " + lessonDto.getQuizId()));
                            lesson.setQuiz(quiz);
                            break;
                    }
                    updatedLessons.add(lesson);
                }
            }
            section.getLessons().clear();
            section.getLessons().addAll(updatedLessons);
            updatedSections.add(section);
        }

        program.getSections().clear();
        program.getSections().addAll(updatedSections);
    }
}
