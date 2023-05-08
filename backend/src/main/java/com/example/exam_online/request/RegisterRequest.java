package com.example.exam_online.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotNull;

public class RegisterRequest {
    @NotNull(message = "username is required")
    @JsonProperty("username")
    private String username;
    @NotNull(message = "email is required")
    @JsonProperty("email")
    private String email;
    @NotNull(message = "password is required")
    @JsonProperty("password")
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}