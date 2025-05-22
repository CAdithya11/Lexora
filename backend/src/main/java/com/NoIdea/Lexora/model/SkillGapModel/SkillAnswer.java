package com.NoIdea.Lexora.model.SkillGapModel;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class SkillAnswer {

    @Id
    @SequenceGenerator(name = "jobrole_seq", sequenceName = "jobrole_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "jobrole_seq")
    private int skillAnswerId;
    private String answer;
    private boolean status;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "question_id")
    private SkillQuestion skillQuestion;
}
