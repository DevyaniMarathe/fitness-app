# 🏋️‍♂️ FitnessHub - Personalized Fitness App

A modern, full-stack fitness application built with **React (TypeScript)**, **Spring Boot**, **MySQL**, and **Clerk Authentication**. This app provides personalized fitness tracking, BMI calculations, workout plans, diet management, and progress monitoring.

## ✨ Features

### 📱 **Page 1: Welcome/Onboarding Screen**
- Sleek onboarding with interactive carousel
- 3 feature slides explaining core functionality
- Modern gradient background with animations
- Clerk authentication integration

### 👤 **Page 2: User Profile Setup**
- Multi-step form with progress indicator
- **Step 1**: Basic Info (Name, Age, Gender, Weight, Height)
- **Step 2**: Fitness Goals (Lose Weight, Build Muscle, Stay Fit)
- **Step 3**: Focus Areas (Abs, Arms, Chest, Back, Legs, Full Body)
- **Step 4**: Preferences (Home/Gym/Both workouts, Diet type)

### 📊 **Page 3: BMI & Dashboard Overview**
- Real-time BMI calculation with visual gauge
- Color-coded BMI categories (Underweight, Normal, Overweight, Obese)
- Today's overview cards (Calories consumed/burned, Workout status, Water intake)
- Quick action buttons for navigation
- Motivational quotes

### 🍽️ **Page 4: Diet Plan** (Placeholder)
- Meal planning interface with tabs
- Diet type selector (Veg, Non-Veg, Vegan)
- Calorie and macro tracking

### 🏋️ **Page 5: Workout Plan** (Placeholder)
- Exercise cards with difficulty levels
- Home/Gym workout toggles
- Exercise demonstrations

### 📈 **Page 6: Progress Tracker** (Placeholder)
- Visual progress charts
- Weight progress tracking
- Workout completion analytics

### 🔔 **Page 7: Reminders & Notifications** (Placeholder)
- Meal reminders
- Workout notifications
- Water intake alerts

### ⚙️ **Page 8: Settings/Profile** (Placeholder)
- Profile management
- App preferences
- Account settings

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **Clerk** for authentication
- **Axios** for API calls
- **React Router DOM** for routing

### Backend
- **Spring Boot 3.2.0**
- **Spring Security**
- **Spring Data JPA**
- **MySQL 8.0**
- **Maven** for dependency management

### Database
- **MySQL** with JPA entities
- User profiles, BMI records, progress tracking

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **Java 17** or higher
- **MySQL 8.0**
- **Maven 3.6+**
- **Clerk Account** (for authentication)



## 📱 App Flow

1. **Onboarding**: Users land on a beautiful carousel-based welcome screen
2. **Authentication**: Sign up/sign in via Clerk
3. **Profile Setup**: Complete 4-step profile configuration
4. **Dashboard**: View BMI, daily progress, and quick actions
5. **Navigation**: Access diet plans, workouts, progress tracking, and settings

## 🗄️ Database Schema

### Users Table
- `id` (Primary Key)
- `email` (Unique)
- `name`, `age`, `gender`
- `weight`, `height`
- `fitness_goal`, `workout_preference`, `diet_preference`
- `focus_areas` (JSON array)
- `created_at`, `updated_at`

### BMI Records Table
- `id`, `user_id` (Foreign Key)
- `weight`, `height`, `bmi_value`
- `category`, `min_healthy_weight`, `max_healthy_weight`
- `calculated_at`

### Progress Records Table
- `id`, `user_id` (Foreign Key)
- `date`, `calories_consumed`, `calories_burned`
- `workout_completed`, `water_intake`, `meals_completed`
- `current_weight`, `created_at`, `updated_at`

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern Animations**: Framer Motion for smooth transitions
- **Color-coded BMI**: Visual feedback for health metrics
- **Interactive Elements**: Hover effects and micro-interactions
- **Gradient Backgrounds**: Beautiful visual appeal
- **Card-based Layout**: Clean and organized interface

## 🔧 API Endpoints

### User Management
- `POST /api/users/register` - Register new user
- `GET /api/users/{id}` - Get user by ID
- `GET /api/users/email/{email}` - Get user by email
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

### BMI Management
- `POST /api/bmi/calculate/{userId}` - Calculate and save BMI
- `GET /api/bmi/user/{userId}` - Get BMI history
- `GET /api/bmi/latest/{userId}` - Get latest BMI
- `POST /api/bmi/quick-calculate` - Quick BMI calculation

### Progress Tracking
- `POST /api/progress/update/{userId}` - Update progress
- `GET /api/progress/user/{userId}` - Get user progress
- `GET /api/progress/user/{userId}/today` - Get today's progress
- `GET /api/progress/user/{userId}/stats` - Get user statistics

## 🔐 Security

- **Clerk Authentication**: Secure user management
- **CORS Configuration**: Properly configured for frontend-backend communication
- **Input Validation**: Server-side validation for all inputs
- **JWT Tokens**: Secure API authentication

## 🚀 Deployment

### Backend (Spring Boot)
1. Build the application: `mvn clean package`
2. Deploy the JAR file to your server
3. Ensure MySQL is accessible
4. Set environment variables for production

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💡 Future Enhancements

- [ ] Complete diet plan functionality with meal database
- [ ] Workout video integration
- [ ] Social features and community challenges
- [ ] Advanced analytics and insights
- [ ] Offline mode support
- [ ] Push notifications
- [ ] Multi-language support

## 🐛 Known Issues

- Diet plan, workout plan, progress tracker, notifications, and settings pages are currently placeholders
- Limited exercise database



**Built with ❤️ for fitness enthusiasts everywhere!**
