package com.example.lms_backend.Service;

import com.example.lms_backend.Model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User createUser(User user);
    List<User> getAllUsers();
    Optional<User> findByEmail(String email);
}
