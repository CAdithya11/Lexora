package com.NoIdea.Lexora.controller.MentorMenteeController;

import com.NoIdea.Lexora.Constant.CommonConstants;
import com.NoIdea.Lexora.dto.MentorMentee.MentorFeedbackDTO;
import com.NoIdea.Lexora.model.MentorMenteeModel.MentorFeedback;
import com.NoIdea.Lexora.service.MentorMenteeService.MentorFeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v2/mentorFeedbacks")
public class MentorFeedbackController {
    @Autowired
    private MentorFeedbackService mentorFeedbackService;
    @PostMapping()
    public ResponseEntity<String> createMentorFeedbacks(@RequestBody MentorFeedback mentorFeedback){
        try{
            return ResponseEntity.status(HttpStatus.CREATED).body(mentorFeedbackService.createFeedback(mentorFeedback));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(CommonConstants.InternalServerError);
        }
    }
    @GetMapping("/{mentor_id}")
    public ResponseEntity<List<MentorFeedbackDTO>> getAllFeedbacksUnderMentor(@PathVariable Long mentor_id){
        try{
            return ResponseEntity.status(HttpStatus.OK).body(mentorFeedbackService.findAllFeedbacksByMentorId(mentor_id));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<String> getAllFeedbacksUnderMentor(@PathVariable Long id,@RequestBody MentorFeedback mentorFeedback){
        try{
            return ResponseEntity.status(HttpStatus.OK).body(mentorFeedbackService.updateFeedback(id,mentorFeedback));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(CommonConstants.InternalServerError);
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFeedbackById(@PathVariable Long id){
        try{
            return ResponseEntity.status(HttpStatus.OK).body(mentorFeedbackService.deleteFeedbackById(id));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(CommonConstants.InternalServerError);
        }
    }
}
