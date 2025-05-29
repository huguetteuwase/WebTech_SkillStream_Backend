package com.sonia.skillstream.repository;

import com.sonia.skillstream.models.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CoursesRepository extends JpaRepository<Course, Integer> {
    Course findByTitle(String title);
    boolean existsByTitle(String title);
}
