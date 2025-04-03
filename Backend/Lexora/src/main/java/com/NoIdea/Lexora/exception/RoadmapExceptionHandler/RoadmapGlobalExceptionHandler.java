package com.NoIdea.Lexora.exception.RoadmapExceptionHandler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice("roadmapExceptionHandler")
public class GlobalExceptionHandler {

        @ExceptionHandler(ResourceNotFoundException.class)
        public ResponseEntity<?> handleResourceNotFoundException(
                ResourceNotFoundException ex, WebRequest request) {

            Map<String, Object> body = new HashMap<>();
            body.put("timestamp", new Date());
            body.put("status", HttpStatus.NOT_FOUND.value());
            body.put("error", "Not Found");
            body.put("message", ex.getMessage());
            body.put("path", request.getDescription(false));

            return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
        }

        @ExceptionHandler(UnauthorizedException.class)
        public ResponseEntity<?> handleUnauthorizedException(
                UnauthorizedException ex, WebRequest request) {

            Map<String, Object> body = new HashMap<>();
            body.put("timestamp", new Date());
            body.put("status", HttpStatus.FORBIDDEN.value());
            body.put("error", "Forbidden");
            body.put("message", ex.getMessage());
            body.put("path", request.getDescription(false));

            return new ResponseEntity<>(body, HttpStatus.FORBIDDEN);
        }

        @ExceptionHandler(Exception.class)
        public ResponseEntity<?> handleGlobalException(
                Exception ex, WebRequest request) {

            Map<String, Object> body = new HashMap<>();
            body.put("timestamp", new Date());
            body.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
            body.put("error", "Internal Server Error");
            body.put("message", ex.getMessage());
            body.put("path", request.getDescription(false));

            return new ResponseEntity<>(body, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

