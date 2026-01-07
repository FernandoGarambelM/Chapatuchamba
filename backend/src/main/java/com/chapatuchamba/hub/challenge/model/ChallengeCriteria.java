package com.chapatuchamba.hub.challenge.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "challenge_criteria")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChallengeCriteria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "challenge_id", nullable = false)
    private Challenge challenge; 

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "criteria_id", nullable = false)
    private Criteria criteria;

    private Double weight;   // e.g., 0.5 for 50%
    
    @Column(name = "max_score")
    private Integer maxScore; // e.g., 20
}
