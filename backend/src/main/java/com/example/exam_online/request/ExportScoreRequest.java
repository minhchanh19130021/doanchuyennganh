package com.example.exam_online.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class ExportScoreRequest {
    @JsonProperty("user_ids")
    private List<Long> userIds;

    @JsonProperty("exam_id")
    private Long examId;

    public List<Long> getUserIds() {
        return userIds;
    }

    public void setUserIds(List<Long> userIds) {
        this.userIds = userIds;
    }

    public Long getExamId() {
        return examId;
    }

    public void setExamId(Long examId) {
        this.examId = examId;
    }
}
