package com.chapatuchamba.hub.challenge.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "criteria")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Criteria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name; // e.g., "Code Quality"

    @Column(columnDefinition = "TEXT")
    private String description;
}
