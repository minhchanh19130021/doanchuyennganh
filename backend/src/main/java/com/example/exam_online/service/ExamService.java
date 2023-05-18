package com.example.exam_online.service;

import com.example.exam_online.entity.*;
import com.example.exam_online.exception.CustomException;
import com.example.exam_online.repository.*;
import com.example.exam_online.request.CreateExamRequest;
import com.example.exam_online.request.EditExamRequest;
import com.example.exam_online.request.HandleExamRequest;
import com.example.exam_online.response.ResponseHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ExamService {
    @Autowired
    ExamRepository examRepository;
    @Autowired
    QuestionRepository questionRepository;
    @Autowired
    QuestionnaireService questionnaireService;
    @Autowired
    private QuestionService questionService;
    @Autowired
    private AnswerRepository answerRepository;
    @Autowired
    private ResultRepository resultRepository;
    @Autowired
    private RoomExamUserRepository roomExamUserRepository;

    public void deleteExam(Exam exam) {
        examRepository.delete(exam);
    }

    public List<Exam> getExams() {
        return examRepository.findAll();
    }

    public List<Exam> findExamsByUserId(Long userId) throws CustomException {
        List<Exam> examList =
                examRepository.findAll().stream().filter(e -> e.getAuditInfo().getCreateUserId() == userId).collect(Collectors.toList());
        if (examList.size() != 0) {
            return examList;
        }
        throw new CustomException(HttpStatus.NOT_FOUND, "Can't find exam by user id = " + userId);
    }

    public Exam findById(Long examId) {
        return examRepository.findById(examId).orElse(null);
    }


    public Exam createExam(CreateExamRequest createExamRequest) throws CustomException {
        checkEnoughQuestionsToCreate(createExamRequest.getTotalNumberOfQuestionsInExam());
        Exam exam = new Exam();
        LocalDateTime currentTime = LocalDateTime.now();
        AuditInfo auditInfo = new AuditInfo(createExamRequest.getIdUserCreate(), currentTime, 0L, currentTime);
        List<Questionnaire> questionnaires = createQuestionnairesForExam(
                createExamRequest.getTotalNumberOfQuestionsInExam(),
                exam,
                auditInfo);
        exam.setAuditInfo(auditInfo);
        exam.setTitle(createExamRequest.getTitle());
        exam.setQuestionnaires(questionnaires);
        examRepository.save(exam);
        return exam;
    }

    public void checkEnoughQuestionsToCreate(int totalNumberOfQuestionsInEachTopic) throws CustomException {
        if (totalNumberOfQuestionsInEachTopic > questionRepository.count()) {
            throw new CustomException(HttpStatus.BAD_REQUEST, "not enough questions to create exam");
        }
    }

    public List<Questionnaire> createQuestionnairesForExam(int totalNumberOfQuestionsInExam, Exam exam,
                                                           AuditInfo auditInfo) {
        List<Questionnaire> questionnaires = new ArrayList<Questionnaire>();
        int maxCode = questionnaireService.findMaxCode();
        List<Question> questions = questionRepository.findQuestionByRandom(totalNumberOfQuestionsInExam);
        int newCode = maxCode + 1;
        questions.forEach(question -> {
            Questionnaire questionnaire = new Questionnaire();
            questionnaire.setQuestions(question);
            questionnaire.setExam(exam);
            questionnaire.setCode(newCode);
            questionnaire.setAuditInfo(auditInfo);
            questionnaires.add(questionnaire);
        });
        return questionnaires;
    }

    public boolean handleExam(HandleExamRequest handleExamRequest) throws CustomException {
        Answer answer = answerRepository.findById(handleExamRequest.getIdAnswer()).orElseThrow(() -> new CustomException(HttpStatus.NOT_FOUND, "not found answer"));
        return answer.isCorrect();
    }

    public void saveNewQuestionToExam(Exam exam, Question question, long userId) {
        Questionnaire questionnaire = new Questionnaire();
        questionnaire.setQuestions(question);
        questionnaire.setExam(exam);
        questionnaire.setCode(exam.getQuestionnaires().stream().findFirst().get().getCode());
        LocalDateTime currentTime = LocalDateTime.now();
        question.getAuditInfo().setChangeDate(currentTime);
        questionnaire.setAuditInfo(new AuditInfo(userId, currentTime, 0L, currentTime));
        questionnaireService.saveANewQuestionnaire(questionnaire);
        exam.getQuestionnaires().add(questionnaire);
        examRepository.save(exam);
    }

    public List<Question> edit(EditExamRequest editExamRequest) throws CustomException {
        Exam exam = examRepository.findById(editExamRequest.getId()).orElseThrow(() -> new CustomException(HttpStatus.NOT_FOUND, ""));
        exam.setTitle(editExamRequest.getTitle());
        // delete questions
        Collection<Questionnaire> deleteQuestions =  deleteQuestionFromExam(exam, editExamRequest.getQuestionIdListToDelete());
        exam.getQuestionnaires().clear();
        exam.getQuestionnaires().addAll(deleteQuestions);
        // add question
        addQuestion(exam, editExamRequest.getQuestionIdListToAdd());
        examRepository.save(exam);
        return questionnaireService.getQuestionsFromExamId(exam.getId());
    }

    private Collection<Questionnaire> deleteQuestionFromExam(Exam exam, List<Long> questionIdListToDelete) {
        Collection<Questionnaire> questionnaires = exam.getQuestionnaires().stream()
                .filter(q -> !questionIdListToDelete.contains(q.getQuestions().getId())).collect(Collectors.toList());
        return questionnaires;
    }

    private void addQuestion(Exam exam, List<Long> questionIdListToAdd) throws CustomException {
        for (Long qId: questionIdListToAdd) {
            Question question = questionService.findById(qId).orElseThrow(() -> new CustomException(HttpStatus.NOT_FOUND, ""));
            Questionnaire questionnaire = new Questionnaire();
            questionnaire.setQuestions(question);
            questionnaire.setExam(exam);
            questionnaire.setCode(exam.getQuestionnaires().stream().findFirst().get().getCode());
            LocalDateTime currentTime = LocalDateTime.now();
            question.getAuditInfo().setChangeDate(currentTime);
            questionnaire.setAuditInfo(new AuditInfo(1L, currentTime, 0L, currentTime));
            questionnaireService.saveANewQuestionnaire(questionnaire);
            exam.getQuestionnaires().add(questionnaire);
        }
    }

    public void saveNewResult(int examId, int userId, double totalPoints) {
        Result result = new Result();
        result.setIdExam(examId);
        result.setIdUser(userId);
        result.setTotalScore(totalPoints);
        resultRepository.save(result);
    }

    public void saveRoomExamUser(RoomExamUser roomExamUser) {
        roomExamUserRepository.save(roomExamUser);
    }

    public boolean isUserAllowedEnterRoom(@PathVariable long userId, @PathVariable long roomId) throws CustomException {
        return roomExamUserRepository.isUserAllowedEnterRoom(userId, roomId).isPresent();
    }
}
