package com.chapatuchamba.hub.submission.controller;

import com.chapatuchamba.hub.submission.dto.CreateSubmissionRequest;
import com.chapatuchamba.hub.submission.dto.SubmissionResponse;
import com.chapatuchamba.hub.submission.service.SubmissionService;
import com.chapatuchamba.hub.common.dto.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/submissions")
@RequiredArgsConstructor
public class SubmissionController {

    private final SubmissionService submissionService;

    @PostMapping("/{challengeId}")
    public ApiResponse<SubmissionResponse> applyToChallenge(
            @PathVariable Long challengeId,
            @RequestParam Long studentId,
            @Valid @RequestBody CreateSubmissionRequest request) {
        
        SubmissionResponse response = submissionService.applyToChallenge(challengeId, studentId, request);
        return ApiResponse.success("Application submitted successfully", response);
    }
}
