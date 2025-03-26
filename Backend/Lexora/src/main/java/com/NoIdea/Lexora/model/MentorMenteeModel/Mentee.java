package com.NoIdea.Lexora.model.MentorMenteeModel;

import java.util.List;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Mentee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long menteeId;

    private String name;

    @Column(nullable = false)
    private String email;

    private String password;

    private List<String> skills;

    @Column(nullable = false)
    private String educationLevel;//this should be a enum

    private String careerGoal;

    private String preferredMentorshipType;//this should be a enum
}
