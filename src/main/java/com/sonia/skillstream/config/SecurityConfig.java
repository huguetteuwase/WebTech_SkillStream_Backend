// package com.sonia.skillstream.config;

// import org.springframework.context.annotation.Bean;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.web.SecurityFilterChain;
// import com.sonia.skillstream.service.CustomUserDetailsService;

// @EnableWebSecurity
// public class SecurityConfig {
//     private final CustomUserDetailsService userDetailsService;

//     public SecurityConfig(CustomUserDetailsService userDetailsService) {
//         this.userDetailsService = userDetailsService;
//     }

//     @Bean
//     public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
//         AuthenticationManagerBuilder authenticationManagerBuilder = 
//             http.getSharedObject(AuthenticationManagerBuilder.class);
//         authenticationManagerBuilder
//             .userDetailsService(userDetailsService)
//             .passwordEncoder(passwordEncoder());
//         return authenticationManagerBuilder.build();
//     }

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         http
//             .csrf().disable()
//             .authorizeRequests()
//                 .requestMatchers("/api/public/**").permitAll()
//                 .anyRequest().authenticated()
//             .and()
//             .formLogin().disable()
//             .httpBasic();
        
//         return http.build();
//     }



//     @Bean
//     public PasswordEncoder passwordEncoder() {
//         return new BCryptPasswordEncoder();
//     }
// }