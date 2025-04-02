package com.NoIdea.Lexora.exception.MentorMentee;

public class SessionNotFoundException extends RuntimeException{
    public SessionNotFoundException(String message){
        super(message);
    }
}
