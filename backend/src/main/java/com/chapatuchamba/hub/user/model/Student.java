package com.chapatuchamba.hub.user.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import java.util.List;

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
    private String major;

    @Column(columnDefinition = "TEXT")
    private String bio;

    @Column(name = "global_score")
    @Builder.Default
    private Integer globalScore = 0;

    @OneToMany(mappedBy = "student", fetch = FetchType.LAZY)
    private List<StudentCertification> certifications;
}
