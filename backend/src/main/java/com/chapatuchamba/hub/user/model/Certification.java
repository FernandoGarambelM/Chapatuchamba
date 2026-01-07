package com.chapatuchamba.hub.user.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "certifications")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Certification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String provider; // e.g., "Google", "AWS"
    
    private String level;    // e.g., "Associate", "Professional"

    @Column(name = "attachment_url")
    private String attachmentUrl; // URL to logo or template
}
