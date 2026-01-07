package com.chapatuchamba.hub.submission.repository;

import com.chapatuchamba.hub.submission.model.Evaluation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EvaluationRepository extends JpaRepository<Evaluation, Long> {
    List<Evaluation> findBySubmissionId(Long submissionId);
}
