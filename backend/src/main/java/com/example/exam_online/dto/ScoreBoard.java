package com.example.exam_online.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScoreBoard {
    private long idUser;
    private String username;
    private double score;
    private String exam;

}
