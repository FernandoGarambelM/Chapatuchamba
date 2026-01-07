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
@Table(name = "students")
@PrimaryKeyJoinColumn(name = "user_id")
public class Student extends User {

    private String name;
    private String university;
    private String major; // Carrera

    @Column(columnDefinition = "TEXT")
    private String bio; // Resumen

    @Column(name = "global_score")
    @Builder.Default
    private Integer globalScore = 0;
}
