package com.example.exam_online.controller;

import com.example.exam_online.entity.Question;
import com.example.exam_online.exception.CustomException;
import com.example.exam_online.response.ResponseHandler;
import com.example.exam_online.service.QuestionnaireService;
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
@RequestMapping("/api/questionnaire")
@CrossOrigin
public class QuestionnaireController {
    @Autowired
    private QuestionnaireService questionnaireService;

    @Operation(description = "get questions from code and id exam")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "successfully get questions from code"),
            @ApiResponse(responseCode = "404", description = "not found questions from code",
                    content = @Content(schema = @Schema(implementation = ResponseHandler.class)))
    })
    @GetMapping("/getQuestionnaireByExamId/{examId}")
    public ResponseHandler<List<Question>> getQuestionsByExamId(@PathVariable long examId) throws CustomException {
        List<Question> result = questionnaireService.getQuestionsFromExamId(examId);
        ResponseHandler<List<Question>> responseHandler = new ResponseHandler<List<Question>>(
                "successfully get " +
                        "questions from" +
                        " exam id",
                HttpStatus.OK.value(),
                result);
        return responseHandler;
    }

    @Operation(description = "get questions from code and id exam")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "successfully get questions from user id and code"),
            @ApiResponse(responseCode = "404", description = "not found questions from user id and code",
                    content = @Content(schema = @Schema(implementation = ResponseHandler.class)))
    })
    @GetMapping("/getQuestionsByUserIdAndCode/{userId}/{code}")
    public ResponseHandler<List<Question>> getQuestionsByUserIdAndCode(@PathVariable int userId,
                                                                       @PathVariable int code) throws CustomException {
        List<Question> result = questionnaireService.getQuestionsByUserIdAndCode(userId, code);
        ResponseHandler<List<Question>> responseHandler = new ResponseHandler<List<Question>>(
                "successfully get " +
                        "questions from" +
                        " user id and " +
                        "code",
                HttpStatus.OK.value(),
                result);
        return responseHandler;
    }


}
