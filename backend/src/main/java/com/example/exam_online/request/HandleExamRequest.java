package com.example.exam_online.request;

import com.fasterxml.jackson.annotation.JsonProperty;

public class HandleExamRequest {
    @JsonProperty("question_id")
    private Integer idQuestion;
    @JsonProperty("answer_id")
    private Long idAnswer;
    @JsonProperty("point_per_question")
    private double pointPerQuestion;

    public Integer getIdQuestion() {
        return idQuestion;
    }

    public void setIdQuestion(Integer idQuestion) {
        this.idQuestion = idQuestion;
    }

    public Long getIdAnswer() {
        return idAnswer;
    }

    public void setIdAnswer(Long idAnswer) {
        this.idAnswer = idAnswer;
    }

    public double getPointPerQuestion() {
        return pointPerQuestion;
    }

    public void setPointPerQuestion(double pointPerQuestion) {
        this.pointPerQuestion = pointPerQuestion;
    }
}
