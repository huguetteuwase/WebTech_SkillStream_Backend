package com.sonia.skillstream.controllers;

import java.time.LocalDateTime;
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

import com.sonia.skillstream.models.Certificate;
import com.sonia.skillstream.models.Enrollment;
import com.sonia.skillstream.repository.CertificateRepository;
import com.sonia.skillstream.repository.EnrollmentRepository;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("certificates")
public class CertificateController {
    private final CertificateRepository certificateRepository;
    private final EnrollmentRepository enrollmentRepository;

    public CertificateController(CertificateRepository certificateRepository, EnrollmentRepository enrollmentRepository) {
        this.certificateRepository = certificateRepository;
        this.enrollmentRepository = enrollmentRepository;
    }

    public record CertificateRequest(
            Integer enrollmentId,
            String completionDate // Optional: ISO format string
    ) {}

    public record CertificateInfo(
            Integer id,
            String certificateNumber,
            String userName,
            String userEmail,
            String courseTitle,
            String instructor,
            LocalDateTime issuedDate,
            LocalDateTime completionDate,
            String status
    ) {}

    @PostMapping("issue")
    public ResponseEntity<String> issueCertificate(@RequestBody CertificateRequest request) {
        // Check if enrollment exists
        Optional<Enrollment> enrollmentOpt = enrollmentRepository.findById(request.enrollmentId);
        if (enrollmentOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Enrollment not found");
        }

        Enrollment enrollment = enrollmentOpt.get();

        // Check if enrollment is completed
        if (!"completed".equalsIgnoreCase(enrollment.getStatus())) {
            return ResponseEntity.badRequest().body("Cannot issue certificate. Course not completed yet.");
        }

        // Check if certificate already exists for this enrollment
        if (certificateRepository.existsByEnrollmentId(request.enrollmentId)) {
            return ResponseEntity.badRequest().body("Certificate already issued for this enrollment");
        }

        Certificate certificate = new Certificate();
        certificate.setEnrollment(enrollment);
        
        // Set completion date
        if (request.completionDate != null && !request.completionDate.isEmpty()) {
            try {
                certificate.setCompletionDate(LocalDateTime.parse(request.completionDate));
            } catch (Exception e) {
                certificate.setCompletionDate(LocalDateTime.now());
            }
        } else {
            certificate.setCompletionDate(LocalDateTime.now());
        }

        certificateRepository.save(certificate);
        return ResponseEntity.ok("Certificate issued successfully with number: " + certificate.getCertificateNumber());
    }

    @GetMapping
    public List<Certificate> getAllCertificates() {
        return certificateRepository.findAll();
    }

    @GetMapping("user/{userId}")
    public List<Certificate> getUserCertificates(@PathVariable("userId") Integer userId) {
        return certificateRepository.findAllByUserId(userId);
    }

    @GetMapping("course/{courseId}")
    public List<Certificate> getCourseCertificates(@PathVariable("courseId") Integer courseId) {
        return certificateRepository.findAllByCourseId(courseId);
    }

    @GetMapping("verify/{certificateNumber}")
    public ResponseEntity<CertificateInfo> verifyCertificate(@PathVariable("certificateNumber") String certificateNumber) {
        Optional<Certificate> certificateOpt = certificateRepository.findByCertificateNumber(certificateNumber);
        
        if (certificateOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Certificate certificate = certificateOpt.get();
        Enrollment enrollment = certificate.getEnrollment();

        CertificateInfo info = new CertificateInfo(
                certificate.getId(),
                certificate.getCertificateNumber(),
                enrollment.getUser().getName(),
                enrollment.getUser().getEmail(),
                enrollment.getCourse().getTitle(),
                enrollment.getCourse().getInstructor(),
                certificate.getIssuedDate(),
                certificate.getCompletionDate(),
                certificate.getStatus()
        );

        return ResponseEntity.ok(info);
    }

    @GetMapping("{certificateId}")
    public Optional<Certificate> getCertificate(@PathVariable("certificateId") Integer certificateId) {
        return certificateRepository.findById(certificateId);
    }

    @PatchMapping("{certificateId}/revoke")
    public ResponseEntity<String> revokeCertificate(@PathVariable("certificateId") Integer certificateId) {
        Optional<Certificate> certificateOpt = certificateRepository.findById(certificateId);
        
        if (certificateOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Certificate not found");
        }

        Certificate certificate = certificateOpt.get();
        certificate.setStatus("REVOKED");
        certificateRepository.save(certificate);

        return ResponseEntity.ok("Certificate revoked successfully");
    }

    @PatchMapping("{certificateId}/activate")
    public ResponseEntity<String> activateCertificate(@PathVariable("certificateId") Integer certificateId) {
        Optional<Certificate> certificateOpt = certificateRepository.findById(certificateId);
        
        if (certificateOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Certificate not found");
        }

        Certificate certificate = certificateOpt.get();
        certificate.setStatus("ACTIVE");
        certificateRepository.save(certificate);

        return ResponseEntity.ok("Certificate activated successfully");
    }

    @DeleteMapping("{certificateId}")
    public ResponseEntity<String> deleteCertificate(@PathVariable("certificateId") Integer certificateId) {
        if (!certificateRepository.existsById(certificateId)) {
            return ResponseEntity.badRequest().body("Certificate not found");
        }

        certificateRepository.deleteById(certificateId);
        return ResponseEntity.ok("Certificate deleted successfully");
    }
}