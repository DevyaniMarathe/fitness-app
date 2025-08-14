package com.fitnessapp.controller;

import com.fitnessapp.entity.BMI;
import com.fitnessapp.entity.User;
import com.fitnessapp.repository.BMIRepository;
import com.fitnessapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/bmi")
@CrossOrigin(origins = "http://localhost:3000")
public class BMIController {

    @Autowired
    private BMIRepository bmiRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/calculate/{userId}")
    public ResponseEntity<Map<String, Object>> calculateBMI(@PathVariable Long userId, 
                                                           @RequestParam Double weight, 
                                                           @RequestParam Double height) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Optional<User> userOptional = userRepository.findById(userId);
            if (!userOptional.isPresent()) {
                response.put("success", false);
                response.put("message", "User not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
            
            User user = userOptional.get();
            BMI bmi = new BMI(user, weight, height);
            BMI savedBMI = bmiRepository.save(bmi);
            
            response.put("success", true);
            response.put("message", "BMI calculated successfully");
            response.put("bmi", savedBMI);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error calculating BMI: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Map<String, Object>> getUserBMIHistory(@PathVariable Long userId) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Optional<User> userOptional = userRepository.findById(userId);
            if (!userOptional.isPresent()) {
                response.put("success", false);
                response.put("message", "User not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
            
            User user = userOptional.get();
            List<BMI> bmiHistory = bmiRepository.findByUserOrderByCalculatedAtDesc(user);
            
            response.put("success", true);
            response.put("bmiHistory", bmiHistory);
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error fetching BMI history: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/latest/{userId}")
    public ResponseEntity<Map<String, Object>> getLatestBMI(@PathVariable Long userId) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Optional<User> userOptional = userRepository.findById(userId);
            if (!userOptional.isPresent()) {
                response.put("success", false);
                response.put("message", "User not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
            
            User user = userOptional.get();
            Optional<BMI> latestBMI = bmiRepository.findFirstByUserOrderByCalculatedAtDesc(user);
            
            if (latestBMI.isPresent()) {
                response.put("success", true);
                response.put("bmi", latestBMI.get());
                return ResponseEntity.ok(response);
            } else {
                response.put("success", false);
                response.put("message", "No BMI records found for user");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error fetching latest BMI: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("/quick-calculate")
    public ResponseEntity<Map<String, Object>> quickCalculateBMI(@RequestParam Double weight, 
                                                                @RequestParam Double height) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Calculate BMI without saving to database
            double heightInMeters = height / 100.0;
            double bmiValue = weight / (heightInMeters * heightInMeters);
            
            String category;
            if (bmiValue < 18.5) category = "UNDERWEIGHT";
            else if (bmiValue < 25.0) category = "NORMAL";
            else if (bmiValue < 30.0) category = "OVERWEIGHT";
            else category = "OBESE";
            
            double minHealthyWeight = 18.5 * heightInMeters * heightInMeters;
            double maxHealthyWeight = 24.9 * heightInMeters * heightInMeters;
            
            Map<String, Object> bmiData = new HashMap<>();
            bmiData.put("bmiValue", Math.round(bmiValue * 10.0) / 10.0);
            bmiData.put("category", category);
            bmiData.put("minHealthyWeight", Math.round(minHealthyWeight * 10.0) / 10.0);
            bmiData.put("maxHealthyWeight", Math.round(maxHealthyWeight * 10.0) / 10.0);
            
            response.put("success", true);
            response.put("bmi", bmiData);
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error calculating BMI: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
