package com.chapatuchamba.hub.user.repository;

import com.chapatuchamba.hub.user.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CompanyRepository extends JpaRepository<Company, Long> {
    Optional<Company> findByRuc(String ruc);
}
