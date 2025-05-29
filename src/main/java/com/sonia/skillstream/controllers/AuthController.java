// package com.sonia.skillstream.controllers;

// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// @RestController
// @RequestMapping("/api/auth") // Base URL path
// public class AuthController {

//     @PostMapping("/verify-email")
//     public ResponseEntity<?> verifyEmail(@RequestBody VerificationRequest request) {
//         // Here you would typically check the code sent by the user
//         // Example logic (replace with actual code validation)
//         if ("123456".equals(request.getCode())) {
//             return ResponseEntity.ok("Verified");
//         } else {
//             return ResponseEntity.status(400).body("Invalid code");
//         }
//     }

//     private static class VerificationRequest {

//         public VerificationRequest() {
//         }

//         private Object getCode() {
//             throw new UnsupportedOperationException("Not supported yet.");
//         }
//     }
// }
