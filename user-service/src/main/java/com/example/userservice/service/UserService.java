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

    public Optional<User> findById(String id){
        return repo.findById(id);
    }

    public User updateUser(String id, User updates){
        Optional<User> existing = repo.findById(id);
        if(existing.isEmpty()) return null;
        
        User user = existing.get();
        
        // Actualizar solo los campos permitidos (no password ni role)
        if(updates.getEmail() != null) user.setEmail(updates.getEmail());
        if(updates.getUsername() != null) user.setUsername(updates.getUsername());
        
        return repo.save(user);
    }

    public boolean checkPassword(String raw, String encoded){
        return encoder.matches(raw, encoded);
    }
}