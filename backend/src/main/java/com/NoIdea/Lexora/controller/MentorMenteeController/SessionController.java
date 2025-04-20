package com.NoIdea.Lexora.controller.MentorMenteeController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.NoIdea.Lexora.model.MentorMenteeModel.Session;
import com.NoIdea.Lexora.service.MentorMenteeService.SessionService;

@RestController
@RequestMapping("api/session")
@CrossOrigin("*")
public class SessionController {
    @Autowired
    private SessionService sessionService;

    @PostMapping
    public ResponseEntity<Session> createSession(@RequestBody Session session){
        return ResponseEntity.status(HttpStatus.CREATED).body(sessionService.createSession(session));
    }

    @GetMapping("/{sessionId}")
    public ResponseEntity<Session> viewSessionById(@PathVariable Long sessionId){
        return ResponseEntity.status(HttpStatus.OK).body(sessionService.viewSessionById(sessionId));
    }
}
