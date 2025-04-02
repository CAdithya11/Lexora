package com.NoIdea.Lexora.service.MentorMenteeService;

import org.springframework.stereotype.Service;

import com.NoIdea.Lexora.model.MentorMenteeModel.Mentee;

@Service
public interface MenteeService {
    public Mentee saveMentee(Mentee mentee);
    // public Mentee viewMentorById(Long menteeId);
}
