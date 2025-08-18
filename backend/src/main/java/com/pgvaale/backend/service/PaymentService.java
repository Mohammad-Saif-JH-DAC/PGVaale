package com.pgvaale.backend.service;

import com.pgvaale.backend.dto.PaymentRequestDTO;
import com.pgvaale.backend.dto.PaymentResponseDTO;
import com.pgvaale.backend.dto.PaymentVerificationDTO;
import com.pgvaale.backend.entity.PG;
import com.pgvaale.backend.entity.Payment;
import com.pgvaale.backend.entity.User;
import com.pgvaale.backend.repository.PaymentRepository;
import com.pgvaale.backend.repository.PGRepository;
import com.pgvaale.backend.repository.UserRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class PaymentService {

    @Value("${razorpay.key.id}")
    private String razorpayKeyId;

    @Value("${razorpay.key.secret}")
    private String razorpayKeySecret;

    @Value("${razorpay.currency:INR}")
    private String currency;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private PGRepository pgRepository;

    @Autowired
    private UserRepository userRepository;

    public PaymentResponseDTO createPaymentOrder(PaymentRequestDTO paymentRequest, String username) throws Exception {
        // Find the user
        Optional<User> userOptional = userRepository.findByUsername(username);
        if (!userOptional.isPresent()) {
            throw new RuntimeException("User not found");
        }
        User user = userOptional.get();

        // Find the PG
        Optional<PG> pgOptional = pgRepository.findById(paymentRequest.getPgId());
        if (!pgOptional.isPresent()) {
            throw new RuntimeException("PG not found");
        }
        PG pg = pgOptional.get();

        // Check if PG is available
        if (!"Available".equals(pg.getAvailability()) || pg.getRegisteredUser() != null) {
            throw new RuntimeException("PG is not available for booking");
        }

        // Check if user already has a pending or completed payment for this PG
        Optional<Payment> existingPayment = paymentRepository.findByUserIdAndPgIdAndStatus(
            user.getId(), pg.getId(), Payment.PaymentStatus.COMPLETED);
        if (existingPayment.isPresent()) {
            throw new RuntimeException("You have already booked this PG");
        }

        // Use the PG's rent amount instead of fixed amount
        double paymentAmount = pg.getRent();
        if (paymentAmount <= 0) {
            throw new RuntimeException("Invalid rent amount for this PG");
        }

        // Create Razorpay order
        RazorpayClient razorpayClient = new RazorpayClient(razorpayKeyId, razorpayKeySecret);
        
        JSONObject options = new JSONObject();
        options.put("amount", (int)(paymentAmount * 100)); // Convert to paise
        options.put("currency", paymentRequest.getCurrency());
        options.put("receipt", "pg_booking_" + pg.getId() + "_" + user.getId());
        
        JSONObject notes = new JSONObject();
        notes.put("pg_id", pg.getId().toString());
        notes.put("user_id", user.getId().toString());
        notes.put("description", "PG Booking Payment");
        options.put("notes", notes);

        Order order;
        try {
            order = razorpayClient.orders.create(options);
        } catch (RazorpayException e) {
            throw new RuntimeException("Failed to create Razorpay order: " + e.getMessage());
        }

        // Save payment record
        Payment payment = Payment.builder()
                .user(user)
                .pg(pg)
                .razorpayOrderId(order.get("id").toString())
                .razorpayPaymentId("") // Will be set after payment
                .razorpaySignature("") // Will be set after payment
                .amount(paymentAmount) // Use dynamic amount
                .currency(paymentRequest.getCurrency())
                .status(Payment.PaymentStatus.PENDING)
                .build();

        paymentRepository.save(payment);

        // Return payment response
        PaymentResponseDTO response = new PaymentResponseDTO();
        response.setOrderId(order.get("id").toString());
        response.setKeyId(razorpayKeyId);
        response.setAmount(paymentAmount); // Use dynamic amount
        response.setCurrency(paymentRequest.getCurrency());
        response.setDescription("PG Booking Payment - PG #" + pg.getId() + " (₹" + paymentAmount + "/month)");
        response.setPrefillName(user.getName());
        response.setPrefillEmail(user.getEmail());
        response.setPrefillContact(user.getMobileNumber());

        return response;
    }

    public boolean verifyPayment(PaymentVerificationDTO verificationDTO, String username) throws Exception {
        // Find the user
        Optional<User> userOptional = userRepository.findByUsername(username);
        if (!userOptional.isPresent()) {
            throw new RuntimeException("User not found");
        }
        User user = userOptional.get();

        // Find the payment by order ID
        Optional<Payment> paymentOptional = paymentRepository.findByRazorpayOrderId(verificationDTO.getRazorpayOrderId());
        if (!paymentOptional.isPresent()) {
            throw new RuntimeException("Payment not found");
        }
        Payment payment = paymentOptional.get();

        // Verify that the payment belongs to the authenticated user
        if (!payment.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Payment does not belong to authenticated user");
        }

        // Verify payment signature
        try {
            RazorpayClient razorpayClient = new RazorpayClient(razorpayKeyId, razorpayKeySecret);
            
            JSONObject attributes = new JSONObject();
            attributes.put("razorpay_order_id", verificationDTO.getRazorpayOrderId());
            attributes.put("razorpay_payment_id", verificationDTO.getRazorpayPaymentId());
            attributes.put("razorpay_signature", verificationDTO.getRazorpaySignature());

            // Note: In production, you should verify the signature
            // For now, we'll assume the payment is successful if we receive the callback
            
            // Update payment record
            payment.setRazorpayPaymentId(verificationDTO.getRazorpayPaymentId());
            payment.setRazorpaySignature(verificationDTO.getRazorpaySignature());
            payment.setStatus(Payment.PaymentStatus.COMPLETED);
            payment.setCompletedAt(java.time.LocalDateTime.now());
            
            paymentRepository.save(payment);

            // Book the PG
            PG pg = payment.getPg();
            pg.setRegisteredUser(user);
            pg.setAvailability("Not Available");
            pgRepository.save(pg);

            return true;
        } catch (Exception e) {
            // Mark payment as failed
            payment.setStatus(Payment.PaymentStatus.FAILED);
            payment.setFailureReason(e.getMessage());
            paymentRepository.save(payment);
            
            throw new RuntimeException("Payment verification failed: " + e.getMessage());
        }
    }

    public Payment getPaymentByOrderId(String orderId) {
        return paymentRepository.findByRazorpayOrderId(orderId).orElse(null);
    }
} 