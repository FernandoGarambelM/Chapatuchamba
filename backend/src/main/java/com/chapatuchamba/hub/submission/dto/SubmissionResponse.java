package com.chapatuchamba.hub.submission.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SubmissionResponse {
    
    private Long id;
    private Long challengeId;
    private String challengeTitle;
    private Long studentId;
    private String studentName;
    private String repoUrl;
    private Integer score;
    private String status;
    private LocalDateTime submissionDate;
}
