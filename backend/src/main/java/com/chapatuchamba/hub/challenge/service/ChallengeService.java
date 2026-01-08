package com.chapatuchamba.hub.challenge.service;

import com.chapatuchamba.hub.challenge.dto.ChallengeResponse;
import com.chapatuchamba.hub.challenge.dto.CreateChallengeRequest;
import java.util.List;

public interface ChallengeService {

    ChallengeResponse createChallenge(CreateChallengeRequest request, Long companyId);
    List<ChallengeResponse> getActiveChallenges();
}
