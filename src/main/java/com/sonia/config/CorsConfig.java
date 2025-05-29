package com.sonia.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowCredentials(true); // Allow credentials like cookies and Authorization header
        
        // Allow specific origins. You can also allow all origins with "*", but it's recommended to specify trusted origins for security.
        corsConfiguration.setAllowedOrigins(Arrays.asList(
            "http://localhost:3000" // React frontend
        ));
        
        // Specify allowed headers (headers that can be sent in the actual request)
        corsConfiguration.setAllowedHeaders(Arrays.asList(
                "Origin", "Content-Type", "Accept", "Authorization", "X-Requested-With"
        ));
        
        // Specify allowed methods (HTTP methods allowed for cross-origin requests)
        corsConfiguration.setAllowedMethods(Arrays.asList(
                "GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"
        ));
        
        // Set the max age of the CORS response (in seconds) to avoid preflight requests on every request
        corsConfiguration.setMaxAge(3600L); // 1 hour

        // Apply the configuration to all endpoints
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);

        return new CorsFilter(source);
    }
}
