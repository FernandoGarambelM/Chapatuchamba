package com.chapatuchamba.hub.submission.repository;

import com.chapatuchamba.hub.submission.model.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    boolean existsByStudentIdAndChallengeId(Long studentId, Long challengeId);

    List<Submission> findByStudentId(Long studentId);

    List<Submission> findByChallengeId(Long challengeId);
}
