package com.NoIdea.Lexora.service.MentorMenteeService;

import java.util.List;

import org.springframework.stereotype.Service;

import com.NoIdea.Lexora.model.MentorMenteeModel.Mentor;

@Service
public interface MentorService {
    public Mentor saveMentor(Mentor mentor);
    public List<Mentor> viewAllMentors();
    public Mentor viewMentorById(Long mentorId);
    public Mentor updateMentor(Long mentorId, Mentor mentor);
    public void deleteMentor(Long mentorId);
}
