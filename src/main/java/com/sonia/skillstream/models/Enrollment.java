package com.sonia.skillstream.models;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
public class Enrollment {
    @Id
    @SequenceGenerator(
            name = "enrollment_id_sequence",
            sequenceName = "enrollment_id_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "enrollment_id_sequence"
    )
    private Integer id;
    private String status;
    @ManyToOne
    @JoinColumn(name = "course_id", referencedColumnName = "id")
    private Course course;
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    public Enrollment() {
    }

    public Enrollment(Integer id, String status, Course course, User user) {
        this.id = id;
        this.status = status;
        this.course = course;
        this.user = user;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Enrollment that = (Enrollment) o;
        return Objects.equals(id, that.id) && Objects.equals(status, that.status) && Objects.equals(course, that.course) && Objects.equals(user, that.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, status, course, user);
    }

    @Override
    public String toString() {
        return "Enrollment{" +
                "id=" + id +
                ", status='" + status + '\'' +
                ", course=" + course +
                ", user=" + user +
                '}';
    }
}
