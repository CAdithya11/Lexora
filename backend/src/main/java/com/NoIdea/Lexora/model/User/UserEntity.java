package com.NoIdea.Lexora.model.User;

import com.NoIdea.Lexora.enums.MentorMentee.VerificationStatus;

import com.NoIdea.Lexora.enums.User.Role;
import com.NoIdea.Lexora.model.PersonaMatchingModel.PersonaMatchingModel;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "user")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;
    private String f_name;
    private String l_name;
    @Column(unique = true,nullable = false)
    private String email;
    private String bio;
    @Column(unique = true,nullable = false)
    private String username;
    @Column(unique = true,nullable = false)
    private String password;
    private String career;
    private String occupation;
    private String company;
    private String experience;
    private Role role;
    private VerificationStatus v_status;
    @Lob
    private byte[] profile_image;
    @Lob
    private byte[] degree_certificate;

    @OneToMany(mappedBy = "userEntity",cascade = CascadeType.ALL,orphanRemoval = true)

    private List<PersonaMatchingModel> personaMatchingModels;
}
