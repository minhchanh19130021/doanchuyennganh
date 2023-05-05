package com.example.exam_online.controller;

import com.example.exam_online.entity.Exam;
import com.example.exam_online.exception.CustomException;
import com.example.exam_online.request.CreateExamRequest;
import com.example.exam_online.response.ResponseHandler;
import com.example.exam_online.service.ExamService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/exam")
@CrossOrigin
public class ExamController {

    @Autowired
    private ExamService examService;

    @Operation(description = "get exam")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "get successfully exam"),
            @ApiResponse(responseCode = "404", description = "not found exam",
                    content = @Content(schema = @Schema(implementation = ResponseHandler.class)))
    })
    @GetMapping("/getExam/{examId}")
    public ResponseHandler<Exam> getExam(@PathVariable Long examId) throws CustomException {
        Exam exam = examService.findById(examId);
        if (exam == null) {
            throw new CustomException(HttpStatus.NOT_FOUND, "Exam not found with id: " + examId);
        }
        ResponseHandler<Exam> responseHandler = new ResponseHandler<Exam>("oke", HttpStatus.OK.value(), exam);
        return responseHandler;
    }

    @Operation(description = "delete exam")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "delete successfully exam"),
            @ApiResponse(responseCode = "404", description = "not found exam",
                    content = @Content(schema = @Schema(implementation = ResponseHandler.class)))
    })
    @DeleteMapping("/deleteExam/{examId}")
    public ResponseHandler<Exam> deleteExam(@PathVariable Long examId) throws CustomException {
        Exam exam = examService.findById(examId);
        if (exam == null) {
            throw new CustomException(HttpStatus.NOT_FOUND, "Exam not found with id: " + examId);
        }
        examService.deleteExam(exam);
        ResponseHandler<Exam> responseHandler = new ResponseHandler<Exam>("oke", HttpStatus.OK.value(), null);
        return responseHandler;
    }

    @Operation(description = "create exam")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "create successfully exam"),
            @ApiResponse(responseCode = "404", description = "not found questions from user id and code",
                    content = @Content(schema = @Schema(implementation = ResponseHandler.class)))
    })
    @PostMapping("/createExam")
    public ResponseHandler<Exam> createExam(@RequestBody CreateExamRequest createExamRequest) throws CustomException {
        Exam exam = examService.createExam(createExamRequest);
        ResponseHandler<Exam> responseHandler = new ResponseHandler<Exam>("oke", HttpStatus.OK.value(), exam);
        return responseHandler;
    }
}
