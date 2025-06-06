package com.sonia.skillstream.repository;

import com.sonia.skillstream.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer>  {
    User findByEmail(String email);
    Boolean existsByEmail(String email);
}
