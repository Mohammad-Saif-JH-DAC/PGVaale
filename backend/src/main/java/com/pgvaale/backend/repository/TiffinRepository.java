package com.pgvaale.backend.repository;

import com.pgvaale.backend.entity.Tiffin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TiffinRepository extends JpaRepository<Tiffin, Long> {
    Optional<Tiffin> findByUsername(String username);
    Optional<Tiffin> findByEmail(String email);
    List<Tiffin> findByApprovedFalse();
    List<Tiffin> findByApprovedTrue();
    
    // Additional query methods for filtering
    List<Tiffin> findByApprovedTrueAndRegionIgnoreCase(String region);
    List<Tiffin> findByApprovedTrueAndFoodCategoryIgnoreCase(String foodCategory);
    List<Tiffin> findByApprovedTrueAndRegionIgnoreCaseAndFoodCategoryIgnoreCase(String region, String foodCategory);
} 