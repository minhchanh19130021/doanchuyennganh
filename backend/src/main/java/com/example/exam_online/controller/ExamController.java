package com.example.exam_online.controller;

import com.example.exam_online.entity.Exam;
import com.example.exam_online.entity.Question;
import com.example.exam_online.exception.CustomException;
import com.example.exam_online.request.CreateExamRequest;
import com.example.exam_online.request.EditExamRequest;
import com.example.exam_online.response.ResponseHandler;
import com.example.exam_online.service.ExamService;
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
@RequestMapping("/api/exam")
@CrossOrigin
public class ExamController {

    @Autowired
    private ExamService examService;
    @Autowired
    private QuestionService questionService;

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

    @GetMapping("/findExamsByUserId/{userId}")
    public ResponseHandler findExamsByUserId(@PathVariable Long userId) throws CustomException {
        ResponseHandler responseHandler = new ResponseHandler("oke", HttpStatus.OK.value(),
                                                              examService.findExamsByUserId(userId));
        return responseHandler;
    }

    @GetMapping("/getExams")
    public ResponseHandler getExams() {
        ResponseHandler responseHandler = new ResponseHandler("oke", HttpStatus.OK.value(), examService.getExams());
        return responseHandler;
    }

    @PutMapping("/edit")
    public ResponseHandler<List<Question>> edit(@RequestBody EditExamRequest editExamRequest) throws CustomException {
        List<Question> questionList = examService.edit(editExamRequest);
        ResponseHandler<List<Question>> responseHandler = new ResponseHandler<List<Question>>("", HttpStatus.OK.value(), questionList);
        return responseHandler;
    }

    @GetMapping("/isUserAllowedEnterRoom/{userId}/{roomId}")
    public ResponseHandler<Boolean> isUserAllowedEnterRoom(@PathVariable long userId, @PathVariable long roomId) throws CustomException {
        ResponseHandler<Boolean> responseHandler;
        if(examService.isUserAllowedEnterRoom(userId, roomId)) {
            responseHandler = new ResponseHandler<Boolean>("is allowed", HttpStatus.OK.value(), true);
        }
        else {
            responseHandler = new ResponseHandler<Boolean>("is not allowed", HttpStatus.OK.ordinal(), false);
        }
        return responseHandler;
    }
}
