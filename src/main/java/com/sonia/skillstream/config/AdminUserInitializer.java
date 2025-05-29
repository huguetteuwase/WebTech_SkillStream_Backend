package com.sonia.skillstream.config;

import com.sonia.skillstream.models.User;
import com.sonia.skillstream.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminUserInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(AdminUserInitializer.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // Admin user details (consider making these configurable via application.properties)
    private static final String ADMIN_EMAIL = "admin@skillstream.com";
    private static final String ADMIN_PASSWORD = "adminpassword"; // NB: This should be strong & from config in prod
    private static final String ADMIN_ROLE = "ADMIN";

    public AdminUserInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.findByEmail(ADMIN_EMAIL) == null) {
            User adminUser = new User();
            adminUser.setName("Default Admin");
            adminUser.setEmail(ADMIN_EMAIL);
            adminUser.setPassword(passwordEncoder.encode(ADMIN_PASSWORD));
            adminUser.setRole(ADMIN_ROLE);
            adminUser.setAge(30); // Example age
            adminUser.setVerified(true); // Admins should be verified by default

            userRepository.save(adminUser);
            logger.info("Default admin user created with email: {}", ADMIN_EMAIL);
        } else {
            logger.info("Admin user with email {} already exists. No new admin user created.", ADMIN_EMAIL);
        }
    }
}
