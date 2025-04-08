package com.NoIdea.Lexora.service.MentorMenteeService.MentorMenteeServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.NoIdea.Lexora.exception.MentorMentee.SessionNotFoundException;
import com.NoIdea.Lexora.model.MentorMenteeModel.Mentee;
import com.NoIdea.Lexora.model.MentorMenteeModel.Mentor;
import com.NoIdea.Lexora.model.MentorMenteeModel.Session;
import com.NoIdea.Lexora.repository.MentorMenteeRepository.MenteeRepository;
import com.NoIdea.Lexora.repository.MentorMenteeRepository.MentorRepository;
import com.NoIdea.Lexora.repository.MentorMenteeRepository.SessionRepository;
import com.NoIdea.Lexora.service.MentorMenteeService.SessionService;

@Service
public class SessionServiceImpl implements SessionService{
    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private MenteeRepository menteeRepository;

    @Autowired
    private MentorRepository mentorRepository;

    @Override
    public Session createSession(Session session) {

        Mentor mentor = mentorRepository.findById(session.getMentor().getMentorId())
                                    .orElseThrow(() -> new RuntimeException("Mentor not found"));
        Mentee mentee = menteeRepository.findById(session.getMentee().getMenteeId())
                                    .orElseThrow(() -> new RuntimeException("Mentee not found"));

        session.setMentor(mentor);
        session.setMentee(mentee);

        return sessionRepository.save(session);
    }

    @Override
    public Session viewSessionById(Long sessionId){
        return sessionRepository.findById(sessionId)
            .orElseThrow(()->new SessionNotFoundException("Session is not found by "+sessionId));
    }

    @Override
    public Long takeTotalSessions(){
        Long totalSessions = sessionRepository.count();
        return totalSessions;
    }

    @Override
    public String deleteSession(long sessionId){
        if(sessionRepository.findById(sessionId) == null){
            throw new SessionNotFoundException("Session is not found by "+sessionId);
        }else{
            sessionRepository.deleteById(sessionId);
            return "Session deleted successfully";
        }
    }

    @Override
    public List<Session> viewAllSessions(){
        List<Session> sessions = sessionRepository.findAll();
        return sessions;
    }

    @Override
    public Session updateSession(Long sessionId, Session session){
        Session existingSession = sessionRepository.findById(sessionId)
            .orElseThrow(()->new SessionNotFoundException("Session is not found by "+sessionId));

        existingSession.setSessionStatus(session.getSessionStatus());

        return existingSession;
    }
}
