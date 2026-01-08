package com.chapatuchamba.hub.user.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StudentResponseDto {
    private String name;
    private String university;
    private String major;
    private int globalScore;
}
