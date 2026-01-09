package com.chapatuchamba.hub.user.controller;

import com.chapatuchamba.hub.common.dto.ApiResponse;
import com.chapatuchamba.hub.user.dto.*;
import com.chapatuchamba.hub.user.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ApiResponse<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ApiResponse.success("Login successful", authService.login(request));
    }

    @PostMapping("/register/student")
    public ApiResponse<AuthResponse> registerStudent(@Valid @RequestBody RegisterStudentRequest request) {
        return ApiResponse.success("Student registered successfully", authService.registerStudent(request));
    }

    @PostMapping("/register/company")
    public ApiResponse<AuthResponse> registerCompany(@Valid @RequestBody RegisterCompanyRequest request) {
        return ApiResponse.success("Company registered successfully", authService.registerCompany(request));
    }
}
