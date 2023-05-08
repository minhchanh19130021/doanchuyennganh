package com.example.exam_online.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotNull;

public class LoginRequest {
    @JsonProperty("username")
    @NotNull(message = "username is required")
    private String username;

    @JsonProperty("password")
    @NotNull(message = "password is required")
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
