package com.chapatuchamba.hub.submission.service;

import com.chapatuchamba.hub.submission.dto.CreateSubmissionRequest;
import com.chapatuchamba.hub.submission.dto.SubmissionResponse;
import com.chapatuchamba.hub.submission.model.Submission;
import com.chapatuchamba.hub.submission.repository.SubmissionRepository;
import com.chapatuchamba.hub.challenge.model.Challenge;
import com.chapatuchamba.hub.challenge.repository.ChallengeRepository;
import com.chapatuchamba.hub.user.model.Student;
import com.chapatuchamba.hub.user.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SubmissionServiceImpl implements SubmissionService {

    private final SubmissionRepository submissionRepository;
    private final ChallengeRepository challengeRepository;
    private final StudentRepository studentRepository;

    @Override
    @Transactional
    public SubmissionResponse applyToChallenge(Long challengeId, Long studentId, CreateSubmissionRequest request) {
        Challenge challenge = challengeRepository.findById(challengeId)
                .orElseThrow(() -> new RuntimeException("Challenge not found"));

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        if (submissionRepository.existsByStudentIdAndChallengeId(studentId, challengeId)) {
            throw new RuntimeException("Student has already applied to this challenge");
        }

        Submission submission = Submission.builder()
                .challenge(challenge)
                .student(student)
                .repoUrl(request.getRepoUrl())
                .score(0)
                .status("PENDING")
                .build();

        Submission saved = submissionRepository.save(submission);

        return mapToResponse(saved);
    }

    private SubmissionResponse mapToResponse(Submission submission) {
        return SubmissionResponse.builder()
                .id(submission.getId())
                .challengeId(submission.getChallenge().getId())
                .challengeTitle(submission.getChallenge().getTitle())
                .studentId(submission.getStudent().getId())
                .studentName(submission.getStudent().getName())
                .repoUrl(submission.getRepoUrl())
                .score(submission.getScore())
                .status(submission.getStatus())
                .submissionDate(submission.getSubmissionDate())
                .build();
    }
}
