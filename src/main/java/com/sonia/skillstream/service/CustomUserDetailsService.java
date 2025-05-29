// package com.sonia.skillstream.service;

// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;
// import org.springframework.stereotype.Service;

// import com.sonia.skillstream.models.User;
// import com.sonia.skillstream.repository.UserRepository;

// @Service
// public class CustomUserDetailsService implements UserDetailsService {
//     private final UserRepository userRepository;

//     public CustomUserDetailsService(UserRepository userRepository) {
//         this.userRepository = userRepository;
//     }

//     @Override
//     public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//         User user = userRepository.findByEmail(email)
//             .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
//         return new UserPrincipal(user); // Wrap User into UserPrincipal
//     }
// }