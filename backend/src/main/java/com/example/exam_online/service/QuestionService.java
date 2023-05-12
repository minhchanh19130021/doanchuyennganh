package com.example.exam_online.service;

import com.example.exam_online.entity.Question;
import com.example.exam_online.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.List;

@Service
public class QuestionService {
    @Autowired
    private QuestionRepository questionRepository;

    public Optional<Question> findById(long questionId) {
        return questionRepository.findById(questionId);
    }

    public List<Question> findAll() {
        return questionRepository.findAll();
    }
}
