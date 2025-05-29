// package com.sonia.skillstream.service;

// import java.util.Arrays;

// import org.springframework.context.annotation.Bean;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.CorsConfigurationSource;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
// import
// org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import
// org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.web.SecurityFilterChain;

// @EnableWebSecurity
// public class SecurityConfig {

// @Bean
// public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
// http
// .cors() // ✅ Allow CORS
// .and()
// .csrf().disable(); // ⚠️ Only disable if needed, especially for development

// return http.build();
// }

// @Bean
// public CorsConfigurationSource corsConfigurationSource() {
// CorsConfiguration config = new CorsConfiguration();
// config.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
// config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE",
// "OPTIONS"));
// config.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
// config.setAllowCredentials(true);

// UrlBasedCorsConfigurationSource source = new
// UrlBasedCorsConfigurationSource();
// source.registerCorsConfiguration("/**", config);
// return source;
// }
// }
