package com.chapatuchamba.hub.submission.service;

import com.chapatuchamba.hub.submission.model.Submission;
import com.chapatuchamba.hub.submission.repository.SubmissionRepository;
import com.chapatuchamba.hub.user.model.Student;
import com.chapatuchamba.hub.user.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ScoringService {

    private final StudentRepository studentRepository;
    private final SubmissionRepository submissionRepository;

    private static final int BASE_POINTS_SUBMISSION = 10;
    private static final int POINTS_PER_CERTIFICATE = 5;
    private static final int MAX_CERTIFICATE_BONUS = 20;
    private static final int COMPANY_RATING_MULTIPLIER = 20;

    @Transactional
    public void assignAutomaticPoints(Submission submission) {
        Student student = submission.getStudent();

        int score = BASE_POINTS_SUBMISSION;

        if (student.getCertifications() != null && !student.getCertifications().isEmpty()) {
            int certCount = student.getCertifications().size();
            int bonus = certCount * POINTS_PER_CERTIFICATE;

            if (bonus > MAX_CERTIFICATE_BONUS) {
                bonus = MAX_CERTIFICATE_BONUS;
            }

            score += bonus;
        }

        submission.setScore(score);
        submission.setStatus("PENDING_REVIEW");
        submissionRepository.save(submission);

        updateStudentGlobalScore(student, score);
    }

    @Transactional
    public void assignManualPoints(Submission submission, int starsObtained) {
        int manualPoints = starsObtained * COMPANY_RATING_MULTIPLIER;

        int oldScore = submission.getScore();
        int newScore = oldScore + manualPoints;

        submission.setScore(newScore);
        submission.setStatus("REVIEWED");
        submissionRepository.save(submission);

        updateStudentGlobalScore(submission.getStudent(), manualPoints);
    }

    private void updateStudentGlobalScore(Student student, int pointsToAdd) {
        int currentGlobal = student.getGlobalScore() != null ? student.getGlobalScore() : 0;
        student.setGlobalScore(currentGlobal + pointsToAdd);
        studentRepository.save(student);
    }
}
