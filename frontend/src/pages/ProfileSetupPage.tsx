import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon, UserIcon, TargetIcon, ActivityIcon, HomeIcon } from 'lucide-react';

interface FormData {
  name: string;
  age: number;
  gender: string;
  weight: number;
  height: number;
  fitnessGoal: string;
  focusAreas: string[];
  workoutPreference: string;
  dietPreference: string;
}

const ProfileSetupPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: 25,
    gender: 'MALE',
    weight: 70,
    height: 170,
    fitnessGoal: 'LOSE_WEIGHT',
    focusAreas: [],
    workoutPreference: 'HOME',
    dietPreference: 'VEG'
  });

  const steps = [
    { title: 'Basic Info', icon: <UserIcon className="w-6 h-6" />, fields: ['name', 'age', 'gender', 'weight', 'height'] },
    { title: 'Fitness Goals', icon: <TargetIcon className="w-6 h-6" />, fields: ['fitnessGoal'] },
    { title: 'Focus Areas', icon: <ActivityIcon className="w-6 h-6" />, fields: ['focusAreas'] },
    { title: 'Preferences', icon: <HomeIcon className="w-6 h-6" />, fields: ['workoutPreference', 'dietPreference'] }
  ];

  const fitnessGoals = [
    { value: 'LOSE_WEIGHT', label: 'Lose Weight', emoji: '⚖️', description: 'Burn fat and achieve your ideal weight' },
    { value: 'BUILD_MUSCLE', label: 'Build Muscle', emoji: '💪', description: 'Gain strength and build lean muscle' },
    { value: 'STAY_FIT', label: 'Stay Fit', emoji: '🏃', description: 'Maintain current fitness and health' }
  ];

  const focusAreaOptions = [
    { value: 'ABS', label: 'Abs', emoji: '🔥' },
    { value: 'ARMS', label: 'Arms', emoji: '💪' },
    { value: 'CHEST', label: 'Chest', emoji: '💯' },
    { value: 'BACK', label: 'Back', emoji: '🏋️' },
    { value: 'LEGS', label: 'Legs', emoji: '🦵' },
    { value: 'FULL_BODY', label: 'Full Body', emoji: '🤸' }
  ];

  const workoutOptions = [
    { value: 'HOME', label: 'Home Workout', emoji: '🏠', description: 'Exercise from comfort of your home' },
    { value: 'GYM', label: 'Gym Workout', emoji: '🏋️‍♂️', description: 'Train with professional equipment' },
    { value: 'BOTH', label: 'Both', emoji: '🔄', description: 'Flexible workout options' }
  ];

  const dietOptions = [
    { value: 'VEG', label: 'Vegetarian', emoji: '🥬' },
    { value: 'NON_VEG', label: 'Non-Vegetarian', emoji: '🍖' },
    { value: 'VEGAN', label: 'Vegan', emoji: '🌱' }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleFocusArea = (area: string) => {
    setFormData(prev => ({
      ...prev,
      focusAreas: prev.focusAreas.includes(area)
        ? prev.focusAreas.filter(a => a !== area)
        : [...prev.focusAreas, area]
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // For demo purposes, just navigate to dashboard
      // In production, save formData to API
      console.log('Profile data:', formData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const isStepValid = () => {
    const currentFields = steps[currentStep].fields;
    return currentFields.every(field => {
      if (field === 'focusAreas') return formData.focusAreas.length > 0;
      return formData[field as keyof FormData] !== '';
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="input-field"
                placeholder="Enter your full name"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                  className="input-field"
                  min="1"
                  max="120"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="input-field"
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', parseFloat(e.target.value))}
                  className="input-field"
                  min="1"
                  max="500"
                  step="0.1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => handleInputChange('height', parseFloat(e.target.value))}
                  className="input-field"
                  min="50"
                  max="300"
                  step="0.1"
                />
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center mb-6">What's your fitness goal?</h3>
            {fitnessGoals.map((goal) => (
              <motion.div
                key={goal.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleInputChange('fitnessGoal', goal.value)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  formData.fitnessGoal === goal.value
                    ? 'border-primary-500 bg-primary-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <span className="text-3xl">{goal.emoji}</span>
                  <div>
                    <h4 className="font-semibold">{goal.label}</h4>
                    <p className="text-sm text-gray-600">{goal.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center mb-6">Which areas do you want to focus on?</h3>
            <div className="grid grid-cols-2 gap-3">
              {focusAreaOptions.map((area) => (
                <motion.div
                  key={area.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleFocusArea(area.value)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    formData.focusAreas.includes(area.value)
                      ? 'border-secondary-500 bg-secondary-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <span className="text-2xl block mb-2">{area.emoji}</span>
                    <span className="font-medium">{area.label}</span>
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="text-sm text-gray-500 text-center">
              Select multiple areas that you'd like to focus on
            </p>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-center mb-4">Workout Preference</h3>
              {workoutOptions.map((option) => (
                <motion.div
                  key={option.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleInputChange('workoutPreference', option.value)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all mb-3 ${
                    formData.workoutPreference === option.value
                      ? 'border-accent-500 bg-accent-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">{option.emoji}</span>
                    <div>
                      <h4 className="font-semibold">{option.label}</h4>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-center mb-4">Diet Preference</h3>
              <div className="grid grid-cols-3 gap-3">
                {dietOptions.map((diet) => (
                  <motion.div
                    key={diet.value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleInputChange('dietPreference', diet.value)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      formData.dietPreference === diet.value
                        ? 'border-secondary-500 bg-secondary-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <span className="text-2xl block mb-2">{diet.emoji}</span>
                      <span className="font-medium text-sm">{diet.label}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto px-4">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Profile Setup</h1>
            <span className="text-sm text-gray-500">
              {currentStep + 1} of {steps.length}
            </span>
          </div>
          
          <div className="flex space-x-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  index <= currentStep ? 'bg-primary-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step Indicator */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="card mb-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-primary-100 rounded-xl text-primary-600">
              {steps[currentStep].icon}
            </div>
            <h2 className="text-xl font-bold text-gray-800">
              {steps[currentStep].title}
            </h2>
          </div>

          {renderStepContent()}
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex space-x-4">
          {currentStep > 0 && (
            <button
              onClick={prevStep}
              className="flex items-center space-x-2 btn-secondary flex-1"
            >
              <ChevronLeftIcon className="w-5 h-5" />
              <span>Previous</span>
            </button>
          )}
          
          {currentStep < steps.length - 1 ? (
            <button
              onClick={nextStep}
              disabled={!isStepValid()}
              className="flex items-center space-x-2 btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Next</span>
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!isStepValid() || loading}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Setting up...' : 'Complete Setup'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSetupPage;
