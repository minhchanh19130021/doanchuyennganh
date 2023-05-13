package com.example.exam_online.request;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Getter
@Setter
public class SaveResultRequest {
    private int examId;
    private int userId;
    private List<HandleExamRequest> handleExamRequests;
}
