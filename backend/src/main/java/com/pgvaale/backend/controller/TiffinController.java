package com.pgvaale.backend.controller;

import com.pgvaale.backend.dto.MenuDTO;
import com.pgvaale.backend.dto.TiffinDashboardDTO;
import com.pgvaale.backend.dto.UserTiffinDTO;
import com.pgvaale.backend.entity.Tiffin;
import com.pgvaale.backend.entity.UserTiffin;
import com.pgvaale.backend.repository.TiffinRepository;
import com.pgvaale.backend.service.TiffinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import com.pgvaale.backend.entity.Feedback_Tiffin;
import com.pgvaale.backend.entity.User;
import com.pgvaale.backend.repository.Feedback_TiffinRepository;
import com.pgvaale.backend.repository.MenuRepository;
import com.pgvaale.backend.repository.UserRepository;
import com.pgvaale.backend.repository.UserTiffinRepository;
import com.pgvaale.backend.entity.Menu;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/tiffin")
public class TiffinController {
    
    @Autowired
    private TiffinService tiffinService;
    
    @Autowired
    private TiffinRepository tiffinRepository;
    
    @Autowired
    private Feedback_TiffinRepository feedbackTiffinRepository;

    @Autowired
    private UserTiffinRepository userTiffinRepository;

    @Autowired
    private MenuRepository menuRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    // Get all approved tiffin providers (for users to browse)
    @GetMapping("/all")
    public ResponseEntity<?> getAllTiffins(
            @RequestParam(required = false) String region,
            @RequestParam(required = false) String category) {
        try {
            List<Tiffin> tiffins;
            
            // Use optimized queries based on filters
            if (region != null && !region.isEmpty() && category != null && !category.isEmpty()) {
                tiffins = tiffinRepository.findByApprovedTrueAndRegionIgnoreCaseAndFoodCategoryIgnoreCase(region, category);
            } else if (region != null && !region.isEmpty()) {
                tiffins = tiffinRepository.findByApprovedTrueAndRegionIgnoreCase(region);
            } else if (category != null && !category.isEmpty()) {
                tiffins = tiffinRepository.findByApprovedTrueAndFoodCategoryIgnoreCase(category);
            } else {
                tiffins = tiffinRepository.findByApprovedTrue();
            }
            
            // Set default values for missing fields to ensure frontend compatibility
            tiffins.forEach(tiffin -> {
                if (tiffin.getName() == null) tiffin.setName("Tiffin Provider " + tiffin.getId());
                if (tiffin.getCuisine() == null) tiffin.setCuisine("North Indian"); // Default cuisine
                if (tiffin.getMealType() == null) tiffin.setMealType("Full Day");
                if (tiffin.getPricePerMeal() == null) tiffin.setPricePerMeal(tiffin.getPrice());
                if (tiffin.getRating() == null) tiffin.setRating(4.5);
                if (tiffin.getDescription() == null) tiffin.setDescription("Delicious home-cooked meals delivered to your doorstep.");
                if (tiffin.getIsVegetarian() == null) tiffin.setIsVegetarian("Veg".equalsIgnoreCase(tiffin.getFoodCategory()));
                if (tiffin.getProfileImage() == null) tiffin.setProfileImage("https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=150&q=80");
            });
            
            return ResponseEntity.ok(tiffins);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error fetching tiffin providers: " + e.getMessage());
        }
    }
    
    // Book tiffin service
    @PostMapping("/book/{tiffinId}")
    public ResponseEntity<?> bookTiffin(@PathVariable Long tiffinId) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String username = auth.getName();
            
