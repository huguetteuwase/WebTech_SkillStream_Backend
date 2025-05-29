package com.sonia.skillstream.models;

import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {
    @Id
    @SequenceGenerator(
            name = "user_id_sequence",
            sequenceName = "user_id_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "user_id_sequence"
    )
    private Integer id;
    private String name;
    
    @Column(nullable = false, unique = true)
    private String email;
    private Integer age;
    private String role;
    private String password;
    
    private boolean verified = false; // <--- THIS IS THE MISSING FIELD!

    // Full constructor (updated to include 'verified')
    public User(Integer id, String name, String email, Integer age, String role, String password, boolean verified) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.age = age;
        this.role = role;
        this.password = password;
        this.verified = verified; // Set the initial verified status
    }

    // No-argument constructor
    public User() {
    }

    // Getters and Setters for all fields
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    // Getter for 'verified' field (NEW)
    public boolean isVerified() {
        return verified;
    }

    // Setter for 'verified' field (NEW)
    public void setVerified(boolean verified) {
        this.verified = verified;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        // Include 'verified' in equals if you want it part of equality check
        return verified == user.verified &&
               Objects.equals(id, user.id) &&
               Objects.equals(name, user.name) &&
               Objects.equals(email, user.email) &&
               Objects.equals(age, user.age) &&
               Objects.equals(role, user.role) &&
               Objects.equals(password, user.password);
    }

    @Override
    public int hashCode() {
        // Include 'verified' in hashCode
        return Objects.hash(id, name, email, age, role, password, verified);
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", age=" + age +
                ", role='" + role + '\'' +
                ", password='" + password + '\'' +
                ", verified=" + verified + // Include 'verified' in toString
                '}';
    }

    // This method seems out of place for a User model, it's typically for Optional.orElseThrow
    // If you're not using Optional<User> somewhere and calling orElseThrow directly on User,
    // you should remove this method.
    public User orElseThrow(Object object) {
        throw new UnsupportedOperationException("Unimplemented method 'orElseThrow'");
    }
}