package com.pgvaale.backend.controller;

import com.pgvaale.backend.entity.PGRoom;
import com.pgvaale.backend.service.PGRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/pgrooms")
public class PGRoomController {
    @Autowired
    private PGRoomService pgRoomService;

    @GetMapping
    public List<PGRoom> getAllRooms() {
        return pgRoomService.getAllRooms();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PGRoom> getRoomById(@PathVariable Long id) {
        return pgRoomService.getRoomById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createRoom(@RequestBody PGRoom room) {
        try {
            // Validate required fields
            if (room.getTitle() == null || room.getTitle().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Title is required");
            }
            if (room.getRegion() == null || room.getRegion().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Region is required");
            }
            if (room.getRent() == null || room.getRent() <= 0) {
                return ResponseEntity.badRequest().body("Valid rent amount is required");
            }
            
            // Set default values if not provided
            if (room.getGender() == null || room.getGender().trim().isEmpty()) {
                room.setGender("Any");
            }
            if (room.getState() == null || room.getState().trim().isEmpty()) {
                room.setState("Maharashtra"); // Default state
            }
            
            // Save the room
            PGRoom savedRoom = pgRoomService.saveRoom(room);
            return ResponseEntity.ok(savedRoom);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error creating room: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<PGRoom> updateRoom(@PathVariable Long id, @RequestBody PGRoom room) {
        return pgRoomService.getRoomById(id)
                .map(existing -> {
                    room.setId(id);
                    return ResponseEntity.ok(pgRoomService.saveRoom(room));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long id) {
        pgRoomService.deleteRoom(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/region/{region}")
    public List<PGRoom> getRoomsByRegion(@PathVariable String region) {
        return pgRoomService.findByRegion(region);
    }

    @GetMapping("/state/{state}")
    public List<PGRoom> getRoomsByState(@PathVariable String state) {
        return pgRoomService.findByState(state);
    }

    @GetMapping("/gender/{gender}")
    public List<PGRoom> getRoomsByGender(@PathVariable String gender) {
        return pgRoomService.findByGender(gender);
    }

    @GetMapping("/available/{available}")
    public List<PGRoom> getRoomsByAvailability(@PathVariable boolean available) {
        return pgRoomService.findByAvailable(available);
    }

    @GetMapping("/owner/{username}")
    public ResponseEntity<?> getRoomsByOwner(@PathVariable String username) {
        try {
            List<PGRoom> rooms = pgRoomService.findByCreatedBy(username);
            return ResponseEntity.ok(rooms);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching rooms: " + e.getMessage());
        }
    }

    @GetMapping("/my-rooms")
    public ResponseEntity<?> getMyRooms(Authentication authentication) {
        try {
            String username = authentication.getName();
            List<PGRoom> rooms = pgRoomService.findByCreatedBy(username);
            return ResponseEntity.ok(rooms);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching your rooms: " + e.getMessage());
        }
    }
} 