package com.fitnessapp.repository;

import com.fitnessapp.entity.Progress;
import com.fitnessapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProgressRepository extends JpaRepository<Progress, Long> {
    
    Optional<Progress> findByUserAndDate(User user, LocalDate date);
    
    List<Progress> findByUserOrderByDateDesc(User user);
    
    @Query("SELECT p FROM Progress p WHERE p.user.id = :userId AND p.date BETWEEN :startDate AND :endDate ORDER BY p.date DESC")
    List<Progress> findProgressByUserIdAndDateRange(@Param("userId") Long userId, 
                                                   @Param("startDate") LocalDate startDate, 
                                                   @Param("endDate") LocalDate endDate);
    
    @Query("SELECT p FROM Progress p WHERE p.user.id = :userId ORDER BY p.date DESC LIMIT 30")
    List<Progress> findLast30DaysProgressByUserId(@Param("userId") Long userId);
    
    @Query("SELECT COUNT(p) FROM Progress p WHERE p.user.id = :userId AND p.workoutCompleted = true")
    long countCompletedWorkoutsByUserId(@Param("userId") Long userId);
}
