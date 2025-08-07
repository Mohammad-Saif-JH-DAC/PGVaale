package com.pgvaale.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    @Autowired
    private JavaMailSender mailSender;

    /**
     * Send welcome email to newly registered users
     */
    public void sendUserWelcomeEmail(String toEmail, String userName) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject("Welcome to PGVaale - Your Account is Ready!");
            message.setText(buildUserWelcomeMessage(userName));
            
            mailSender.send(message);
            logger.info("Welcome email sent successfully to user: {}", toEmail);
        } catch (Exception e) {
            logger.error("Failed to send welcome email to user: {}", toEmail, e);
        }
    }

    /**
     * Send welcome email to newly registered owners
     */
    public void sendOwnerWelcomeEmail(String toEmail, String ownerName) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject("Welcome to PGVaale - Start Managing Your Properties!");
            message.setText(buildOwnerWelcomeMessage(ownerName));
            
            mailSender.send(message);
            logger.info("Welcome email sent successfully to owner: {}", toEmail);
        } catch (Exception e) {
            logger.error("Failed to send welcome email to owner: {}", toEmail, e);
        }
    }

    /**
     * Build welcome message for users
     */
    private String buildUserWelcomeMessage(String userName) {
        return String.format(
            "Dear %s,\n\n" +
            "Welcome to PGVaale! 🏠\n\n" +
            "Your account has been successfully created. You can now:\n" +
            "• Browse available PG accommodations\n" +
            "• Search for properties in your preferred location\n" +
            "• Connect with property owners\n" +
            "• Manage your profile and preferences\n\n" +
            "We're excited to help you find the perfect accommodation that suits your needs.\n\n" +
            "If you have any questions or need assistance, please don't hesitate to contact our support team.\n\n" +
            "Happy house hunting!\n\n" +
            "Best regards,\n" +
            "The PGVaale Team\n\n" +
            "---\n" +
            "This is an automated message. Please do not reply to this email.",
            userName
        );
    }

    /**
     * Build welcome message for owners
     */
    private String buildOwnerWelcomeMessage(String ownerName) {
        return String.format(
            "Dear %s,\n\n" +
            "Welcome to PGVaale - Property Owner Portal! 🏢\n\n" +
            "Your owner account has been successfully created. You can now:\n" +
            "• List your PG properties\n" +
            "• Manage property details and amenities\n" +
            "• Upload property photos\n" +
            "• Connect with potential tenants\n" +
            "• Track inquiries and bookings\n" +
            "• Update availability and pricing\n\n" +
            "Start listing your properties today and reach thousands of potential tenants looking for quality accommodations.\n\n" +
            "Our platform is designed to make property management simple and efficient. If you need any help getting started, our support team is here to assist you.\n\n" +
            "Thank you for choosing PGVaale to showcase your properties!\n\n" +
            "Best regards,\n" +
            "The PGVaale Team\n\n" +
            "---\n" +
            "This is an automated message. Please do not reply to this email.",
            ownerName
        );
    }

    /**
     * Send pending approval email to Maid/Tiffin service providers
     */
    public void sendPendingApprovalEmail(String toEmail, String providerName, String serviceType) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject("Registration Received - Pending Admin Approval");
            message.setText(buildPendingApprovalMessage(providerName, serviceType));
            
            mailSender.send(message);
            logger.info("Pending approval email sent successfully to {} provider: {}", serviceType, toEmail);
        } catch (Exception e) {
            logger.error("Failed to send pending approval email to {} provider: {}", serviceType, toEmail, e);
        }
    }

    /**
     * Send approval confirmation email to Maid/Tiffin service providers
     */
    public void sendApprovalConfirmationEmail(String toEmail, String providerName, String serviceType) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject("Congratulations! Your Registration has been Approved");
            message.setText(buildApprovalConfirmationMessage(providerName, serviceType));
            
            mailSender.send(message);
            logger.info("Approval confirmation email sent successfully to {} provider: {}", serviceType, toEmail);
        } catch (Exception e) {
            logger.error("Failed to send approval confirmation email to {} provider: {}", serviceType, toEmail, e);
        }
    }

    /**
     * Unified method to send welcome email based on user type
     */
    public void sendWelcomeEmail(String toEmail, String userName, String userType) {
        if ("User".equalsIgnoreCase(userType)) {
            sendUserWelcomeEmail(toEmail, userName);
        } else if ("Owner".equalsIgnoreCase(userType)) {
            sendOwnerWelcomeEmail(toEmail, userName);
        } else if ("Maid".equalsIgnoreCase(userType) || "Tiffin".equalsIgnoreCase(userType)) {
            sendPendingApprovalEmail(toEmail, userName, userType);
        } else {
            logger.warn("Unknown user type '{}' for welcome email to: {}", userType, toEmail);
            // Default to user welcome email
            sendUserWelcomeEmail(toEmail, userName);
        }
    }

    /**
     * Build pending approval message for Maid/Tiffin service providers
     */
    private String buildPendingApprovalMessage(String providerName, String serviceType) {
        return String.format(
            "Dear %s,\n\n" +
            "Thank you for registering as a %s service provider with PGVaale! 🎉\n\n" +
            "Your registration has been successfully received and you're one step closer to joining our platform.\n\n" +
            "📋 What happens next?\n" +
            "• Your application is currently under review by our admin team\n" +
            "• We will verify your details and credentials\n" +
            "• Once approved, you'll receive a confirmation email\n" +
            "• After approval, you can start offering your services to our community\n\n" +
            "⏰ Review Process:\n" +
            "Our admin team typically reviews applications within 24-48 hours. We appreciate your patience during this process.\n\n" +
            "📞 Need Help?\n" +
            "If you have any questions or need to update your information, please contact our support team.\n\n" +
            "Thank you for choosing PGVaale to grow your %s service business!\n\n" +
            "Best regards,\n" +
            "The PGVaale Team\n\n" +
            "---\n" +
            "This is an automated message. Please do not reply to this email.",
            providerName, serviceType, serviceType
        );
    }

    /**
     * Build approval confirmation message for Maid/Tiffin service providers
     */
    private String buildApprovalConfirmationMessage(String providerName, String serviceType) {
        return String.format(
            "Dear %s,\n\n" +
            "🎉 Congratulations! Your %s service provider registration has been APPROVED! 🎉\n\n" +
            "Welcome to the PGVaale family! You are now officially part of our trusted service provider network.\n\n" +
            "✅ What you can do now:\n" +
            "• Log in to your provider dashboard\n" +
            "• Complete your service profile\n" +
            "• Set your availability and pricing\n" +
            "• Start receiving service requests from customers\n" +
            "• Manage your bookings and earnings\n\n" +
            "🚀 Getting Started:\n" +
            "1. Log in to your account using your registered credentials\n" +
            "2. Complete your profile with service details\n" +
            "3. Upload any additional photos or certificates\n" +
            "4. Set your service areas and availability\n" +
            "5. Start accepting bookings!\n\n" +
            "💡 Tips for Success:\n" +
            "• Keep your profile updated and professional\n" +
            "• Respond promptly to customer inquiries\n" +
            "• Maintain high service quality\n" +
            "• Build positive customer relationships\n\n" +
            "We're excited to have you on board and look forward to your success on our platform!\n\n" +
            "If you need any assistance getting started, our support team is here to help.\n\n" +
            "Best regards,\n" +
            "The PGVaale Team\n\n" +
            "---\n" +
            "This is an automated message. Please do not reply to this email.",
            providerName, serviceType
        );
    }

    /**
     * Generic method to send any email
     */
    public void sendEmail(String toEmail, String subject, String message) {
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(toEmail);
            mailMessage.setSubject(subject);
            mailMessage.setText(message);
            
            mailSender.send(mailMessage);
            logger.info("Email sent successfully to: {}", toEmail);
        } catch (Exception e) {
            logger.error("Failed to send email to: {}", toEmail, e);
        }
    }
}
