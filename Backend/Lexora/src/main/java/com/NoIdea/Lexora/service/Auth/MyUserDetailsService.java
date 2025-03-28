package com.NoIdea.Lexora.service.Auth;

import com.NoIdea.Lexora.model.User.UserEntity;
import com.NoIdea.Lexora.repository.User.UserRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class MyUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    public MyUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity userEntity = userRepository.findByEmail(email).orElse(null);

        if (userEntity != null) {
            UserDetails user = User.builder()
                    .username(userEntity.getEmail())
                    .password(userEntity.getPassword())
                    .build();
            return user;
        }
        return null;
    }
}
