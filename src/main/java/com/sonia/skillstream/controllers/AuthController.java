package com.sonia.skillstream.controllers;

import com.sonia.skillstream.dto.LoginDto;
import com.sonia.skillstream.models.User; // Your User entity
import com.sonia.skillstream.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
// Potentially: import com.sonia.skillstream.config.JwtTokenProvider; if doing JWTs now

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // Consider global CORS config instead
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    // private final JwtTokenProvider jwtTokenProvider; // If implementing JWTs

    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository /*, JwtTokenProvider jwtTokenProvider */) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        // this.jwtTokenProvider = jwtTokenProvider;
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginDto loginDto) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginDto.getEmail(),
                loginDto.getPassword()
            )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Fetch the user from repository to return more details (excluding password)
        User user = userRepository.findByEmail(loginDto.getEmail());
        if (user != null) {
            // Create a response DTO or manually build a Map to exclude password
            // For now, returning the User object but nullifying password for security
            user.setPassword(null); // Important: don't send hashed password to client
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("User not found after authentication.");


        // If implementing JWTs:
        // String token = jwtTokenProvider.generateToken(authentication);
        // return ResponseEntity.ok(new JwtAuthResponse(token)); // JwtAuthResponse is another DTO
    }

    // The old verify-email method from the commented out AuthController can be removed or refactored
    // if email verification is now handled differently (e.g. as part of UserController's login flow for unverified users).
    // For now, focus on the /login endpoint.
}
