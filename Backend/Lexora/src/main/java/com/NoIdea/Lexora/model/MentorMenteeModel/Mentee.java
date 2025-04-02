package com.NoIdea.Lexora.model.MentorMenteeModel;

import java.util.List;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
    @Enumerated(EnumType.STRING)
    private EducationLevel educationLevel;

    public enum EducationLevel{
        AL,
        OL,
        DEGREE,
        PHD
    }

    private String careerGoal;

    private String preferredMentorshipType;
}
