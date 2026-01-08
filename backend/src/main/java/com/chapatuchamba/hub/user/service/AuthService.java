package com.chapatuchamba.hub.user.service;

import com.chapatuchamba.hub.security.jwt.JwtTokenProvider;
import com.chapatuchamba.hub.user.dto.*;
import com.chapatuchamba.hub.user.model.*;
import com.chapatuchamba.hub.user.repository.CompanyRepository;
import com.chapatuchamba.hub.user.repository.StudentRepository;
import com.chapatuchamba.hub.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final CompanyRepository companyRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public AuthResponse registerStudent(RegisterStudentRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists"); // El GlobalExceptionHandler lo atrapará
        }

        Student student = Student.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.STUDENT)
                .name(request.getName())
                .university(request.getUniversity())
                .major(request.getMajor())
                .globalScore(0)
                .enabled(true)
                .build();

        studentRepository.save(student);
        return generateToken(request.getEmail(), request.getPassword());
    }

    @Transactional
    public AuthResponse registerCompany(RegisterCompanyRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        Company company = Company.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.COMPANY)
                .companyName(request.getCompanyName())
                .ruc(request.getRuc())
                .sector(request.getSector())
                .description(request.getDescription())
                .enabled(true)
                .build();

        companyRepository.save(company);
        return generateToken(request.getEmail(), request.getPassword());
    }

    public AuthResponse login(LoginRequest request) {
        return generateToken(request.getEmail(), request.getPassword());
    }

    private AuthResponse generateToken(String email, String password) {
        // Autenticar con Spring Security
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password));

        // Generar Token
        String token = tokenProvider.generateToken(authentication);
        User user = userRepository.findByEmail(email).orElseThrow();

        return AuthResponse.builder()
                .token(token)
                .email(user.getEmail())
                .role(user.getRole().name())
                .build();
    }
}
