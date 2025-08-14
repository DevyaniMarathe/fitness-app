package com.fitnessapp.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "bmi_records")
public class BMI {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(nullable = false)
    private Double weight;
    
    @Column(nullable = false)
    private Double height;
    
    @Column(nullable = false)
    private Double bmiValue;
    
    @Column(nullable = false)
    private String category; // UNDERWEIGHT, NORMAL, OVERWEIGHT, OBESE
    
    @Column(nullable = false)
    private Double minHealthyWeight;
    
    @Column(nullable = false)
    private Double maxHealthyWeight;
    
    @Column(name = "calculated_at")
    private LocalDateTime calculatedAt;
    
    // Constructors
    public BMI() {}
    
    public BMI(User user, Double weight, Double height) {
        this.user = user;
        this.weight = weight;
        this.height = height;
        this.bmiValue = calculateBMI(weight, height);
        this.category = determineBMICategory(this.bmiValue);
        this.minHealthyWeight = calculateMinHealthyWeight(height);
        this.maxHealthyWeight = calculateMaxHealthyWeight(height);
        this.calculatedAt = LocalDateTime.now();
    }
    
    // BMI calculation methods
    private Double calculateBMI(Double weight, Double height) {
        double heightInMeters = height / 100.0; // Convert cm to meters
        return weight / (heightInMeters * heightInMeters);
    }
    
    private String determineBMICategory(Double bmi) {
        if (bmi < 18.5) return "UNDERWEIGHT";
        else if (bmi < 25.0) return "NORMAL";
        else if (bmi < 30.0) return "OVERWEIGHT";
        else return "OBESE";
    }
    
    private Double calculateMinHealthyWeight(Double height) {
        double heightInMeters = height / 100.0;
        return 18.5 * heightInMeters * heightInMeters;
    }
    
    private Double calculateMaxHealthyWeight(Double height) {
        double heightInMeters = height / 100.0;
        return 24.9 * heightInMeters * heightInMeters;
    }
    
    @PrePersist
    protected void onCreate() {
        calculatedAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    
    public Double getWeight() { return weight; }
    public void setWeight(Double weight) { this.weight = weight; }
    
    public Double getHeight() { return height; }
    public void setHeight(Double height) { this.height = height; }
    
    public Double getBmiValue() { return bmiValue; }
    public void setBmiValue(Double bmiValue) { this.bmiValue = bmiValue; }
    
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    
    public Double getMinHealthyWeight() { return minHealthyWeight; }
    public void setMinHealthyWeight(Double minHealthyWeight) { this.minHealthyWeight = minHealthyWeight; }
    
    public Double getMaxHealthyWeight() { return maxHealthyWeight; }
    public void setMaxHealthyWeight(Double maxHealthyWeight) { this.maxHealthyWeight = maxHealthyWeight; }
    
    public LocalDateTime getCalculatedAt() { return calculatedAt; }
    public void setCalculatedAt(LocalDateTime calculatedAt) { this.calculatedAt = calculatedAt; }
}
