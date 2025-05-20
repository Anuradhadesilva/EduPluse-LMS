package com.example.lms_backend.dto;

import com.example.lms_backend.Model.USER_ROLE;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRegisterDTO {
    private String fullName;
    private String email;
    private String password;
    private USER_ROLE role;


}