package com.example.exam_online.controller;

import com.example.exam_online.request.HandleExamRequest;
import com.example.exam_online.response.HandleResponse;
import com.example.exam_online.response.ResponseHandler;
import com.example.exam_online.service.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class HandleExamController {
    @Autowired
    private ExamService examService;

    @PostMapping("/exam-handle")
    public ResponseHandler<HandleResponse> handleExam(@Valid @RequestBody List<HandleExamRequest> handleExamRequests){
        double totalPoints = 0.0;
        int rightAnswer = 0;
        for(HandleExamRequest handleExamRequest : handleExamRequests){
            if(examService.handleExam(handleExamRequest)){
                totalPoints += handleExamRequest.getPointPerQuestion();
                rightAnswer++;
            }
        }
        HandleResponse handleResponse = new HandleResponse(totalPoints, rightAnswer, handleExamRequests.size());
        return new ResponseHandler<>("Successfully handle exam", 200, handleResponse);
    }
}
