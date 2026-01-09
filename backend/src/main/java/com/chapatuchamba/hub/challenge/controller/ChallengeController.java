package com.chapatuchamba.hub.challenge.controller;

import com.chapatuchamba.hub.challenge.dto.ChallengeResponse;
import com.chapatuchamba.hub.challenge.dto.CreateChallengeRequest;
import com.chapatuchamba.hub.challenge.service.ChallengeService;
import com.chapatuchamba.hub.common.dto.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/challenges")
@RequiredArgsConstructor
public class ChallengeController {

    private final ChallengeService challengeService;

    @PostMapping
    public ApiResponse<ChallengeResponse> createChallenge(
            @Valid @RequestBody CreateChallengeRequest request,
            @RequestParam Long companyId) {
        
        ChallengeResponse response = challengeService.createChallenge(request, companyId);
        return ApiResponse.success("Challenge created successfully", response);
    }

    @GetMapping
    public ApiResponse<List<ChallengeResponse>> getActiveChallenges() {
        List<ChallengeResponse> challenges = challengeService.getActiveChallenges();
        return ApiResponse.success("Active challenges retrieved", challenges);
    }
}
