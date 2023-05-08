package com.example.exam_online.response;

public class HandleResponse {
    private double totalPoints;
    private int rightAnswer;
    private int totalQuestion;

    public HandleResponse(double totalPoints, int rightAnswer, int totalQuestion) {
        this.totalPoints = totalPoints;
        this.rightAnswer = rightAnswer;
        this.totalQuestion = totalQuestion;
    }

    public double getTotalPoints() {
        return totalPoints;
    }

    public int getRightAnswer() {
        return rightAnswer;
    }

    public int getTotalQuestion() {
        return totalQuestion;
    }
}
