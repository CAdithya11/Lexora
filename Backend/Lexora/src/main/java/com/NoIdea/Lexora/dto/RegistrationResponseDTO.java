package com.NoIdea.Lexora.dto;

public class RegistrationResponseDTO {
    public RegistrationResponseDTO() {
    }

    public RegistrationResponseDTO(String error, String message) {
        this.error = error;
        this.message = message;
    }

    private String error;
    private String message;

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
