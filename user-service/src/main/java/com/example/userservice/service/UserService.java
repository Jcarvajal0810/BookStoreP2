package com.example.userservice.service;

import com.example.userservice.model.User;
import com.example.userservice.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository repo;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public UserService(UserRepository repo){
        this.repo = repo;
    }

    public User register(User u){
        u.setPassword(encoder.encode(u.getPassword()));
        if(u.getRole()==null) u.setRole("ROLE_USER");
        return repo.save(u);
    }

    public Optional<User> findByUsername(String username){
        return repo.findByUsername(username);
    }

    public boolean checkPassword(String raw, String encoded){
        return encoder.matches(raw, encoded);
    }
}


