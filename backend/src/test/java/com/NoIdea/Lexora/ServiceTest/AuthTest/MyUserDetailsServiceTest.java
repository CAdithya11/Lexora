package com.NoIdea.Lexora.ServiceTest.AuthTest;

import com.NoIdea.Lexora.model.User.UserEntity;
import com.NoIdea.Lexora.repository.User.UserEntityRepository;
import com.NoIdea.Lexora.service.Auth.MyUserDetailsService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class MyUserDetailsServiceTest {

    private UserEntityRepository userRepository;
    private MyUserDetailsService myUserDetailsService;

    @BeforeEach
    void setUp() {
        userRepository = mock(UserEntityRepository.class);
        myUserDetailsService = new MyUserDetailsService(userRepository);
    }

    //Setup a mock user entity
    @Test
    void testLoadUserByUsername_UserExists() {
        UserEntity userEntity = new UserEntity();
        userEntity.setEmail("test@example.com");
        userEntity.setPassword("encodedPassword123");

        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(userEntity));

        UserDetails userDetails = myUserDetailsService.loadUserByUsername("test@example.com");

        assertNotNull(userDetails);
        assertEquals("test@example.com", userDetails.getUsername());
        assertEquals("encodedPassword123", userDetails.getPassword());

        // Verify that the repository was called once
        verify(userRepository, times(1)).findByEmail("test@example.com");
    }

    // Simulate user not found
    @Test
    void testLoadUserByUsername_UserDoesNotExist() {

        when(userRepository.findByEmail("missing@example.com")).thenReturn(Optional.empty());

        UserDetails userDetails = myUserDetailsService.loadUserByUsername("missing@example.com");
        assertNull(userDetails);
        verify(userRepository, times(1)).findByEmail("missing@example.com");
    }
}

