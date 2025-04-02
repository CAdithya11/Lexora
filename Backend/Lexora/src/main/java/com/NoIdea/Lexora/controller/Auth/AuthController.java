package com.NoIdea.Lexora.controller.Auth;

import com.NoIdea.Lexora.dto.UserProfile.LoginRequestDTO;
import com.NoIdea.Lexora.dto.UserProfile.LoginResponseDTO;
import com.NoIdea.Lexora.dto.UserProfile.RegistrationRequestDTO;
import com.NoIdea.Lexora.model.User.UserEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.NoIdea.Lexora.dto.UserProfile.RegistrationResponseDTO;
import com.NoIdea.Lexora.service.Auth.AuthService;

import java.util.List;

import static com.NoIdea.Lexora.enums.User.Role.STUDENT;

@RestController
@RequestMapping("api/v1/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping
    public List<UserEntity> getAllUsers() {
        return authService.getAllUsers();
    }

    @PostMapping("/register")
    public ResponseEntity<RegistrationResponseDTO> saveUser(@RequestBody RegistrationRequestDTO user) {
        user.setRole(STUDENT);
        RegistrationResponseDTO res = authService.register(user);
        if (res.getError() != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
        }
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO login) {

        LoginResponseDTO res = authService.login(login);
        if (res.getError() != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
        }
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }
}
