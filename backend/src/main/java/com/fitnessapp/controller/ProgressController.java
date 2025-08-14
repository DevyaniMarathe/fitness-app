package com.fitnessapp.controller;

import com.fitnessapp.entity.Progress;
import com.fitnessapp.entity.User;
import com.fitnessapp.repository.ProgressRepository;
import com.fitnessapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/progress")
@CrossOrigin(origins = "http://localhost:3000")
public class ProgressController {

    @Autowired
    private ProgressRepository progressRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/update/{userId}")
    public ResponseEntity<Map<String, Object>> updateProgress(@PathVariable Long userId,
                                                             @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
                                                             @RequestParam(required = false) Integer caloriesConsumed,
                                                             @RequestParam(required = false) Integer caloriesBurned,
                                                             @RequestParam(required = false) Boolean workoutCompleted,
                                                             @RequestParam(required = false) Integer waterIntake,
                                                             @RequestParam(required = false) Integer mealsCompleted,
                                                             @RequestParam(required = false) Double currentWeight) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Optional<User> userOptional = userRepository.findById(userId);
            if (!userOptional.isPresent()) {
                response.put("success", false);
                response.put("message", "User not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
            
            User user = userOptional.get();
            Optional<Progress> existingProgress = progressRepository.findByUserAndDate(user, date);
            
            Progress progress;
            if (existingProgress.isPresent()) {
                progress = existingProgress.get();
            } else {
                progress = new Progress(user, date);
            }
            
            // Update progress values if provided
            if (caloriesConsumed != null) progress.setCaloriesConsumed(caloriesConsumed);
            if (caloriesBurned != null) progress.setCaloriesBurned(caloriesBurned);
            if (workoutCompleted != null) progress.setWorkoutCompleted(workoutCompleted);
            if (waterIntake != null) progress.setWaterIntake(waterIntake);
            if (mealsCompleted != null) progress.setMealsCompleted(mealsCompleted);
            if (currentWeight != null) progress.setCurrentWeight(currentWeight);
            
            Progress savedProgress = progressRepository.save(progress);
            
            response.put("success", true);
            response.put("message", "Progress updated successfully");
            response.put("progress", savedProgress);
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error updating progress: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Map<String, Object>> getUserProgress(@PathVariable Long userId) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Optional<User> userOptional = userRepository.findById(userId);
            if (!userOptional.isPresent()) {
                response.put("success", false);
                response.put("message", "User not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
            
            User user = userOptional.get();
            List<Progress> progressList = progressRepository.findByUserOrderByDateDesc(user);
            
            response.put("success", true);
            response.put("progress", progressList);
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error fetching progress: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/user/{userId}/today")
    public ResponseEntity<Map<String, Object>> getTodayProgress(@PathVariable Long userId) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Optional<User> userOptional = userRepository.findById(userId);
            if (!userOptional.isPresent()) {
                response.put("success", false);
                response.put("message", "User not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
            
            User user = userOptional.get();
            LocalDate today = LocalDate.now();
            Optional<Progress> todayProgress = progressRepository.findByUserAndDate(user, today);
            
            if (todayProgress.isPresent()) {
                response.put("success", true);
                response.put("progress", todayProgress.get());
            } else {
                // Create a new progress entry for today
                Progress newProgress = new Progress(user, today);
                response.put("success", true);
                response.put("progress", newProgress);
            }
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error fetching today's progress: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/user/{userId}/range")
    public ResponseEntity<Map<String, Object>> getProgressByDateRange(@PathVariable Long userId,
                                                                     @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
                                                                     @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            List<Progress> progressList = progressRepository.findProgressByUserIdAndDateRange(userId, startDate, endDate);
            
            response.put("success", true);
            response.put("progress", progressList);
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error fetching progress by date range: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/user/{userId}/stats")
    public ResponseEntity<Map<String, Object>> getUserStats(@PathVariable Long userId) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            long completedWorkouts = progressRepository.countCompletedWorkoutsByUserId(userId);
            List<Progress> last30Days = progressRepository.findLast30DaysProgressByUserId(userId);
            
            // Calculate averages for the last 30 days
            double avgCaloriesConsumed = last30Days.stream()
                .filter(p -> p.getCaloriesConsumed() != null)
                .mapToInt(Progress::getCaloriesConsumed)
                .average()
                .orElse(0.0);
                
            double avgCaloriesBurned = last30Days.stream()
                .filter(p -> p.getCaloriesBurned() != null)
                .mapToInt(Progress::getCaloriesBurned)
                .average()
                .orElse(0.0);
                
            long workoutStreak = last30Days.stream()
                .filter(p -> p.getWorkoutCompleted() != null && p.getWorkoutCompleted())
                .count();
            
            Map<String, Object> stats = new HashMap<>();
            stats.put("totalCompletedWorkouts", completedWorkouts);
            stats.put("avgCaloriesConsumed", Math.round(avgCaloriesConsumed));
            stats.put("avgCaloriesBurned", Math.round(avgCaloriesBurned));
            stats.put("workoutStreakLast30Days", workoutStreak);
            
            response.put("success", true);
            response.put("stats", stats);
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error fetching user stats: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
