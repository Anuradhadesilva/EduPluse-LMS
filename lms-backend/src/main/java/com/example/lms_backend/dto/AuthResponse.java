package com.example.lms_backend.dto;

import com.example.lms_backend.Model.USER_ROLE;
import lombok.Data;
import org.springframework.security.core.userdetails.User;

@Data
public class AuthResponse {
    private String jwt;
    private String message;
    private USER_ROLE role;
    private User user; // ✅ Add this field

}

