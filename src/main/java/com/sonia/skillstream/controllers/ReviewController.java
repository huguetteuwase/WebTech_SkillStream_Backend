package com.sonia.skillstream.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sonia.skillstream.models.Course;
import com.sonia.skillstream.models.Review;
import com.sonia.skillstream.models.User;
import com.sonia.skillstream.repository.CoursesRepository;
import com.sonia.skillstream.repository.ReviewRepository;
import com.sonia.skillstream.repository.UserRepository;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("reviews")
public class ReviewController {
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final CoursesRepository coursesRepository;

    public ReviewController(ReviewRepository reviewRepository, UserRepository userRepository, CoursesRepository coursesRepository) {
        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
        this.coursesRepository = coursesRepository;
    }

    public record ReviewRequest(
            String userEmail,
            String courseTitle,
            Integer rating,
            String comment
    ) {}

    public record ReviewStats(
            Double averageRating,
            Long totalReviews
    ) {}

    @PostMapping
    public ResponseEntity<String> createReview(@RequestBody ReviewRequest request) {
        // Validate rating
        if (request.rating < 1 || request.rating > 5) {
            return ResponseEntity.badRequest().body("Rating must be between 1 and 5");
        }

        // Check if user exists
        if (!userRepository.existsByEmail(request.userEmail)) {
            return ResponseEntity.badRequest().body("User with email \"" + request.userEmail + "\" doesn't exist.");
        }

        // Check if course exists
        if (!coursesRepository.existsByTitle(request.courseTitle)) {
            return ResponseEntity.badRequest().body("Course with title \"" + request.courseTitle + "\" doesn't exist.");
        }

        User user = userRepository.findByEmail(request.userEmail);
        Course course = coursesRepository.findByTitle(request.courseTitle);

        // Check if user already reviewed this course
        if (reviewRepository.findByUserIdAndCourseId(user.getId(), course.getId()).isPresent()) {
            return ResponseEntity.badRequest().body("You have already reviewed this course.");
        }

        Review review = new Review();
        review.setUser(user);
        review.setCourse(course);
        review.setRating(request.rating);
        review.setComment(request.comment);

        reviewRepository.save(review);
        return ResponseEntity.ok("Review created successfully");
    }

    @GetMapping
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    @GetMapping("course/{courseId}")
    public List<Review> getCourseReviews(@PathVariable("courseId") Integer courseId) {
        return reviewRepository.findAllByCourseId(courseId);
    }

    @GetMapping("user/{userId}")
    public List<Review> getUserReviews(@PathVariable("userId") Integer userId) {
        return reviewRepository.findAllByUserId(userId);
    }

    @GetMapping("course/{courseId}/stats")
    public ReviewStats getCourseReviewStats(@PathVariable("courseId") Integer courseId) {
        Double averageRating = reviewRepository.getAverageRatingByCourseId(courseId);
        Long totalReviews = reviewRepository.getReviewCountByCourseId(courseId);
        return new ReviewStats(averageRating != null ? averageRating : 0.0, totalReviews);
    }

    @GetMapping("{reviewId}")
    public Optional<Review> getReview(@PathVariable("reviewId") Integer reviewId) {
        return reviewRepository.findById(reviewId);
    }

    @PutMapping("{reviewId}")
    public ResponseEntity<String> updateReview(@PathVariable("reviewId") Integer reviewId, @RequestBody ReviewRequest request) {
        Optional<Review> existingReview = reviewRepository.findById(reviewId);
        if (existingReview.isEmpty()) {
            return ResponseEntity.badRequest().body("Review not found");
        }

        // Validate rating
        if (request.rating < 1 || request.rating > 5) {
            return ResponseEntity.badRequest().body("Rating must be between 1 and 5");
        }

        Review review = existingReview.get();
        review.setRating(request.rating);
        review.setComment(request.comment);

        reviewRepository.save(review);
        return ResponseEntity.ok("Review updated successfully");
    }

    @DeleteMapping("{reviewId}")
    public ResponseEntity<String> deleteReview(@PathVariable("reviewId") Integer reviewId) {
        if (!reviewRepository.existsById(reviewId)) {
            return ResponseEntity.badRequest().body("Review not found");
        }

        reviewRepository.deleteById(reviewId);
        return ResponseEntity.ok("Review deleted successfully");
    }
}