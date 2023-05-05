package com.example.exam_online.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class
CreateExamRequest {
    private String title;
    private long idUserCreate;
    private int totalNumberOfQuestionsInExam;
}
