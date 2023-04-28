package com.example.exam_online.repository;

import com.example.exam_online.entity.Questionnaire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.exam_online.entity.Questionnaire;
import org.springframework.data.jpa.repository.Query;
import java.util.*;

@Repository
public interface QuestionnaireRepository extends JpaRepository<Questionnaire, Long> {
    @Query("select qn from questionnaires qn where qn.code = :code")
    List<Questionnaire> findByCode(long code);
}
