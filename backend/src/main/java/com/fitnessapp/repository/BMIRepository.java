package com.fitnessapp.repository;

import com.fitnessapp.entity.BMI;
import com.fitnessapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BMIRepository extends JpaRepository<BMI, Long> {
    
    List<BMI> findByUserOrderByCalculatedAtDesc(User user);
    
    Optional<BMI> findFirstByUserOrderByCalculatedAtDesc(User user);
    
    @Query("SELECT b FROM BMI b WHERE b.user.id = :userId ORDER BY b.calculatedAt DESC")
    List<BMI> findBMIHistoryByUserId(@Param("userId") Long userId);
    
    @Query("SELECT b FROM BMI b WHERE b.user.id = :userId ORDER BY b.calculatedAt DESC LIMIT 1")
    Optional<BMI> findLatestBMIByUserId(@Param("userId") Long userId);
}
