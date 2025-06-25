package com.NoIdea.Lexora.service.MentorMenteeService;

import com.NoIdea.Lexora.dto.MentorMentee.MentorFeedbackDTO;
import com.NoIdea.Lexora.model.MentorMenteeModel.MentorFeedback;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface MentorFeedbackService {
    //Find all mentor_id related feedbacks
    List<MentorFeedbackDTO> findAllFeedbacksByMentorId(Long Mentor_id);
    // Create Feedback
    String createFeedback(MentorFeedback mentorFeedback);
    // Update Feedback
    String updateFeedback(Long id,MentorFeedback mentorFeedback);
    // Delete Feedback
    String deleteFeedbackById(Long id);
}
