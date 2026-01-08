package com.chapatuchamba.hub.submission.service;

import com.chapatuchamba.hub.user.dto.StudentResponseDto;
import com.chapatuchamba.hub.user.model.Student;
import com.chapatuchamba.hub.user.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RankingService {

    private final StudentRepository studentRepository;

    public List<StudentResponseDto> getGlobalLeaderboard(int limit) {
        return studentRepository.findAll(
                PageRequest.of(0, limit, Sort.by(Sort.Direction.DESC, "globalScore"))).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private StudentResponseDto mapToDto(Student student) {
        return StudentResponseDto.builder()
                .name(student.getName())
                .university(student.getUniversity())
                .major(student.getMajor())
                .globalScore(student.getGlobalScore())
                .build();
    }
}
