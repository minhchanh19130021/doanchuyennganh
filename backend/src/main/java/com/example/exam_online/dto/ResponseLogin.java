package com.example.exam_online.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class ResponseLogin {
    private long id;
    private String email;
    private String name;
    private String role;
    private String jwt;
}
