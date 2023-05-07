package com.example.exam_online.request;

import com.fasterxml.jackson.annotation.JsonProperty;

public class HandleExamRequest {
    @JsonProperty("question_id")
    private Integer idQuestion;
    @JsonProperty("answer")
    private String answer;
    @JsonProperty("point_per_question")
    private double pointPerQuestion;

    public Integer getIdQuestion() {
        return idQuestion;
    }

    public void setIdQuestion(Integer idQuestion) {
        this.idQuestion = idQuestion;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public double getPointPerQuestion() {
        return pointPerQuestion;
    }

    public void setPointPerQuestion(double pointPerQuestion) {
        this.pointPerQuestion = pointPerQuestion;
    }
}
