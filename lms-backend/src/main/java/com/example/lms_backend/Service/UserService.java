package com.example.lms_backend.Service;
import com.example.lms_backend.Model.User;
import java.util.List;
import java.util.Optional;

public interface UserService {
    public User createUser(User user);
    public List<User> getAllUsers();
    public List<User> getAllStudents();
    public User findUserByJwtToken(String jwt) throws Exception;
    public User findUserByEmail(String email) throws Exception;
}
