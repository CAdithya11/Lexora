package com.NoIdea.Lexora.model.MentorMenteeModel;

import com.NoIdea.Lexora.model.User.UserEntity;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "mentor_feedback")
@Data
public class MentorFeedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String feedback;
    private LocalDateTime feedback_date_time;
    private double rating;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    private Long mentor_id;

}
