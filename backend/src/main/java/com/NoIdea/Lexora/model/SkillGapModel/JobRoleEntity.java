package com.NoIdea.Lexora.model.SkillGapModel;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class JobRoleEntity {
    @Id
    @SequenceGenerator(name = "jobrole_seq", sequenceName = "jobrole_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "jobrole_seq")
    private int JobRoleId;
    private String JobRoleName;

    @OneToMany(mappedBy = "jobRoleEntity" ,cascade = CascadeType.ALL,orphanRemoval = true)
    private List<SkillList> skillLists;
}//