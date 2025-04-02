package com.NoIdea.Lexora.service.MentorMenteeService.MentorMenteeServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.NoIdea.Lexora.model.MentorMenteeModel.Mentee;
import com.NoIdea.Lexora.repository.MentorMenteeRepository.MenteeRepository;
import com.NoIdea.Lexora.service.MentorMenteeService.MenteeService;

@Service
public class MenteeServiceImpl implements MenteeService{

    @Autowired
    private MenteeRepository menteeRepository;

    @Override
    public Mentee saveMentee(Mentee mentee){
        return menteeRepository.save(mentee);
    }
}
