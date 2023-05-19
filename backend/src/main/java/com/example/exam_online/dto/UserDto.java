package com.example.exam_online.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto implements  IEntityResponse{
    private int idUser;
    private String email;
    private boolean isActive;
    private String role;
    private String username;
}
