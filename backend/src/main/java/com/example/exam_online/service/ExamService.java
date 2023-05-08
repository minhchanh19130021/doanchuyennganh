package com.example.exam_online.service;

import com.example.exam_online.entity.AuditInfo;
import com.example.exam_online.entity.Exam;
import com.example.exam_online.entity.Question;
import com.example.exam_online.entity.Questionnaire;
import com.example.exam_online.exception.CustomException;
import com.example.exam_online.repository.ExamRepository;
import com.example.exam_online.repository.QuestionRepository;
import com.example.exam_online.request.CreateExamRequest;
import com.example.exam_online.request.HandleExamRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExamService {
    @Autowired
    ExamRepository examRepository;
    @Autowired
    QuestionRepository questionRepository;
    @Autowired
    QuestionnaireService questionnaireService;

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

    public boolean handleExam(HandleExamRequest handleExamRequest) {
        String answer = questionRepository.findAnswerById(handleExamRequest.getIdQuestion());
        return answer != null && answer.equals(handleExamRequest.getAnswer());
    }
}
