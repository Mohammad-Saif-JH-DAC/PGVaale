package com.pgvaale.backend.controller;

import com.pgvaale.backend.entity.PG;
import com.pgvaale.backend.entity.User;
import com.pgvaale.backend.repository.PGRepository;
import com.pgvaale.backend.repository.UserRepository;
import com.pgvaale.backend.service.PdfGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.util.Optional;

@RestController
@RequestMapping("/api/pdf")
public class PdfController {

    @Autowired
    private PdfGeneratorService pdfGeneratorService;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PGRepository pgRepository;

    @GetMapping("/generate/{pgId}")
    public ResponseEntity<InputStreamResource> generatePdf(@PathVariable Long pgId) {
        try {
            // Get authenticated user
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String username = auth.getName();
            
            // Find user
            Optional<User> userOptional = userRepository.findByUsername(username);
            if (!userOptional.isPresent()) {
                return ResponseEntity.badRequest().build();
            }
            User user = userOptional.get();
            
            // Find PG
            Optional<PG> pgOptional = pgRepository.findById(pgId);
            if (!pgOptional.isPresent()) {
                return ResponseEntity.badRequest().build();
            }
            PG pg = pgOptional.get();
            
            // Generate PDF with user and room details
            ByteArrayInputStream bis = pdfGeneratorService.generateContractPdf(
                user.getName(), 
                user.getId().toString(),
                "PG-" + pg.getId(), // Using PG ID as room identifier
                "₹" + pg.getRent() + "/month"
            );

            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Disposition", "inline; filename=booking_contract_PG_" + pg.getId() + ".pdf");

            return ResponseEntity
                    .ok()
                    .headers(headers)
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(new InputStreamResource(bis));
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}
