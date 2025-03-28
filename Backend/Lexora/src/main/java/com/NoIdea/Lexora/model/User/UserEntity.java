package com.NoIdea.Lexora.model.User;

import jakarta.persistence.*;

@Entity
@Table(name = "UserDetails")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer user_id;
    @Column(unique = true)
    private String email;
    private String password;

    public UserEntity() {
    }

    public Integer getUser_id() {
        return user_id;
    }

    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public UserEntity(Integer user_id, String email, String password) {
        this.user_id = user_id;
        this.email = email;
        this.password = password;
    }
}
