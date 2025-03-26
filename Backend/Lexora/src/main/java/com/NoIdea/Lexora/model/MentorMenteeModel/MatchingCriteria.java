package com.NoIdea.Lexora.model.MentorMenteeModel;

import java.util.List;
import jakarta.persistence.Entity;
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
public class MatchingCriteria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long criteriaId;

    private Long menteeId;

    private String availability;//enum

    private String password;

    private List<String> preferredSkills;

    private String preferredExperienceLevel;//enum
}
