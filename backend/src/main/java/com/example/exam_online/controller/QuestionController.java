package com.example.exam_online.controller;

import com.example.exam_online.entity.Exam;
import com.example.exam_online.entity.Question;
import com.example.exam_online.exception.CustomException;
import com.example.exam_online.response.ResponseHandler;
import com.example.exam_online.service.QuestionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/question")
@CrossOrigin
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @Operation(description = "get all question")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "get successfully all question"),
    })
    @GetMapping("/getAll")
    public ResponseHandler<List<Question>> getExam() throws CustomException {
        ResponseHandler<List<Question>> responseHandler = new ResponseHandler<List<Question>>("oke", HttpStatus.OK.value(), questionService.findAll());
        return responseHandler;
    }
}
