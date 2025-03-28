package com.NoIdea.Lexora.controller.UserController;

import com.NoIdea.Lexora.service.User.UserEntityService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/password")
public class UserEntityPasswordController {
    private final UserEntityService userEntityService;

    public UserEntityPasswordController(UserEntityService userEntityService, PasswordEncoder passwordEncoder) {
        this.userEntityService = userEntityService;
    }

    @PostMapping("/{id}")
    public ResponseEntity<String> changePassword(@RequestBody Map<String,String> passwords, @PathVariable Long id){
        try {
            String response = userEntityService.changePassword(passwords.get("currentPassword"),passwords.get("newPassword"),id);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Current Password Does not match");
        }
    }

}
