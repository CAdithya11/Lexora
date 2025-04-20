package com.NoIdea.Lexora.dto.UserProfile;

import com.NoIdea.Lexora.enums.User.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationRequestDTO {
    private String email;
    private String password;
    private String username;
    private Role role;
}
