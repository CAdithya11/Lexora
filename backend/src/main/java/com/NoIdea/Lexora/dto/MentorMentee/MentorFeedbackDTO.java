package com.NoIdea.Lexora.dto.MentorMentee;

import com.NoIdea.Lexora.model.MentorMenteeModel.MentorFeedback;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Transactional
public class MentorFeedbackDTO {

    private Long id;
    private String feedback;
    private LocalDateTime feedback_date_time;
    private double rating;
    private String user;
    private Long mentor_id;
    private Long sender_id;

    public MentorFeedbackDTO(MentorFeedback mentorFeedback) {
        this.id = mentorFeedback.getId();
        this.feedback = mentorFeedback.getFeedback();
        this.feedback_date_time = mentorFeedback.getFeedback_date_time();
        this.rating = mentorFeedback.getRating();
        this.user = mentorFeedback.getUser().getF_name() + " " + mentorFeedback.getUser().getL_name();
        this.mentor_id = mentorFeedback.getMentor_id();
        this.sender_id = mentorFeedback.getUser().getUser_id();
    }
}
