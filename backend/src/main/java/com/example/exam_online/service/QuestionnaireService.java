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

    public List<Question> getQuestionsFromCode(long code) throws CustomException {
        List<Questionnaire> list = questionnaireRepository.findByCode(code);
        if (list.size() == 0) {
            throw new CustomException(HttpStatus.NOT_FOUND, "not found questions by this code");
        }
        List<Question> result = new ArrayList<Question>();
        list.forEach(qn -> result.add(qn.getQuestions()));
        return result;
    }
}
