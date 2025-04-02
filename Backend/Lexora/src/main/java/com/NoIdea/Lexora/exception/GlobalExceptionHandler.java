package com.NoIdea.Lexora.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.NoIdea.Lexora.exception.MentorMentee.MentorNotFoundException;
import com.NoIdea.Lexora.exception.MentorMentee.SessionNotFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler {
    public ResponseEntity<String> handlerMentorNotFoundException(MentorNotFoundException mentorNotFoundException){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("An unexpected error occured" + mentorNotFoundException.getMessage());
    }

    public ResponseEntity<String> handlerSessionNotFoundException(SessionNotFoundException sessionNotFoundException){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("An unexpected error occured"+sessionNotFoundException.getMessage());
    }
}
