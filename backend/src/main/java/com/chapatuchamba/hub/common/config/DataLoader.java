package com.chapatuchamba.hub.common.config;

import com.chapatuchamba.hub.user.model.*;
import com.chapatuchamba.hub.user.repository.*;
import com.chapatuchamba.hub.challenge.model.*;
import com.chapatuchamba.hub.challenge.repository.*;
import com.chapatuchamba.hub.submission.model.*;
import com.chapatuchamba.hub.submission.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {

    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final CompanyRepository companyRepository;
    private final CertificationRepository certificationRepository;
    private final StudentCertificationRepository studentCertificationRepository;
    private final ChallengeRepository challengeRepository;
    private final CriteriaRepository criteriaRepository;
    private final ChallengeCriteriaRepository challengeCriteriaRepository;
    private final SubmissionRepository submissionRepository;
    private final EvaluationRepository evaluationRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        // Verificar si ya se ejecutó el seed checando un email específico
        if (userRepository.findByEmail("tech@company.com").isPresent()) {
            System.out.println("Database already seeded, skipping...");
            return;
        }

        System.out.println("🌱 Starting database seeding...");

        // 1. Crear Certificaciones Globales
        List<Certification> certifications = createCertifications();
        System.out.println("✅ Created " + certifications.size() + " certifications");

        // 2. Crear Empresas
        List<Company> companies = createCompanies();
        System.out.println("✅ Created " + companies.size() + " companies");

        // 3. Crear Estudiantes
        List<Student> students = createStudents();
        System.out.println("✅ Created " + students.size() + " students");

        // 4. Asignar Certificaciones a Estudiantes
        assignCertificationsToStudents(students, certifications);
        System.out.println("✅ Assigned certifications to students");

        // 5. Crear Criterios de Evaluación
        List<Criteria> criterias = createCriteria();
        System.out.println("✅ Created " + criterias.size() + " evaluation criteria");

        // 6. Crear Challenges
        List<Challenge> challenges = createChallenges(companies);
        System.out.println("✅ Created " + challenges.size() + " challenges");

        // 7. Asignar Criterios a Challenges
        assignCriteriaToChallenges(challenges, criterias);
        System.out.println("✅ Assigned criteria to challenges");

        // 8. Crear Submissions
        List<Submission> submissions = createSubmissions(students, challenges);
        System.out.println("✅ Created " + submissions.size() + " submissions");

        // 9. Crear Evaluaciones para Submissions completadas
        createEvaluations(submissions, challenges);
        System.out.println("✅ Created evaluations for submissions");

        System.out.println("🎉 Database seeding completed successfully!");
    }

    // ==================== CERTIFICACIONES ====================
    private List<Certification> createCertifications() {
        List<Certification> certs = new ArrayList<>();

        certs.add(certificationRepository.save(Certification.builder()
                .name("AWS Cloud Practitioner")
                .provider("Amazon Web Services")
                .level("Foundational")
                .attachmentUrl("https://aws.amazon.com/certification/")
                .build()));

        certs.add(certificationRepository.save(Certification.builder()
                .name("Google Cloud Associate")
                .provider("Google Cloud")
                .level("Associate")
                .attachmentUrl("https://cloud.google.com/certification")
                .build()));

        certs.add(certificationRepository.save(Certification.builder()
                .name("Oracle Certified Java SE")
                .provider("Oracle")
                .level("Professional")
                .attachmentUrl("https://education.oracle.com/java-certification")
                .build()));

        certs.add(certificationRepository.save(Certification.builder()
                .name("Microsoft Azure Fundamentals")
                .provider("Microsoft")
                .level("Foundational")
                .attachmentUrl("https://docs.microsoft.com/certifications/")
                .build()));

        certs.add(certificationRepository.save(Certification.builder()
                .name("Docker Certified Associate")
                .provider("Docker")
                .level("Associate")
                .attachmentUrl("https://docker.com/certification")
                .build()));

        certs.add(certificationRepository.save(Certification.builder()
                .name("Certified Scrum Master")
                .provider("Scrum Alliance")
                .level("Professional")
                .attachmentUrl("https://scrumalliance.org/get-certified")
                .build()));

        return certs;
    }

    // ==================== EMPRESAS ====================
    private List<Company> createCompanies() {
        List<Company> companies = new ArrayList<>();

        companies.add(companyRepository.save(Company.builder()
                .email("tech@company.com")
                .password(passwordEncoder.encode("123"))
                .role(Role.COMPANY)
                .companyName("TechCorp")
                .ruc("20100200300")
                .sector("Tecnología")
                .description("Empresa líder en desarrollo de software y soluciones tecnológicas innovadoras.")
                .isVerified(true)
                .enabled(true)
                .build()));

        companies.add(companyRepository.save(Company.builder()
                .email("innovatech@company.com")
                .password(passwordEncoder.encode("123"))
                .role(Role.COMPANY)
                .companyName("InnovaTech SAC")
                .ruc("20200300400")
                .sector("Startups")
                .description("Startup enfocada en IA y Machine Learning para negocios.")
                .isVerified(true)
                .enabled(true)
                .build()));

        companies.add(companyRepository.save(Company.builder()
                .email("bancodigital@company.com")
                .password(passwordEncoder.encode("123"))
                .role(Role.COMPANY)
                .companyName("Banco Digital Perú")
                .ruc("20300400500")
                .sector("Fintech")
                .description("Banco digital que revoluciona los servicios financieros en Perú.")
                .isVerified(true)
                .enabled(true)
                .build()));

        companies.add(companyRepository.save(Company.builder()
                .email("saludplus@company.com")
                .password(passwordEncoder.encode("123"))
                .role(Role.COMPANY)
                .companyName("Salud Plus")
                .ruc("20400500600")
                .sector("HealthTech")
                .description("Plataforma digital de gestión de salud y telemedicina.")
                .isVerified(false)
                .enabled(true)
                .build()));

        return companies;
    }

    // ==================== ESTUDIANTES ====================
    private List<Student> createStudents() {
        List<Student> students = new ArrayList<>();

        students.add(studentRepository.save(Student.builder()
                .email("juan@unsa.edu.pe")
                .password(passwordEncoder.encode("123"))
                .role(Role.STUDENT)
                .name("Juan Perez")
                .university("UNSA")
                .major("Ingeniería de Sistemas")
                .bio("Apasionado por el desarrollo backend con Spring Boot y microservicios. Busco mi primera oportunidad laboral.")
                .globalScore(120)
                .enabled(true)
                .certifications(new ArrayList<>())
                .build()));

        students.add(studentRepository.save(Student.builder()
                .email("maria@ucsp.edu.pe")
                .password(passwordEncoder.encode("123"))
                .role(Role.STUDENT)
                .name("Maria Gomez")
                .university("UCSP")
                .major("Ciencia de la Computación")
                .bio("Desarrolladora Full Stack especializada en React y Node.js. Me encanta resolver problemas complejos.")
                .globalScore(280)
                .enabled(true)
                .certifications(new ArrayList<>())
                .build()));

        students.add(studentRepository.save(Student.builder()
                .email("carlos@ucsm.edu.pe")
                .password(passwordEncoder.encode("123"))
                .role(Role.STUDENT)
                .name("Carlos Lopez")
                .university("UCSM")
                .major("Ingeniería de Software")
                .bio("Interesado en cloud computing y DevOps. Actualmente aprendiendo Kubernetes.")
                .globalScore(195)
                .enabled(true)
                .certifications(new ArrayList<>())
                .build()));

        students.add(studentRepository.save(Student.builder()
                .email("ana@unsa.edu.pe")
                .password(passwordEncoder.encode("123"))
                .role(Role.STUDENT)
                .name("Ana Rodriguez")
                .university("UNSA")
                .major("Ingeniería de Sistemas")
                .bio("Machine Learning enthusiast. Trabajando en proyectos de visión por computadora.")
                .globalScore(240)
                .enabled(true)
                .certifications(new ArrayList<>())
                .build()));

        students.add(studentRepository.save(Student.builder()
                .email("pedro@ucsp.edu.pe")
                .password(passwordEncoder.encode("123"))
                .role(Role.STUDENT)
                .name("Pedro Martinez")
                .university("UCSP")
                .major("Ciencia de la Computación")
                .bio("Frontend developer con pasión por UX/UI. Amo crear experiencias de usuario increíbles.")
                .globalScore(150)
                .enabled(true)
                .certifications(new ArrayList<>())
                .build()));

        students.add(studentRepository.save(Student.builder()
                .email("lucia@unsa.edu.pe")
                .password(passwordEncoder.encode("123"))
                .role(Role.STUDENT)
                .name("Lucia Flores")
                .university("UNSA")
                .major("Ingeniería de Sistemas")
                .bio("Cybersecurity y desarrollo seguro. Participante activa en CTFs.")
                .globalScore(85)
                .enabled(true)
                .certifications(new ArrayList<>())
                .build()));

        return students;
    }

    // ==================== ASIGNAR CERTIFICACIONES ====================
    private void assignCertificationsToStudents(List<Student> students, List<Certification> certifications) {
        // Maria - Top performer con 3 certificaciones
        studentCertificationRepository.save(StudentCertification.builder()
                .student(students.get(1)) // Maria
                .certification(certifications.get(0)) // AWS
                .obtainedDate(LocalDate.of(2025, 8, 15))
                .validationUrl("https://aws.amazon.com/verification/ABC123")
                .build());

        studentCertificationRepository.save(StudentCertification.builder()
                .student(students.get(1)) // Maria
                .certification(certifications.get(4)) // Docker
                .obtainedDate(LocalDate.of(2025, 10, 20))
                .validationUrl("https://docker.com/verify/XYZ789")
                .build());

        studentCertificationRepository.save(StudentCertification.builder()
                .student(students.get(1)) // Maria
                .certification(certifications.get(5)) // Scrum
                .obtainedDate(LocalDate.of(2025, 11, 5))
                .validationUrl("https://scrumalliance.org/verify/SM12345")
                .build());

        // Ana - 2 certificaciones
        studentCertificationRepository.save(StudentCertification.builder()
                .student(students.get(3)) // Ana
                .certification(certifications.get(1)) // Google Cloud
                .obtainedDate(LocalDate.of(2025, 9, 10))
                .validationUrl("https://google.com/credentials/GC456")
                .build());

        studentCertificationRepository.save(StudentCertification.builder()
                .student(students.get(3)) // Ana
                .certification(certifications.get(3)) // Azure
                .obtainedDate(LocalDate.of(2025, 12, 1))
                .validationUrl("https://microsoft.com/verify/AZ789")
                .build());

        // Carlos - 1 certificación
        studentCertificationRepository.save(StudentCertification.builder()
                .student(students.get(2)) // Carlos
                .certification(certifications.get(0)) // AWS
                .obtainedDate(LocalDate.of(2025, 7, 22))
                .validationUrl("https://aws.amazon.com/verification/DEF456")
                .build());

        // Juan - 1 certificación
        studentCertificationRepository.save(StudentCertification.builder()
                .student(students.get(0)) // Juan
                .certification(certifications.get(2)) // Java
                .obtainedDate(LocalDate.of(2025, 6, 30))
                .validationUrl("https://oracle.com/verify/JAVA999")
                .build());
    }

    // ==================== CRITERIOS ====================
    private List<Criteria> createCriteria() {
        List<Criteria> criterias = new ArrayList<>();

        criterias.add(criteriaRepository.save(Criteria.builder()
                .name("Code Quality")
                .description("Calidad del código: limpieza, organización, patrones de diseño y mejores prácticas.")
                .build()));

        criterias.add(criteriaRepository.save(Criteria.builder()
                .name("Functionality")
                .description("Funcionalidad completa: el sistema cumple con todos los requisitos especificados.")
                .build()));

        criterias.add(criteriaRepository.save(Criteria.builder()
                .name("Documentation")
                .description("Documentación clara y completa del código, API y guía de instalación.")
                .build()));

        criterias.add(criteriaRepository.save(Criteria.builder()
                .name("Performance")
                .description("Rendimiento y optimización del sistema bajo diferentes cargas.")
                .build()));

        criterias.add(criteriaRepository.save(Criteria.builder()
                .name("Innovation")
                .description("Creatividad e innovación en la solución propuesta.")
                .build()));

        criterias.add(criteriaRepository.save(Criteria.builder()
                .name("User Experience")
                .description("Experiencia de usuario: interfaz intuitiva y diseño atractivo.")
                .build()));

        return criterias;
    }

    // ==================== CHALLENGES ====================
    private List<Challenge> createChallenges(List<Company> companies) {
        List<Challenge> challenges = new ArrayList<>();

        challenges.add(challengeRepository.save(Challenge.builder()
                .company(companies.get(0)) // TechCorp
                .title("Sistema de Gestión de Inventario")
                .description("Desarrollar un sistema web para gestionar inventario en tiempo real con notificaciones automáticas de stock bajo.")
                .startDate(LocalDate.of(2026, 1, 1))
                .endDate(LocalDate.of(2026, 2, 15))
                .status(ChallengeStatus.ACTIVE)
                .build()));

        challenges.add(challengeRepository.save(Challenge.builder()
                .company(companies.get(1)) // InnovaTech
                .title("Chatbot con IA para Atención al Cliente")
                .description("Crear un chatbot inteligente usando NLP para automatizar respuestas a consultas frecuentes.")
                .startDate(LocalDate.of(2025, 12, 1))
                .endDate(LocalDate.of(2026, 1, 31))
                .status(ChallengeStatus.ACTIVE)
                .build()));

        challenges.add(challengeRepository.save(Challenge.builder()
                .company(companies.get(2)) // Banco Digital
                .title("API de Pagos Seguros")
                .description("Desarrollar una API RESTful segura para procesamiento de pagos con autenticación JWT y encriptación.")
                .startDate(LocalDate.of(2025, 11, 15))
                .endDate(LocalDate.of(2025, 12, 31))
                .status(ChallengeStatus.CLOSED)
                .build()));

        challenges.add(challengeRepository.save(Challenge.builder()
                .company(companies.get(3)) // Salud Plus
                .title("Plataforma de Telemedicina")
                .description("Sistema de videollamadas para consultas médicas remotas con gestión de citas y historial clínico.")
                .startDate(LocalDate.of(2026, 1, 5))
                .endDate(LocalDate.of(2026, 3, 1))
                .status(ChallengeStatus.ACTIVE)
                .build()));

        return challenges;
    }

    // ==================== ASIGNAR CRITERIOS A CHALLENGES ====================
    private void assignCriteriaToChallenges(List<Challenge> challenges, List<Criteria> criterias) {
        // Challenge 1: Sistema de Inventario (TechCorp)
        challengeCriteriaRepository.save(ChallengeCriteria.builder()
                .challenge(challenges.get(0))
                .criteria(criterias.get(0)) // Code Quality
                .weight(0.25)
                .maxScore(25)
                .build());

        challengeCriteriaRepository.save(ChallengeCriteria.builder()
                .challenge(challenges.get(0))
                .criteria(criterias.get(1)) // Functionality
                .weight(0.35)
                .maxScore(35)
                .build());

        challengeCriteriaRepository.save(ChallengeCriteria.builder()
                .challenge(challenges.get(0))
                .criteria(criterias.get(2)) // Documentation
                .weight(0.20)
                .maxScore(20)
                .build());

        challengeCriteriaRepository.save(ChallengeCriteria.builder()
                .challenge(challenges.get(0))
                .criteria(criterias.get(3)) // Performance
                .weight(0.20)
                .maxScore(20)
                .build());

        // Challenge 2: Chatbot IA (InnovaTech)
        challengeCriteriaRepository.save(ChallengeCriteria.builder()
                .challenge(challenges.get(1))
                .criteria(criterias.get(1)) // Functionality
                .weight(0.30)
                .maxScore(30)
                .build());

        challengeCriteriaRepository.save(ChallengeCriteria.builder()
                .challenge(challenges.get(1))
                .criteria(criterias.get(4)) // Innovation
                .weight(0.35)
                .maxScore(35)
                .build());

        challengeCriteriaRepository.save(ChallengeCriteria.builder()
                .challenge(challenges.get(1))
                .criteria(criterias.get(5)) // User Experience
                .weight(0.35)
                .maxScore(35)
                .build());

        // Challenge 3: API Pagos (Banco Digital) - CLOSED
        challengeCriteriaRepository.save(ChallengeCriteria.builder()
                .challenge(challenges.get(2))
                .criteria(criterias.get(0)) // Code Quality
                .weight(0.30)
                .maxScore(30)
                .build());

        challengeCriteriaRepository.save(ChallengeCriteria.builder()
                .challenge(challenges.get(2))
                .criteria(criterias.get(1)) // Functionality
                .weight(0.40)
                .maxScore(40)
                .build());

        challengeCriteriaRepository.save(ChallengeCriteria.builder()
                .challenge(challenges.get(2))
                .criteria(criterias.get(3)) // Performance
                .weight(0.30)
                .maxScore(30)
                .build());

        // Challenge 4: Telemedicina (Salud Plus)
        challengeCriteriaRepository.save(ChallengeCriteria.builder()
                .challenge(challenges.get(3))
                .criteria(criterias.get(1)) // Functionality
                .weight(0.25)
                .maxScore(25)
                .build());

        challengeCriteriaRepository.save(ChallengeCriteria.builder()
                .challenge(challenges.get(3))
                .criteria(criterias.get(5)) // User Experience
                .weight(0.30)
                .maxScore(30)
                .build());

        challengeCriteriaRepository.save(ChallengeCriteria.builder()
                .challenge(challenges.get(3))
                .criteria(criterias.get(2)) // Documentation
                .weight(0.25)
                .maxScore(25)
                .build());

        challengeCriteriaRepository.save(ChallengeCriteria.builder()
                .challenge(challenges.get(3))
                .criteria(criterias.get(3)) // Performance
                .weight(0.20)
                .maxScore(20)
                .build());
    }

    // ==================== SUBMISSIONS ====================
    private List<Submission> createSubmissions(List<Student> students, List<Challenge> challenges) {
        List<Submission> submissions = new ArrayList<>();

        // Maria - Challenge 3 (API Pagos) - EVALUADA - Score alto
        submissions.add(submissionRepository.save(Submission.builder()
                .student(students.get(1)) // Maria
                .challenge(challenges.get(2)) // API Pagos
                .repoUrl("https://github.com/maria-gomez/secure-payment-api")
                .fileUrl("https://storage.cloud.com/submissions/maria_api_pagos.zip")
                .submissionDate(LocalDateTime.of(2025, 12, 28, 14, 30))
                .status("EVALUATED")
                .score(92)
                .feedback("Excelente implementación. Código muy limpio y seguro. JWT implementado correctamente.")
                .build()));

        // Carlos - Challenge 3 (API Pagos) - EVALUADA - Score medio
        submissions.add(submissionRepository.save(Submission.builder()
                .student(students.get(2)) // Carlos
                .challenge(challenges.get(2)) // API Pagos
                .repoUrl("https://github.com/carlos-lopez/payment-gateway")
                .fileUrl("https://storage.cloud.com/submissions/carlos_api.zip")
                .submissionDate(LocalDateTime.of(2025, 12, 30, 18, 45))
                .status("EVALUATED")
                .score(75)
                .feedback("Buena funcionalidad pero le falta documentación. El performance puede mejorar.")
                .build()));

        // Ana - Challenge 1 (Inventario) - EVALUADA - Score alto
        submissions.add(submissionRepository.save(Submission.builder()
                .student(students.get(3)) // Ana
                .challenge(challenges.get(0)) // Inventario
                .repoUrl("https://github.com/ana-rodriguez/inventory-system")
                .fileUrl("https://storage.cloud.com/submissions/ana_inventory.zip")
                .submissionDate(LocalDateTime.of(2026, 1, 8, 10, 15))
                .status("EVALUATED")
                .score(88)
                .feedback("Sistema robusto con notificaciones en tiempo real. Muy bien documentado.")
                .build()));

        // Juan - Challenge 2 (Chatbot) - PENDIENTE
        submissions.add(submissionRepository.save(Submission.builder()
                .student(students.get(0)) // Juan
                .challenge(challenges.get(1)) // Chatbot
                .repoUrl("https://github.com/juan-perez/ai-chatbot")
                .submissionDate(LocalDateTime.of(2026, 1, 7, 16, 20))
                .status("PENDING")
                .build()));

        // Pedro - Challenge 4 (Telemedicina) - PENDIENTE
        submissions.add(submissionRepository.save(Submission.builder()
                .student(students.get(4)) // Pedro
                .challenge(challenges.get(3)) // Telemedicina
                .repoUrl("https://github.com/pedro-martinez/telemedicine-app")
                .submissionDate(LocalDateTime.of(2026, 1, 8, 20, 0))
                .status("PENDING")
                .build()));

        // Lucia - Challenge 1 (Inventario) - PENDIENTE
        submissions.add(submissionRepository.save(Submission.builder()
                .student(students.get(5)) // Lucia
                .challenge(challenges.get(0)) // Inventario
                .repoUrl("https://github.com/lucia-flores/stock-manager")
                .submissionDate(LocalDateTime.of(2026, 1, 9, 9, 30))
                .status("PENDING")
                .build()));

        return submissions;
    }

    // ==================== EVALUACIONES ====================
    private void createEvaluations(List<Submission> submissions, List<Challenge> challenges) {
        // Obtener criterios de cada challenge
        List<ChallengeCriteria> apiPagosCriteria = challengeCriteriaRepository.findByChallengeId(challenges.get(2).getId());
        List<ChallengeCriteria> inventarioCriteria = challengeCriteriaRepository.findByChallengeId(challenges.get(0).getId());

        // Evaluación para Maria - API Pagos (Score: 92/100)
        if (!apiPagosCriteria.isEmpty() && submissions.get(0).getStatus().equals("EVALUATED")) {
            evaluationRepository.save(Evaluation.builder()
                    .submission(submissions.get(0))
                    .criteria(apiPagosCriteria.get(0).getCriteria()) // Code Quality (30)
                    .scoreObtained(28)
                    .comment("Código muy limpio con excelentes patrones de diseño.")
                    .build());

            evaluationRepository.save(Evaluation.builder()
                    .submission(submissions.get(0))
                    .criteria(apiPagosCriteria.get(1).getCriteria()) // Functionality (40)
                    .scoreObtained(38)
                    .comment("Todas las funcionalidades implementadas correctamente.")
                    .build());

            evaluationRepository.save(Evaluation.builder()
                    .submission(submissions.get(0))
                    .criteria(apiPagosCriteria.get(2).getCriteria()) // Performance (30)
                    .scoreObtained(26)
                    .comment("Buen rendimiento, pero puede optimizar algunas queries.")
                    .build());
        }

        // Evaluación para Carlos - API Pagos (Score: 75/100)
        if (!apiPagosCriteria.isEmpty() && submissions.get(1).getStatus().equals("EVALUATED")) {
            evaluationRepository.save(Evaluation.builder()
                    .submission(submissions.get(1))
                    .criteria(apiPagosCriteria.get(0).getCriteria()) // Code Quality (30)
                    .scoreObtained(22)
                    .comment("Código funcional pero necesita refactorización.")
                    .build());

            evaluationRepository.save(Evaluation.builder()
                    .submission(submissions.get(1))
                    .criteria(apiPagosCriteria.get(1).getCriteria()) // Functionality (40)
                    .scoreObtained(35)
                    .comment("Funcionalidad completa con algunos bugs menores.")
                    .build());

            evaluationRepository.save(Evaluation.builder()
                    .submission(submissions.get(1))
                    .criteria(apiPagosCriteria.get(2).getCriteria()) // Performance (30)
                    .scoreObtained(18)
                    .comment("Performance aceptable pero mejorable en carga alta.")
                    .build());
        }

        // Evaluación para Ana - Inventario (Score: 88/100)
        if (!inventarioCriteria.isEmpty() && submissions.get(2).getStatus().equals("EVALUATED")) {
            evaluationRepository.save(Evaluation.builder()
                    .submission(submissions.get(2))
                    .criteria(inventarioCriteria.get(0).getCriteria()) // Code Quality (25)
                    .scoreObtained(23)
                    .comment("Código bien estructurado y fácil de mantener.")
                    .build());

            evaluationRepository.save(Evaluation.builder()
                    .submission(submissions.get(2))
                    .criteria(inventarioCriteria.get(1).getCriteria()) // Functionality (35)
                    .scoreObtained(32)
                    .comment("Sistema completo con notificaciones en tiempo real.")
                    .build());

            evaluationRepository.save(Evaluation.builder()
                    .submission(submissions.get(2))
                    .criteria(inventarioCriteria.get(2).getCriteria()) // Documentation (20)
                    .scoreObtained(18)
                    .comment("Documentación clara y completa.")
                    .build());

            evaluationRepository.save(Evaluation.builder()
                    .submission(submissions.get(2))
                    .criteria(inventarioCriteria.get(3).getCriteria()) // Performance (20)
                    .scoreObtained(15)
                    .comment("Rendimiento correcto pero podría optimizar consultas.")
                    .build());
        }
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
