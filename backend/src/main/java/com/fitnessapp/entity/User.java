package com.fitnessapp.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "users")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;
    
    @Column(nullable = false)
    @NotBlank(message = "Name is required")
    private String name;
    
    @Column(nullable = false)
    @Min(value = 1, message = "Age must be at least 1")
    @Max(value = 120, message = "Age must not exceed 120")
    private Integer age;
    
    @Column(nullable = false)
    @Pattern(regexp = "^(MALE|FEMALE|OTHER)$", message = "Gender must be MALE, FEMALE, or OTHER")
    private String gender;
    
    @Column(nullable = false)
    @DecimalMin(value = "1.0", message = "Weight must be at least 1 kg")
    @DecimalMax(value = "500.0", message = "Weight must not exceed 500 kg")
    private Double weight;
    
    @Column(nullable = false)
    @DecimalMin(value = "50.0", message = "Height must be at least 50 cm")
    @DecimalMax(value = "300.0", message = "Height must not exceed 300 cm")
    private Double height;
    
    @Column(nullable = false)
    @Pattern(regexp = "^(LOSE_WEIGHT|BUILD_MUSCLE|STAY_FIT)$", 
            message = "Fitness goal must be LOSE_WEIGHT, BUILD_MUSCLE, or STAY_FIT")
    private String fitnessGoal;
    
    @Column(nullable = false)
    @Pattern(regexp = "^(HOME|GYM|BOTH)$", 
            message = "Workout preference must be HOME, GYM, or BOTH")
    private String workoutPreference;
    
    @Column(nullable = false)
    @Pattern(regexp = "^(VEG|NON_VEG|VEGAN)$", 
            message = "Diet preference must be VEG, NON_VEG, or VEGAN")
    private String dietPreference;
    
    @ElementCollection
    @Enumerated(EnumType.STRING)
    private List<FocusArea> focusAreas;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<BMI> bmiRecords;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Progress> progressRecords;
    
    // Constructors
    public User() {}
    
    public User(String email, String name, Integer age, String gender, 
                Double weight, Double height, String fitnessGoal, 
                String workoutPreference, String dietPreference) {
        this.email = email;
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.weight = weight;
        this.height = height;
        this.fitnessGoal = fitnessGoal;
        this.workoutPreference = workoutPreference;
        this.dietPreference = dietPreference;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    // PrePersist and PreUpdate callbacks
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
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }
    
    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }
    
    public Double getWeight() { return weight; }
    public void setWeight(Double weight) { this.weight = weight; }
    
    public Double getHeight() { return height; }
    public void setHeight(Double height) { this.height = height; }
    
    public String getFitnessGoal() { return fitnessGoal; }
    public void setFitnessGoal(String fitnessGoal) { this.fitnessGoal = fitnessGoal; }
    
    public String getWorkoutPreference() { return workoutPreference; }
    public void setWorkoutPreference(String workoutPreference) { this.workoutPreference = workoutPreference; }
    
    public String getDietPreference() { return dietPreference; }
    public void setDietPreference(String dietPreference) { this.dietPreference = dietPreference; }
    
    public List<FocusArea> getFocusAreas() { return focusAreas; }
    public void setFocusAreas(List<FocusArea> focusAreas) { this.focusAreas = focusAreas; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    public List<BMI> getBmiRecords() { return bmiRecords; }
    public void setBmiRecords(List<BMI> bmiRecords) { this.bmiRecords = bmiRecords; }
    
    public List<Progress> getProgressRecords() { return progressRecords; }
    public void setProgressRecords(List<Progress> progressRecords) { this.progressRecords = progressRecords; }
}

enum FocusArea {
    ABS, ARMS, CHEST, BACK, LEGS, FULL_BODY
}
