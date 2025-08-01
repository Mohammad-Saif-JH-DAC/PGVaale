package com.pgvaale.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

/** USER ENTITY */
@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(min = 12, max = 12)
    private String aadhaar;

    @NotBlank
    @Size(min = 10, max = 10)
    private String mobileNumber;

    @Min(0)
    private int age;

    @NotBlank
    private String gender;

    @NotBlank
    private String uniqueId;
}