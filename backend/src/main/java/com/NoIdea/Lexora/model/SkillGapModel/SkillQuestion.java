package com.NoIdea.Lexora.model.SkillGapModel;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class SkillQuestion {
    @Id
    @SequenceGenerator(name = "jobrole_seq", sequenceName = "jobrole_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "jobrole_seq")
    private int questionId;
    private String question;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "skill_id")
    private SkillList skillList;

    @OneToMany(mappedBy = "skillQuestion" ,cascade = CascadeType.ALL,orphanRemoval = true)
    private List<SkillAnswer> skillAnswers;
}
