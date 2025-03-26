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
@AllArgsConstructor
@NoArgsConstructor
public class Mentor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mentorId;

    private String name;

    @Column(nullable = false)
    private String email;

    private String password;

    private int experience;

    private String occupation;

    private String Company;

    @Enumerated(EnumType.STRING)
    private String verificationStatus; //this should be a enum

    public enum verificationStatus{//ensure this enum should be private or public
        ACCEPTED,
        REJECTED
    }

    private List<String> skills;

    private String availability;//this should be a enum
}
