package com.example.exam_online.controller;

import com.example.exam_online.dto.ScoreBoard;
import com.example.exam_online.dto.ScorePDFExporter;
import com.example.exam_online.entity.Exam;
import com.example.exam_online.entity.User;
import com.example.exam_online.request.ExportScoreRequest;
import com.example.exam_online.response.ResponseHandler;
import com.example.exam_online.service.ExamService;
import com.example.exam_online.service.ResultService;
import com.example.exam_online.service.UserService;
import com.lowagie.text.DocumentException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ExportController {
    @Autowired
    private UserService userService;
    @Autowired
    private ResultService resultService;
    @Autowired
    private ExamService examService;
    @PostMapping("/export/pdf")
    public ResponseHandler<List<ScoreBoard>> exportToPDF(@RequestBody ExportScoreRequest exportScoreRequest) throws DocumentException, IOException {
        List<Long> userIds = userService.getUserIds(exportScoreRequest.getRoomId());
        List<User> users = userService.findUserByIds(userIds);
        Exam exam = examService.findById(exportScoreRequest.getExamId());
        List<ScoreBoard> list = new ArrayList<>();
        users.forEach(user -> {
            list.add(new ScoreBoard(user.getIdUser(),user.getUsername(), resultService.getScore(Math.toIntExact(user.getIdUser()), Math.toIntExact(exam.getId())), exam.getTitle()));
        });

return new ResponseHandler<List<ScoreBoard>>("Success", 200, list);
    }
}
