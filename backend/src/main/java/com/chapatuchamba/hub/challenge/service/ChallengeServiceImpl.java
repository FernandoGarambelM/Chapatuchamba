package com.chapatuchamba.hub.challenge.service;

import com.chapatuchamba.hub.challenge.dto.ChallengeResponse;
import com.chapatuchamba.hub.challenge.dto.CreateChallengeRequest;
import com.chapatuchamba.hub.challenge.model.Challenge;
import com.chapatuchamba.hub.challenge.model.ChallengeStatus;
import com.chapatuchamba.hub.challenge.repository.ChallengeRepository;
import com.chapatuchamba.hub.user.model.Company;
import com.chapatuchamba.hub.user.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChallengeServiceImpl implements ChallengeService {

    private final ChallengeRepository challengeRepository;
    private final CompanyRepository companyRepository;

    @Override
    @Transactional
    public ChallengeResponse createChallenge(CreateChallengeRequest request, Long companyId) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));

        Challenge challenge = Challenge.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .company(company)
                .status(ChallengeStatus.ACTIVE)
                .build();

        Challenge saved = challengeRepository.save(challenge);
        
        return mapToResponse(saved);
    }

    @Override
    public List<ChallengeResponse> getActiveChallenges() {
        return challengeRepository.findAll().stream()
                .filter(challenge -> challenge.getStatus() == ChallengeStatus.ACTIVE)
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private ChallengeResponse mapToResponse(Challenge challenge) {
        return ChallengeResponse.builder()
                .id(challenge.getId())
                .title(challenge.getTitle())
                .description(challenge.getDescription())
                .startDate(challenge.getStartDate())
                .endDate(challenge.getEndDate())
                .status(challenge.getStatus())
                .companyId(challenge.getCompany().getId())
                .companyName(challenge.getCompany().getCompanyName())
                .build();
    }
}
