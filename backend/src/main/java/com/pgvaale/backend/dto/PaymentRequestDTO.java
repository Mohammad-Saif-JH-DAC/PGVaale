package com.pgvaale.backend.dto;

import lombok.Data;

@Data
public class PaymentRequestDTO {
    private Long pgId;
    private Double amount; // Optional - will use PG's rent amount if not provided
    private String currency;
} 