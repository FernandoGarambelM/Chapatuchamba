package com.chapatuchamba.hub.submission.model;

import com.chapatuchamba.hub.challenge.model.Challenge;
import com.chapatuchamba.hub.user.model.Student;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "submissions")
public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "challenge_id", nullable = false)
    private Challenge challenge;

    @Column(name = "repo_url", nullable = false)
    private String repoUrl; 

    @Column(columnDefinition = "TEXT")
    private String feedback; 

    private Integer score; 
   
    @Column(name = "file_url")
    private String fileUrl; // For zip/pdf attachments 
    
    @Column(name = "submission_date")
    @Builder.Default
    private LocalDateTime submissionDate = LocalDateTime.now();
    
    @Builder.Default
    private String status = "PENDING"; 
}
