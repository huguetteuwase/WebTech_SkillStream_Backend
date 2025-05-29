package com.sonia.skillstream.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sonia.skillstream.models.User;
import com.sonia.skillstream.repository.UserRepository;
import com.sonia.skillstream.service.MailService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping // You can add a base path here, e.g., "/api"
public class UserController {

    private final UserRepository userRepository;
    private final MailService mailService;

    // Store email -> verification code (for initial login verification)
    private final Map<String, String> verificationCodes = new HashMap<>();
    // Store email -> password reset OTP (for forgot password flow)
    private final Map<String, String> passwordResetCodes = new HashMap<>();


    public UserController(UserRepository userRepository, MailService mailService) {
        this.userRepository = userRepository;
        this.mailService = mailService;
    }

    @GetMapping
    public String Welcome() {
        return "Welcome to SkillStream";
    }

    @GetMapping("admin/users")
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    // Registration
    public record RegisterUserRequest(String name, String email, String password, String role, Integer age) {}

    @PostMapping("register")
    public ResponseEntity<String> register(@RequestBody RegisterUserRequest request){
        if (userRepository.existsByEmail(request.email)){
            return ResponseEntity.badRequest().body("User with email \"" + request.email + "\" already exists.");
        }
        User user = new User();
        user.setName(request.name);
        user.setEmail(request.email);
        user.setPassword(request.password);
        user.setAge(request.age);
        user.setRole(request.role);
        user.setVerified(false); // <--- IMPORTANT: New users are not verified by default
        userRepository.save(user);
        return ResponseEntity.ok("User created. Please login to verify your account.");
    }

    // Login + send verification code or direct login if verified
    public record UserLoginRequest(String email, String password) {}

    @PostMapping("login")
    public ResponseEntity<Object> login(@RequestBody UserLoginRequest request){
        User user = userRepository.findByEmail(request.email); // Assume findByEmail returns null if not found

        if (user == null){ // Check if user exists
            return ResponseEntity.badRequest().body("User doesn't exist.");
        }
        if (!user.getPassword().equals(request.password)) {
            return ResponseEntity.badRequest().body("Password doesn't match.");
        }

        // <--- IMPORTANT NEW LOGIC HERE:
        // If user is already verified, return the user object directly
        if (user.isVerified()) {
            return ResponseEntity.ok(user); // Frontend will store user and navigate to dashboard
        } else {
            // User is not verified, send verification code
            String code = String.valueOf(100000 + new Random().nextInt(900000));
            verificationCodes.put(user.getEmail(), code); // Store the code
            
            mailService.sendEmail(user.getEmail(), "Your SkillStream Verification Code", 
                "Hi " + user.getName() + ",\n\nYour SkillStream verification code is: " + code + "\n\nThank you!");
            
            return ResponseEntity.ok("Verification code sent to your email."); // Frontend will show modal
        }
    }

    // Verify code
    public record CodeVerificationRequest(String email, String code) {}

    @PostMapping("verify-code")
    public ResponseEntity<Object> verifyCode(@RequestBody CodeVerificationRequest request) {
        String storedCode = verificationCodes.get(request.email);
        if (storedCode != null && storedCode.equals(request.code)) {
            verificationCodes.remove(request.email); // Remove code after successful verification

            User user = userRepository.findByEmail(request.email);
            if (user != null) {
                user.setVerified(true); // <--- IMPORTANT: Mark user as verified
                userRepository.save(user); // <--- IMPORTANT: Save the updated user
                return ResponseEntity.ok(user); // Return the updated user object
            }
            return ResponseEntity.badRequest().body("User not found after verification."); // Should not happen if email matched
        }
        return ResponseEntity.badRequest().body("Invalid verification code.");
    }

    // Delete user
    @DeleteMapping("admin/users/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable("userId") Integer id){
        if (!userRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        userRepository.deleteById(id);
        return ResponseEntity.ok("User deleted successfully.");
    }


    // Forgot Password - Send OTP
    public record ForgotPasswordRequest(String email) {}

    @PostMapping("forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        User user = userRepository.findByEmail(request.email());
        if (user == null) {
            return ResponseEntity.badRequest().body("User with this email doesn't exist.");
        }
        
        // Generate and store 6-digit OTP
        String code = String.valueOf(100000 + new Random().nextInt(900000));
        passwordResetCodes.put(user.getEmail(), code);
        
        // Send email
        mailService.sendEmail(user.getEmail(), "Your SkillStream Password Reset OTP", 
            "Hi " + user.getName() + ",\n\nYour password reset OTP is: " + code + 
            "\n\nThis code will expire in 10 minutes." +
            "\n\nIf you didn't request this, please ignore this email." +
            "\n\nThank you!");
        
        return ResponseEntity.ok("Password reset OTP sent to your email.");
    }

    // Verify Password Reset OTP
    public record VerifyPasswordOTPRequest(String email, String code) {}

    @PostMapping("verify-password-otp")
    public ResponseEntity<String> verifyPasswordOTP(@RequestBody VerifyPasswordOTPRequest request) {
        String storedCode = passwordResetCodes.get(request.email());
        if (storedCode == null || !storedCode.equals(request.code())) {
            return ResponseEntity.badRequest().body("Invalid or expired OTP.");
        }
        return ResponseEntity.ok("OTP verified successfully.");
    }

    // Reset Password
    public record ResetPasswordRequest(String email, String code, String newPassword) {}

    @PostMapping("reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest request) {
        // Verify OTP first
        String storedCode = passwordResetCodes.get(request.email());
        if (storedCode == null || !storedCode.equals(request.code())) {
            return ResponseEntity.badRequest().body("Invalid or expired OTP.");
        }
        
        User user = userRepository.findByEmail(request.email());
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found.");
        }
        
        // Update password
        user.setPassword(request.newPassword());
        userRepository.save(user);
        
        // Remove the used OTP
        passwordResetCodes.remove(request.email());
        
        return ResponseEntity.ok("Password updated successfully. You can now login with your new password.");
    }
}