package com.chapatuchamba.hub.user.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDto {
    private Long id;
    private String email;
    private String role;

    // Campos de Estudiante
    private String name;
    private String university;
    private String major;
    private String bio;
    private Integer globalScore;

    // Campos de Empresa
    private String companyName;
    private String sector;
    private String ruc;
    private String description;
    private Boolean isVerified;
}
