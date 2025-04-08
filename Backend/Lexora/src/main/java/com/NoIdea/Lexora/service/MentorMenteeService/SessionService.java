package com.NoIdea.Lexora.service.MentorMenteeService;

import java.util.List;

import org.springframework.stereotype.Service;

import com.NoIdea.Lexora.model.MentorMenteeModel.Session;

@Service
public interface SessionService {
    public Session createSession(Session session);
    public Session viewSessionById(Long sessionId);
    public Long takeTotalSessions();
    public String deleteSession(long sessionId);
    public List<Session> viewAllSessions();
    public Session updateSession(Long sessionId, Session session);
}
