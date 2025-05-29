package com.sonia.skillstream.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sonia.skillstream.models.Course;
import com.sonia.skillstream.models.Enrollment;
import com.sonia.skillstream.models.User;
import com.sonia.skillstream.repository.CoursesRepository;
import com.sonia.skillstream.repository.EnrollmentRepository;
import com.sonia.skillstream.repository.UserRepository;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("enrollment")
public class EnrollmentController {
    private final EnrollmentRepository enrollmentRepository;
    private final UserRepository userRepository;
    private final CoursesRepository coursesRepository;

    public EnrollmentController(EnrollmentRepository enrollmentRepository, UserRepository userRepository, CoursesRepository coursesRepository) {
        this.enrollmentRepository = enrollmentRepository;
        this.userRepository = userRepository;
        this.coursesRepository = coursesRepository;
    }

    @GetMapping
    public List<Enrollment> getEnrollments() {
        return enrollmentRepository.findAll();
    }

    @GetMapping("course/{course_id}")
    public List<Enrollment> getCourseEnrollments(@PathVariable("course_id") Integer course_id) {
        return enrollmentRepository.findAllByCourseId(course_id);
    }

    @GetMapping("user/{user_id}")
    public List<Enrollment> getUserEnrollments(@PathVariable("user_id") Integer user_id) {
        return enrollmentRepository.findAllByUserId(user_id);
    }

    @GetMapping({"{enroll_id}"})
    public Optional<Enrollment> getEnrolledCourse(@PathVariable("enroll_id") Integer id) {
        return enrollmentRepository.findById(id);
    }

   public record CourseEnrollment(
    String userEmail,
    String course
) {}

    @PostMapping
    public ResponseEntity<String> enroll(@RequestBody CourseEnrollment request){
        if (!coursesRepository.existsByTitle(request.course)){
            return ResponseEntity.badRequest().body("course with this title \"" + request.course + "\" doesn't exists.");
        }
        if (!userRepository.existsByEmail(request.userEmail)){
            return ResponseEntity.badRequest().body("User with this email \"" + request.userEmail + "\" doesn't exists.");
        }

        User user = userRepository.findByEmail(request.userEmail);
        Course course = coursesRepository.findByTitle(request.course);
        Enrollment enrollment = new Enrollment();
        enrollment.setCourse(course);
        enrollment.setUser(user);
        enrollment.setStatus("enrolled");
        enrollmentRepository.save(enrollment);
        return ResponseEntity.ok("Enrolled successfully");
    }

    @DeleteMapping("leave/{enroll_id}")
    public ResponseEntity<String> leave(@PathVariable("enroll_id") Integer enrollId){
        enrollmentRepository.deleteById(enrollId);
        return ResponseEntity.ok("Left course successfully");
    }
}
