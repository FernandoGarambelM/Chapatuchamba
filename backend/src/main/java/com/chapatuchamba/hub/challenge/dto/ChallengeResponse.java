package com.chapatuchamba.hub.challenge.dto;

import com.chapatuchamba.hub.challenge.model.ChallengeStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChallengeResponse {

    private Long id;
    private String title;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private ChallengeStatus status;
    private Long companyId;
    private String companyName;
}