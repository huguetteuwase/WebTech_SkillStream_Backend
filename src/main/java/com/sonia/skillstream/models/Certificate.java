package com.sonia.skillstream.models;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "certificates")
public class Certificate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "enrollment_id", nullable = false, unique = true)
    private Enrollment enrollment;

    @Column(name = "certificate_number", unique = true, nullable = false)
    private String certificateNumber;

    @Column(name = "issued_date")
    private LocalDateTime issuedDate;

    @Column(name = "completion_date")
    private LocalDateTime completionDate;

    @Column(nullable = false)
    private String status = "ACTIVE"; // ACTIVE, REVOKED

    @PrePersist
    protected void onCreate() {
        if (certificateNumber == null) {
            certificateNumber = "CERT-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        }
        issuedDate = LocalDateTime.now();
    }

    // Constructors
    public Certificate() {}

    public Certificate(Enrollment enrollment, LocalDateTime completionDate) {
        this.enrollment = enrollment;
        this.completionDate = completionDate;
    }

    // Getters and Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public Enrollment getEnrollment() { return enrollment; }
    public void setEnrollment(Enrollment enrollment) { this.enrollment = enrollment; }

    public String getCertificateNumber() { return certificateNumber; }
    public void setCertificateNumber(String certificateNumber) { this.certificateNumber = certificateNumber; }

    public LocalDateTime getIssuedDate() { return issuedDate; }
    public void setIssuedDate(LocalDateTime issuedDate) { this.issuedDate = issuedDate; }

    public LocalDateTime getCompletionDate() { return completionDate; }
    public void setCompletionDate(LocalDateTime completionDate) { this.completionDate = completionDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
