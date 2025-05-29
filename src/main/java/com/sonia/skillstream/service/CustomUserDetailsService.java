package com.sonia.skillstream.service;

import com.sonia.skillstream.models.User;
import com.sonia.skillstream.repository.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;
// import java.util.Collections; // Or java.util.Set and java.util.HashSet if handling multiple roles per user in future


@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Assuming userRepository.findByEmail returns User or null
        // If it returns Optional<User>, you would do:
        // User user = userRepository.findByEmail(email)
        // .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        
        User user = userRepository.findByEmail(email); 
        if (user == null) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }

        // Create authorities list
        List<GrantedAuthority> authorities = new ArrayList<>();
        if (user.getRole() != null && !user.getRole().isEmpty()) {
            // Prefix with "ROLE_" as per Spring Security convention
            authorities.add(new SimpleGrantedAuthority("ROLE_" + user.getRole().toUpperCase()));
        } else {
            // Optionally, add a default authority if role is null/empty, or handle as an error
            // For example, you could throw an exception or assign a default role:
            authorities.add(new SimpleGrantedAuthority("ROLE_USER")); // Default role if none is specified
        }
        
        // Return Spring Security User object
        return new org.springframework.security.core.userdetails.User(
            user.getEmail(),
            user.getPassword(), // This must be the HASHED password from the database
            authorities
        );
    }
}