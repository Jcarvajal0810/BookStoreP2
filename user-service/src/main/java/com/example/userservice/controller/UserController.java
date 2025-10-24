package com.example.userservice.controller;
import java.util.Map;
import org.springframework.http.ResponseEntity;

import com.example.userservice.model.User;
import com.example.userservice.service.UserService;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    public UserController(UserService userService){ this.userService = userService; }

    @GetMapping("/{username}")
    public Object getProfile(@PathVariable String username){
        Optional<User> u = userService.findByUsername(username);
        Optional<User> user = userService.findByUsername(username);
        return user.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // endpoint que el scheduler puede llamar (desacoplado)
    @PostMapping("/tasks/deactivate-inactive")
    public Object deactivateInactive(@RequestBody Map<String,Object> payload){
        // implementacin demo: retorna OK; en produccin buscar usuarios inactivos y tocar bd
        return Map.of("result","ok","received",payload);
    }
}


