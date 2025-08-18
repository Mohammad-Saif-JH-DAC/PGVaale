package com.pgvaale.backend.dto;

import lombok.Data;

@Data
public class PaymentResponseDTO {
    private String orderId;
    private String keyId;
    private Double amount;
    private String currency;
    private String description;
    private String prefillName;
    private String prefillEmail;
    private String prefillContact;
} 