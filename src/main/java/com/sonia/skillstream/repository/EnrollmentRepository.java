package com.sonia.skillstream.repository;

import com.sonia.skillstream.models.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Integer> {
    List<Enrollment> findAllByCourseId(Integer id);
    List<Enrollment> findAllByUserId(Integer id);
}
