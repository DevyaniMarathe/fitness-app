import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

const OnboardingPage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselData = [
    {
      title: "Calculate BMI & Set Goals",
      description: "Get accurate BMI calculations and set personalized fitness goals tailored to your body type and aspirations.",
      icon: "🎯",
      gradient: "from-blue-400 to-purple-600"
    },
    {
      title: "Custom Workout & Diet Plans",
      description: "Receive personalized workout routines and nutrition plans designed specifically for your fitness level and preferences.",
      icon: "💪",
      gradient: "from-green-400 to-blue-600"
    },
    {
      title: "Track Progress Daily",
      description: "Monitor your daily progress with insightful analytics, track calories, workouts, and achieve your fitness milestones.",
      icon: "📊",
      gradient: "from-orange-400 to-pink-600"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselData.length) % carouselData.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            Fitness<span className="text-accent-500">Hub</span>
          </h1>
          <p className="text-lg text-gray-200 font-medium">
            Your Personalized Fitness Journey Starts Here
          </p>
        </motion.div>

        {/* Carousel Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20"
        >
          <div className="relative overflow-hidden rounded-xl">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className={`text-6xl mb-4 animate-bounce-subtle`}>
                {carouselData[currentSlide].icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {carouselData[currentSlide].title}
              </h3>
              <p className="text-gray-200 text-sm leading-relaxed">
                {carouselData[currentSlide].description}
              </p>
            </motion.div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors p-1"
              aria-label="Previous slide"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors p-1"
              aria-label="Next slide"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center space-x-2 mt-4">
            {carouselData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentSlide
                    ? 'bg-accent-500 scale-110'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-4"
        >
          <button className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg">
            Get Started - Sign Up
          </button>
          
          <button className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 hover:bg-white/20 hover:scale-105">
            Already have an account? Log In
          </button>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-8 text-gray-300 text-sm"
        >
          Transform your body, transform your life
        </motion.div>
      </div>
    </div>
  );
};

export default OnboardingPage;
