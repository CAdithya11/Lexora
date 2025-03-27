package com.NoIdea.Lexora.model.MentorMenteeModel;

import java.time.LocalDate;
import java.time.LocalTime;

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
public class Session {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sessionId;

    private Long mentorId;

    private Long menteeId;

    private LocalDate sessionDate;

    private LocalTime sessionTime;

    private String sessionLink;

    private String status;//this should be a enum
}
