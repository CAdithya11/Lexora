package com.NoIdea.Lexora.service.MentorMenteeService;

import org.springframework.stereotype.Service;

import com.NoIdea.Lexora.model.MentorMenteeModel.Mentor;

@Service
public interface MentorService {
    public Mentor saveMentor();
    public Mentor deleteMentor();
}