            // Get user ID from username
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            
            // Create booking request
            UserTiffinDTO booking = tiffinService.createUserRequest(user.getId(), tiffinId);
            return ResponseEntity.ok(booking);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error booking tiffin: " + e.getMessage());
        }
    }
    
    // Dashboard
    @GetMapping("/dashboard")
    public ResponseEntity<?> getDashboard() {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String username = auth.getName();
            
            // Get tiffin ID from username (you might need to adjust this based on your auth setup)
            Long tiffinId = getTiffinIdFromUsername(username);
            TiffinDashboardDTO dashboard = tiffinService.getTiffinDashboard(tiffinId);
            return ResponseEntity.ok(dashboard);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error fetching dashboard: " + e.getMessage());
        }
    }
    
    // Menu Management
    @PostMapping("/menu")
    public ResponseEntity<?> createMenu(@RequestBody MenuDTO menuDTO) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String username = auth.getName();
            Long tiffinId = getTiffinIdFromUsername(username);
            menuDTO.setTiffinId(tiffinId);
            
            MenuDTO createdMenu = tiffinService.createMenu(menuDTO);
            return ResponseEntity.ok(createdMenu);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating menu: " + e.getMessage());
        }
    }
    
    @PutMapping("/menu/{menuId}")
    public ResponseEntity<?> updateMenu(@PathVariable Long menuId, @RequestBody MenuDTO menuDTO) {
        try {
            MenuDTO updatedMenu = tiffinService.updateMenu(menuId, menuDTO);
            return ResponseEntity.ok(updatedMenu);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating menu: " + e.getMessage());
        }
    }
    
    @DeleteMapping("/menu/{menuId}")
    public ResponseEntity<?> deleteMenu(@PathVariable Long menuId) {
        try {
            tiffinService.deleteMenu(menuId);
            return ResponseEntity.ok("Menu deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting menu: " + e.getMessage());
        }
    }
    
    @GetMapping("/menu")
    public ResponseEntity<?> getWeeklyMenu() {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String username = auth.getName();
            Long tiffinId = getTiffinIdFromUsername(username);
            
            List<MenuDTO> menus = tiffinService.getWeeklyMenu(tiffinId);
            return ResponseEntity.ok(menus);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error fetching menu: " + e.getMessage());
        }
    }
    
    @GetMapping("/menu/{dayOfWeek}")
    public ResponseEntity<?> getMenuByDay(@PathVariable String dayOfWeek) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String username = auth.getName();
            Long tiffinId = getTiffinIdFromUsername(username);
            
            MenuDTO menu = tiffinService.getMenuByDay(tiffinId, dayOfWeek);
            if (menu != null) {
                return ResponseEntity.ok(menu);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error fetching menu: " + e.getMessage());
        }
    }
    
    // Request Management
    @GetMapping("/requests")
    public ResponseEntity<?> getRequests(@RequestParam(required = false) String status) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String username = auth.getName();
            Long tiffinId = getTiffinIdFromUsername(username);
            
            UserTiffin.RequestStatus requestStatus = null;
            if (status != null && !status.isEmpty()) {
                requestStatus = UserTiffin.RequestStatus.valueOf(status.toUpperCase());
            }
            
            List<UserTiffinDTO> requests = tiffinService.getTiffinRequests(tiffinId, requestStatus);
            return ResponseEntity.ok(requests);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error fetching requests: " + e.getMessage());
        }
    }
    
    @PostMapping("/requests/{requestId}/status")
    public ResponseEntity<?> updateRequestStatus(@PathVariable Long requestId, @RequestBody Map<String, String> request) {
        try {
            String status = request.get("status");
            UserTiffin.RequestStatus requestStatus = UserTiffin.RequestStatus.valueOf(status.toUpperCase());
            
            UserTiffinDTO updatedRequest = tiffinService.updateRequestStatus(requestId, requestStatus);
            return ResponseEntity.ok(updatedRequest);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating request status: " + e.getMessage());
        }
    }
    
    // Profile
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile() {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String username = auth.getName();
            
            Optional<Tiffin> tiffinOptional = tiffinRepository.findByUsername(username);
            if (!tiffinOptional.isPresent()) {
                return ResponseEntity.notFound().build();
            }
            
            Tiffin tiffin = tiffinOptional.get();
            return ResponseEntity.ok(tiffin);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error fetching profile: " + e.getMessage());
        }
    }
    
    @PostMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody Map<String, Object> profileData) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String username = auth.getName();
            
            Optional<Tiffin> tiffinOptional = tiffinRepository.findByUsername(username);
            if (!tiffinOptional.isPresent()) {
                return ResponseEntity.notFound().build();
            }
            
            Tiffin tiffin = tiffinOptional.get();
            
            // Update profile fields
            if (profileData.containsKey("name")) {
                tiffin.setName((String) profileData.get("name"));
            }
            if (profileData.containsKey("email")) {
                tiffin.setEmail((String) profileData.get("email"));
            }
            if (profileData.containsKey("phoneNumber")) {
                tiffin.setPhoneNumber((String) profileData.get("phoneNumber"));
            }
            if (profileData.containsKey("aadhaar")) {
                tiffin.setAadhaar((String) profileData.get("aadhaar"));
            }
            if (profileData.containsKey("price")) {
                Object priceObj = profileData.get("price");
                if (priceObj instanceof Number) {
                    tiffin.setPrice(((Number) priceObj).doubleValue());
                } else if (priceObj instanceof String) {
                    try {
                        tiffin.setPrice(Double.parseDouble((String) priceObj));
                    } catch (NumberFormatException e) {
                        return ResponseEntity.badRequest().body("Invalid price format");
                    }
                }
            }
            if (profileData.containsKey("foodCategory")) {
                tiffin.setFoodCategory((String) profileData.get("foodCategory"));
            }
            if (profileData.containsKey("region")) {
                tiffin.setRegion((String) profileData.get("region"));
            }
            if (profileData.containsKey("maidAddress")) {
                tiffin.setMaidAddress((String) profileData.get("maidAddress"));
            }
            
            Tiffin updatedTiffin = tiffinRepository.save(tiffin);
            return ResponseEntity.ok(updatedTiffin);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating profile: " + e.getMessage());
        }
    }
    
    // Helper method to get tiffin ID from username
    private Long getTiffinIdFromUsername(String username) {
        try {
            Optional<Tiffin> tiffin = tiffinRepository.findByUsername(username);
            if (tiffin.isPresent()) {
                return tiffin.get().getId();
            }
            throw new RuntimeException("Tiffin not found for username: " + username);
        } catch (Exception e) {
            throw new RuntimeException("Error getting tiffin ID: " + e.getMessage());
        }
    }

    // Delete tiffin account
    @DeleteMapping("/profile")
    public ResponseEntity<?> deleteAccount() {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String username = auth.getName();
            
            Optional<Tiffin> tiffinOptional = tiffinRepository.findByUsername(username);
            if (!tiffinOptional.isPresent()) {
                return ResponseEntity.notFound().build();
            }
            
            Tiffin tiffin = tiffinOptional.get();
            Long tiffinId = tiffin.getId();
            
            // Delete all feedback for this tiffin
            List<Feedback_Tiffin> tiffinFeedback = feedbackTiffinRepository.findByTiffinId(tiffinId);
            feedbackTiffinRepository.deleteAll(tiffinFeedback);
            
            // Delete all user-tiffin relationships for this tiffin
            List<UserTiffin> userTiffinRelations = userTiffinRepository.findByTiffinId(tiffinId);
            userTiffinRepository.deleteAll(userTiffinRelations);
            
            // Delete all menus for this tiffin
            List<Menu> tiffinMenus = menuRepository.findByTiffinId(tiffinId);
            menuRepository.deleteAll(tiffinMenus);
            
            // Delete the tiffin account
            tiffinRepository.delete(tiffin);
            
            return ResponseEntity.ok("Account deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting account: " + e.getMessage());
        }
    }
} 