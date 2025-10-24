package com.example.userservice.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import java.util.Date;
import java.security.Key;

public class JwtUtil {
    private static final String SECRET = System.getenv().getOrDefault("JWT_SECRET","change_this_secret_for_prod");
    private static final Key KEY = Keys.hmacShaKeyFor(SECRET.getBytes());
    private static final long EXP_MS = 1000L * 60 * 60 * 24; // 24h

    public static String generateToken(String username, String role){
        return Jwts.builder()
                .setSubject(username)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis()+EXP_MS))
                .signWith(KEY)
                .compact();
    }

    public static Jws<Claims> parseToken(String token){
        return Jwts.parserBuilder().setSigningKey(KEY).build().parseClaimsJws(token);
    }
}


