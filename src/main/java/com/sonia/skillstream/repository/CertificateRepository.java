package com.sonia.skillstream.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.sonia.skillstream.models.Certificate;

@Repository
public interface CertificateRepository extends JpaRepository<Certificate, Integer> {
    Optional<Certificate> findByCertificateNumber(String certificateNumber);
    Optional<Certificate> findByEnrollmentId(Integer enrollmentId);
    
    @Query("SELECT c FROM Certificate c WHERE c.enrollment.user.id = :userId")
    List<Certificate> findAllByUserId(Integer userId);
    
    @Query("SELECT c FROM Certificate c WHERE c.enrollment.course.id = :courseId")
    List<Certificate> findAllByCourseId(Integer courseId);
    
    @Query("SELECT c FROM Certificate c WHERE c.enrollment.user.email = :userEmail")
    List<Certificate> findAllByUserEmail(String userEmail);
    
    boolean existsByEnrollmentId(Integer enrollmentId);
}
