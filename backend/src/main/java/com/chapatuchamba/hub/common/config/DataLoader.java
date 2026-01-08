package com.chapatuchamba.hub.common.config;

import com.chapatuchamba.hub.user.model.*;
import com.chapatuchamba.hub.user.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;

@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {

    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final CompanyRepository companyRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (userRepository.count() > 0)
            return;

        System.out.println("Seeding database...");

        Company company = Company.builder()
                .email("tech@company.com").password(passwordEncoder.encode("123"))
                .role(Role.COMPANY).companyName("TechCorp").ruc("20100200300")
                .isVerified(true).enabled(true).build();
        companyRepository.save(company);

        createStudent("juan@unsa.edu.pe", "Juan Perez", "UNSA", 100);
        createStudent("maria@ucsp.edu.pe", "Maria Gomez", "UCSP", 250);
        createStudent("carlos@ucsm.edu.pe", "Carlos Lopez", "UCSM", 180);

        System.out.println("Database seeded!");
    }

    private Student createStudent(String email, String name, String uni, int score) {
        Student student = Student.builder()
                .email(email).password(passwordEncoder.encode("123"))
                .role(Role.STUDENT).name(name).university(uni)
                .major("Sistemas").globalScore(score).enabled(true)
                .certifications(new ArrayList<>())
                .build();
        return studentRepository.save(student);
    }
}
