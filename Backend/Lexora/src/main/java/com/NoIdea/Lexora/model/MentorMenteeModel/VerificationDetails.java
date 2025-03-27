package com.NoIdea.Lexora.model.MentorMenteeModel;

import java.time.LocalDate;

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
public class VerificationDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long verificationId;

    private Long mentorId;

    private String documentType;//this should be a enum

    private String documentUrl;

    private LocalDate submissionDate;

    private String VarificationStatus;//this should be a enum

    private String rejectionStatus;//this should be a enum
}
