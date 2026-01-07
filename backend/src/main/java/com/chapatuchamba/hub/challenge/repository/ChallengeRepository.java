package com.chapatuchamba.hub.challenge.repository;

import com.chapatuchamba.hub.challenge.model.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ChallengeRepository extends JpaRepository<Challenge, Long> {
    List<Challenge> findByCompanyId(Long companyId);
}
