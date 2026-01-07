package com.chapatuchamba.hub.user.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "companies")
@PrimaryKeyJoinColumn(name = "user_id")
public class Company extends User {

    @Column(name = "company_name")
    private String companyName;
    
    private String ruc; 
    
    @Builder.Default
    @Column(name = "is_verified")
    private Boolean isVerified = false; 

    private String sector;

    @Column(columnDefinition = "TEXT")
    private String description;
}
