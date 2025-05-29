package com.sonia.skillstream.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.sonia.skillstream.models.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {
    List<Review> findAllByCourseId(Integer courseId);
    List<Review> findAllByUserId(Integer userId);
    Optional<Review> findByUserIdAndCourseId(Integer userId, Integer courseId);
    
    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.course.id = :courseId")
    Double getAverageRatingByCourseId(Integer courseId);
    
    @Query("SELECT COUNT(r) FROM Review r WHERE r.course.id = :courseId")
    Long getReviewCountByCourseId(Integer courseId);
}

