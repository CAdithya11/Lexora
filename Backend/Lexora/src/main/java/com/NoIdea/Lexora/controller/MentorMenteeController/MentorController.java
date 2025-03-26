package com.NoIdea.Lexora.controller.MentorMenteeController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.NoIdea.Lexora.model.MentorMenteeModel.Mentor;
import com.NoIdea.Lexora.service.MentorMenteeService.MentorService;

@RestController
@RequestMapping("api/mentor")
@CrossOrigin(origins = "*")
public class MentorController {

    @Autowired
    private MentorService mentorService;

    @PostMapping
    public Mentor saveMentor(){
        return mentorService.saveMentor();
    }

    
}
