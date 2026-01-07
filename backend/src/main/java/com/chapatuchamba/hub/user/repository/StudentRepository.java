package com.chapatuchamba.hub.user.repository;

import com.chapatuchamba.hub.user.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {
}
