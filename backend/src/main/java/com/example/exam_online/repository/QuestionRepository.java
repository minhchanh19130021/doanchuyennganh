package com.example.exam_online.repository;

import com.example.exam_online.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    @Query(nativeQuery = true, value = "select * from questions order by rand() limit :totalNumberOfQuestions")
    List<Question> findQuestionByRandom(@Param("totalNumberOfQuestions") int totalNumberOfQuestions);
    @Query(nativeQuery = true, value = "select result from questions where id = :idQuestion")
    String findAnswerById(Integer idQuestion);
}