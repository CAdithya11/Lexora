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
public class SkillList {

    @Id
    @SequenceGenerator(name = "jobrole_seq", sequenceName = "jobrole_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "jobrole_seq")
    private int skillId;
    private String SkillName;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name ="job_role_id")
    private JobRoleEntity jobRoleEntity;

    @OneToMany(mappedBy = "skillList" ,cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SkillQuestion> skillQuestions;

}
