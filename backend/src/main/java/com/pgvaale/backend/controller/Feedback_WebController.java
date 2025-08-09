package com.pgvaale.backend.controller;

import com.pgvaale.backend.entity.Feedback_Web;
import com.pgvaale.backend.repository.Feedback_WebRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class Feedback_WebController {

    @Autowired
    private Feedback_WebRepository feedbackRepository;

    @PostMapping("/feedback-web")
    public Feedback_Web submitFeedback(@RequestBody Feedback_Web feedback) {
        return feedbackRepository.save(feedback);
    }

    @GetMapping("/feedback-web/user")
    public ResponseEntity<?> getUserFeedback() {
        try {
            // Since Feedback_Web doesn't have user associations, return all feedback
            List<Feedback_Web> allFeedback = feedbackRepository.findAll();
            return ResponseEntity.ok(allFeedback);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error fetching feedback: " + e.getMessage());
        }
    }
}
