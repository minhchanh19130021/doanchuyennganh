package com.example.exam_online.service;

import com.example.exam_online.entity.Question;
import com.example.exam_online.entity.Questionnaire;
import com.example.exam_online.exception.CustomException;
import com.example.exam_online.repository.QuestionRepository;
import com.example.exam_online.repository.QuestionnaireRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuestionnaireService extends AbstractEntityAuditService<Questionnaire> implements IQuestionnaireService<Questionnaire> {
    @Autowired
    QuestionnaireRepository questionnaireRepository;
    @Autowired
    QuestionRepository questionRepository;

    @Override
    protected JpaRepository<Questionnaire, Long> getEntityRepository() {
        return questionnaireRepository;
    }

    public List<Question> getQuestionsFromExamId(long examId) throws CustomException {
        List<Questionnaire> list = questionnaireRepository.findByExamId(examId);
        if (list.size() == 0) {
            throw new CustomException(HttpStatus.NOT_FOUND, "not found questions by exam id = " + examId);
        }
        List<Question> result = new ArrayList<Question>();
        list.forEach(qn -> result.add(qn.getQuestions()));
        return result;
    }

    public List<Question> getQuestionsByUserIdAndCode(int userId, int code) throws CustomException {
        List<Questionnaire> list = questionnaireRepository.findByCreateUserIdAndCode(userId, code);
        if (list.size() == 0) {
            throw new CustomException(HttpStatus.NOT_FOUND, "not found questions by this user id and code");
        }
        List<Question> result = new ArrayList<Question>();
        list.forEach(qn -> result.add(qn.getQuestions()));
        return result;
    }

    public int findMaxCode() {
        return questionnaireRepository.findMaxCode();
    }

    public void saveANewQuestionnaire(Questionnaire questionnaire) {
        questionnaireRepository.save(questionnaire);
    }
}
