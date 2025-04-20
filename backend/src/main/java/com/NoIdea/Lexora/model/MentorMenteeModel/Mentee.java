package com.NoIdea.Lexora.model.MentorMenteeModel;

import java.util.List;

import com.NoIdea.Lexora.enums.MentorMentee.EducationLevel;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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

    @Column(nullable = false, unique = true)
    private String email;

    private String password;

    private List<String> skills;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private EducationLevel educationLevel;

    private String careerGoal;

    private String preferredMentorshipType;

    @JsonIgnore
    @OneToMany(mappedBy = "mentee")
    private List<Session> sessions;
}
