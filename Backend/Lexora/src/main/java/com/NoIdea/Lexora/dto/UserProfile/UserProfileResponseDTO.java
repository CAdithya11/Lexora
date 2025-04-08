package com.NoIdea.Lexora.dto.UserProfile;

import com.NoIdea.Lexora.enums.MentorMentee.VerificationStatus;
import com.NoIdea.Lexora.enums.User.Role;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Transactional
@Data
public class UserProfileResponseDTO {
    private Long user_id;
    private String f_name;
    private String l_name;
    private String email;
    private String bio;
    private String username;
    private String password;
    private String career;
    private String occupation;
    private String company;
    private String experience;
    private Role role;
    private VerificationStatus v_status;
    private String profile_image;
    private String degree_certificate;
}
