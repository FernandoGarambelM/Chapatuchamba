package com.chapatuchamba.hub.submission.service;

import com.chapatuchamba.hub.submission.dto.CreateSubmissionRequest;
import com.chapatuchamba.hub.submission.dto.SubmissionResponse;

public interface SubmissionService {
    
    SubmissionResponse applyToChallenge(Long challengeId, Long studentId, CreateSubmissionRequest request);
}
