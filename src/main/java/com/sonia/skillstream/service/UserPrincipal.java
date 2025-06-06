// package com.sonia.skillstream.service;

// import org.springframework.security.core.GrantedAuthority;
// import org.springframework.security.core.authority.SimpleGrantedAuthority;
// import org.springframework.security.core.userdetails.UserDetails;

// import java.util.Collection;
// import java.util.Collections;

// import com.sonia.skillstream.models.User;

// public class UserPrincipal implements UserDetails {
//     private final User user;

//     public UserPrincipal(User user) {
//         this.user = user;
//     }

//     // Delegate ID access
//     public Integer getId() {
//         return user.getId();
//     }

//     // Required by UserDetails
//     @Override
//     public String getUsername() {
//         return user.getEmail(); // Use email as login ID
//     }

//     @Override
//     public String getPassword() {
//         return user.getPassword();
//     }

//     @Override
//     public Collection<? extends GrantedAuthority> getAuthorities() {
//         return Collections.singletonList(
//             new SimpleGrantedAuthority("ROLE_" + user.getRole()) // e.g., ROLE_ADMIN
//         );
//     }

//     // Account status checks (customize as needed)
//     @Override
//     public boolean isAccountNonExpired() { return true; }
//     @Override
//     public boolean isAccountNonLocked() { return true; }
//     @Override
//     public boolean isCredentialsNonExpired() { return true; }
//     @Override
//     public boolean isEnabled() { return true; }
// }