package com.NoIdea.Lexora.dto.UserProfile;

import java.time.LocalDateTime;


public class LoginResponseDTO {
    private String token;
    private LocalDateTime time;
    private String error;
    private String message;
    private Long user_id;

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public LoginResponseDTO(String token, LocalDateTime time, String error, String message, Long user_id) {
        this.token = token;
        this.time = time;
        this.error = error;
        this.message = message;
        this.user_id = user_id;
    }

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
