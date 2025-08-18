package com.pgvaale.backend.repository;

import com.pgvaale.backend.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    
    Optional<Payment> findByRazorpayOrderId(String razorpayOrderId);
    
    Optional<Payment> findByRazorpayPaymentId(String razorpayPaymentId);
    
    List<Payment> findByUserId(Long userId);
    
    List<Payment> findByPgId(Long pgId);
    
    List<Payment> findByStatus(Payment.PaymentStatus status);
    
    Optional<Payment> findByUserIdAndPgIdAndStatus(Long userId, Long pgId, Payment.PaymentStatus status);
} 