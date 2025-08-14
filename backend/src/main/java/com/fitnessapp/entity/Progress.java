package com.fitnessapp.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "progress_records")
public class Progress {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(nullable = false)
    private LocalDate date;
    
    @Column(name = "calories_consumed")
    private Integer caloriesConsumed;
    
    @Column(name = "calories_burned")
    private Integer caloriesBurned;
    
    @Column(name = "workout_completed")
    private Boolean workoutCompleted;
    
    @Column(name = "water_intake")
    private Integer waterIntake; // in glasses
    
    @Column(name = "meals_completed")
    private Integer mealsCompleted;
    
    @Column(name = "current_weight")
    private Double currentWeight;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Constructors
    public Progress() {}
    
    public Progress(User user, LocalDate date) {
        this.user = user;
        this.date = date;
        this.caloriesConsumed = 0;
        this.caloriesBurned = 0;
        this.workoutCompleted = false;
        this.waterIntake = 0;
        this.mealsCompleted = 0;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
    
    public Integer getCaloriesConsumed() { return caloriesConsumed; }
    public void setCaloriesConsumed(Integer caloriesConsumed) { this.caloriesConsumed = caloriesConsumed; }
    
    public Integer getCaloriesBurned() { return caloriesBurned; }
    public void setCaloriesBurned(Integer caloriesBurned) { this.caloriesBurned = caloriesBurned; }
    
    public Boolean getWorkoutCompleted() { return workoutCompleted; }
    public void setWorkoutCompleted(Boolean workoutCompleted) { this.workoutCompleted = workoutCompleted; }
    
    public Integer getWaterIntake() { return waterIntake; }
    public void setWaterIntake(Integer waterIntake) { this.waterIntake = waterIntake; }
    
    public Integer getMealsCompleted() { return mealsCompleted; }
    public void setMealsCompleted(Integer mealsCompleted) { this.mealsCompleted = mealsCompleted; }
    
    public Double getCurrentWeight() { return currentWeight; }
    public void setCurrentWeight(Double currentWeight) { this.currentWeight = currentWeight; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
