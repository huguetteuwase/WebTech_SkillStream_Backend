// package com.sonia.skillstream.config;

// import java.nio.file.attribute.UserPrincipal;
// import java.security.SignatureException;
// import java.util.Date;
// import java.util.stream.Collectors;

// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.security.core.GrantedAuthority;
// import org.springframework.security.core.Authentication;
// import org.springframework.stereotype.Component;

// // JwtTokenProvider.java
// @Component
// public class JwtTokenProvider {

//     @Value("${app.jwtSecret}")
//     private String jwtSecret;

//     @Value("${app.jwtExpirationInMs}")
//     private int jwtExpirationInMs;

//     public String generateToken(Authentication authentication) {
//         UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        
//         Date now = new Date();
//         Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);

//         return Jwts.builder()
//                 .setSubject(Long.toString(userPrincipal.getId()))
//                 .claim("roles", userPrincipal.getAuthorities().stream()
//                         .map(GrantedAuthority::getAuthority)
//                         .collect(Collectors.toList()))
//                 .setIssuedAt(new Date())
//                 .setExpiration(expiryDate)
//                 .signWith(SignatureAlgorithm.HS512, jwtSecret)
//                 .compact();
//     }

//     public Long getUserIdFromJWT(String token) {
//         Claims claims = Jwts.parser()
//                 .setSigningKey(jwtSecret)
//                 .parseClaimsJws(token)
//                 .getBody();

//         return Long.parseLong(claims.getSubject());
//     }

//     public boolean validateToken(String authToken) {
//         try {
//             Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
//             return true;
//         } catch (SignatureException ex) {
//             // handle exception
//         } // other catch blocks...
//         return false;
//     }
// }
