package com.sonia.skillstream.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
// Import CustomUserDetailsService if it's in a different package and needed for constructor injection
// For example: import com.sonia.skillstream.service.CustomUserDetailsService;

@Configuration
@EnableWebSecurity
// @EnableMethodSecurity // Add this if you plan to use method-level security annotations like @PreAuthorize
public class SecurityConfig {

    // The CustomUserDetailsService can be injected via constructor if needed,
    // but the authenticationManager bean below receives it as a method parameter.
    // private final UserDetailsService userDetailsService;

    // public SecurityConfig(UserDetailsService userDetailsService) {
    //     this.userDetailsService = userDetailsService;
    // }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http, PasswordEncoder passwordEncoder, UserDetailsService userDetailsService) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder =
            http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder
            .userDetailsService(userDetailsService) // UserDetailsService is injected by Spring
            .passwordEncoder(passwordEncoder);
        return authenticationManagerBuilder.build();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Disable CSRF for now, consider enabling with proper configuration for web apps
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/api/auth/**", 
                    "/register", 
                    "/login", 
                    "/verify-code", 
                    "/forgot-password", 
                    "/verify-password-otp", 
                    "/reset-password", 
                    "/ws/**" // WebSocket endpoints
                ).permitAll() // Public authentication and WebSocket endpoints
                .requestMatchers(
                    "/admin/**", 
                    "/api/admin/**"
                ).hasRole("ADMIN") // Secure admin sections
                // Course management endpoints
                .requestMatchers(HttpMethod.POST, "/courses/register").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PATCH, "/courses/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/courses/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/courses/**").permitAll() // Public access to view courses
                .requestMatchers(
                    "/", 
                    "/index.html", 
                    "/static/**", 
                    "/css/**", 
                    "/js/**", 
                    "/img/**", 
                    "/favicon.ico", 
                    "/manifest.json", 
                    "/robots.txt", 
                    "/error" // Common static resources and error page
                ).permitAll() // Allow access to static resources and home
                .anyRequest().authenticated() // All other requests must be authenticated
            );
        // Future: Add JWT filter if applicable, for example:
        // http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}