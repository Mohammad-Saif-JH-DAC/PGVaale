package com.pgvaale.backend.controller;

import com.pgvaale.backend.dto.PaymentRequestDTO;
import com.pgvaale.backend.dto.PaymentResponseDTO;
import com.pgvaale.backend.dto.PaymentVerificationDTO;
import com.pgvaale.backend.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/create-order")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> createPaymentOrder(@RequestBody PaymentRequestDTO paymentRequest) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String username = auth.getName();

            PaymentResponseDTO response = paymentService.createPaymentOrder(paymentRequest, username);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Failed to create payment order",
                "message", e.getMessage()
            ));
        }
    }

    @PostMapping("/verify")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> verifyPayment(@RequestBody PaymentVerificationDTO verificationDTO) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String username = auth.getName();

            boolean success = paymentService.verifyPayment(verificationDTO, username);
            if (success) {
                return ResponseEntity.ok(Map.of(
                    "message", "Payment verified successfully! PG has been booked.",
                    "success", true
                ));
            } else {
                return ResponseEntity.badRequest().body(Map.of(
                    "error", "Payment verification failed",
                    "success", false
                ));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Payment verification failed",
                "message", e.getMessage(),
                "success", false
            ));
        }
    }

    @GetMapping("/order/{orderId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getPaymentByOrderId(@PathVariable String orderId) {
        try {
            var payment = paymentService.getPaymentByOrderId(orderId);
            if (payment != null) {
                return ResponseEntity.ok(payment);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Failed to fetch payment",
                "message", e.getMessage()
            ));
        }
    }
} 