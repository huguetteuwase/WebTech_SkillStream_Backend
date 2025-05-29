package com.sonia.skillstream.models;

import jakarta.persistence.*;

import java.util.*;

@Entity
public class Course {
    @Id
    @SequenceGenerator(
            name = "course_id_sequence",
            sequenceName = "course_id_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "course_id_sequence"
    )
    private Integer id;
    private String title;
    private String length;
    private String instructor;
    private String[] modules;

    public Course(Integer id, String title, String length, String instructor, String[] modules) {
        this.id = id;
        this.title = title;
        this.length = length;
        this.instructor = instructor;
        this.modules = modules;
    }

    public Course() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLength() {
        return length;
    }

    public void setLength(String length) {
        this.length = length;
    }

    public String getInstructor() {
        return instructor;
    }

    public void setInstructor(String instructor) {
        this.instructor = instructor;
    }

    public String[] getModules() {
        return modules;
    }

    public void setModules(String[] modules) {
        this.modules = modules;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Course course = (Course) o;
        return Objects.equals(id, course.id) && Objects.equals(title, course.title) && Objects.equals(length, course.length) && Objects.equals(instructor, course.instructor) && Arrays.equals(modules, course.modules);
    }

    @Override
    public int hashCode() {
        int result = Objects.hash(id, title, length, instructor);
        result = 31 * result + Arrays.hashCode(modules);
        return result;
    }

    @Override
    public String toString() {
        return "Course{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", length='" + length + '\'' +
                ", instructor='" + instructor + '\'' +
                ", modules=" + Arrays.toString(modules) +
                '}';
    }
}
