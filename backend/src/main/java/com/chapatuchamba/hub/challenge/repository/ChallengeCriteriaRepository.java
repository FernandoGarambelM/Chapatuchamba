package com.chapatuchamba.hub.challenge.repository;

import com.chapatuchamba.hub.challenge.model.ChallengeCriteria;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ChallengeCriteriaRepository extends JpaRepository<ChallengeCriteria, Long> {
    List<ChallengeCriteria> findByChallengeId(Long challengeId);
}
