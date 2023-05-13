package com.example.exam_online.controller;

import com.example.exam_online.entity.Result;
import com.example.exam_online.exception.CustomException;
import com.example.exam_online.request.HandleExamRequest;
import com.example.exam_online.request.SaveResultRequest;
import com.example.exam_online.response.HandleResponse;
import com.example.exam_online.response.ResponseHandler;
import com.example.exam_online.service.ExamService;
import com.example.exam_online.service.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class HandleExamController {
    @Autowired
    private ExamService examService;
    @Autowired
    private ResultService resultService;

    @PostMapping("/exam-handle")
    public ResponseHandler<HandleResponse> handleExam(@Valid @RequestBody SaveResultRequest saveResultRequest) throws CustomException {
        double totalPoints = 0.0;
        int rightAnswer = 0;
        for(HandleExamRequest handleExamRequest : saveResultRequest.getHandleExamRequests()){
            if(examService.handleExam(handleExamRequest)){
                totalPoints += handleExamRequest.getPointPerQuestion();
                rightAnswer++;
            }
        }
        examService.saveNewResult(saveResultRequest.getExamId(), saveResultRequest.getUserId(), totalPoints);
        HandleResponse handleResponse = new HandleResponse(totalPoints, rightAnswer, saveResultRequest.getHandleExamRequests().size());
        return new ResponseHandler<>("Successfully handle exam", 200, handleResponse);
    }
}
