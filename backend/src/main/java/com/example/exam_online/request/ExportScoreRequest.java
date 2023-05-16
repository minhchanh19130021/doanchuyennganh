package com.example.exam_online.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class ExportScoreRequest {
    @JsonProperty("room_id")
    private Long roomId;

    @JsonProperty("exam_id")
    private Long examId;

    public Long getRoomId() {
        return roomId;
    }

    public void setRoomId(Long roomId) {
        this.roomId = roomId;
    }

    public Long getExamId() {
        return examId;
    }

    public void setExamId(Long examId) {
        this.examId = examId;
    }
}
