package com.sonia.skillstream.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sonia.skillstream.models.Course;
import com.sonia.skillstream.repository.CoursesRepository;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("courses")
public class CoursesController {
    private final CoursesRepository coursesRepository;

    public CoursesController(CoursesRepository coursesRepository) {
        this.coursesRepository = coursesRepository;
    }

    public record CourseRequest(
        String title,
        String length,
        String instructor,
        String[] modules
){}

    @PostMapping("register")
    public ResponseEntity<String> createCourse(@RequestBody CourseRequest request){
        if (coursesRepository.existsByTitle(request.title)){
            return ResponseEntity.badRequest().body("course with this title \"" + request.title + "\" already exists.");
        }
        Course course = new Course();
        course.setTitle(request.title);
        course.setLength(request.length);
        course.setInstructor(request.instructor);
        course.setModules(request.modules);
        coursesRepository.save(course);
        return ResponseEntity.ok("Course created");
    }

    @GetMapping
    public List<Course> getCourses() {
        return coursesRepository.findAll();
    }

    @GetMapping("{courseId}")
    public Optional<Course> getCourse(@PathVariable("courseId") Integer id){
        return coursesRepository.findById(id);
    }

    @GetMapping("searchByTitle/{title}")
    public Optional<Course> getCourse(@PathVariable("title") String title){
        return Optional.ofNullable(coursesRepository.findByTitle(title));
    }

    @DeleteMapping("{courseId}")
    public void deleteCourse(@PathVariable("courseId") Integer id){
        Optional<Course> courseExists = coursesRepository.findById(id);
        coursesRepository.deleteById(id);
    }

    @PatchMapping("{courseId}")
    public void updateCourse(
            @PathVariable("courseId") Integer id,
            @RequestBody CourseRequest request
    ){
        Course course = new Course();
        course.setId(id);
        course.setTitle(request.title);
        course.setLength(request.length);
        course.setInstructor(request.instructor);
        course.setModules(request.modules);
        coursesRepository.save(course);
    }
}
