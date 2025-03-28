package com.NoIdea.Lexora.dto;

import java.time.LocalDateTime;


public class LoginResponseDTO {
    private String token;
    private LocalDateTime time;
    private String error;
    private String message;

    public LoginResponseDTO(String token, LocalDateTime time, String error, String message) {
        this.token = token;
        this.time = time;
        this.error = error;
        this.message = message;
    }

    public LoginResponseDTO() {
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
