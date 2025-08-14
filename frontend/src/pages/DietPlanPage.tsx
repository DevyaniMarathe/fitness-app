import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeftIcon,
  SettingsIcon,
  CheckCircleIcon,
  Circle,
  FlameIcon,
  Clock,
  Users
} from 'lucide-react';

interface Meal {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  image: string;
  time: string;
  servings: number;
  completed: boolean;
}

type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snacks';
type DietType = 'VEG' | 'NON_VEG' | 'VEGAN';

const DietPlanPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeMealType, setActiveMealType] = useState<MealType>('breakfast');
  const [dietType, setDietType] = useState<DietType>('VEG');

  // Sample meal data
  const meals: Record<MealType, Meal[]> = {
    breakfast: [
      {
        id: 1,
        name: 'Oatmeal with Berries',
        calories: 320,
        protein: 12,
        carbs: 54,
        fat: 8,
        image: '🥣',
        time: '8:00 AM',
        servings: 1,
        completed: true
      },
      {
        id: 2,
        name: 'Greek Yogurt Parfait',
        calories: 280,
        protein: 20,
        carbs: 35,
        fat: 6,
        image: '🥛',
        time: '8:30 AM',
        servings: 1,
        completed: false
      }
    ],
    lunch: [
      {
        id: 3,
        name: 'Grilled Chicken Salad',
        calories: 450,
        protein: 35,
        carbs: 25,
        fat: 22,
        image: '🥗',
        time: '1:00 PM',
        servings: 1,
        completed: false
      },
      {
        id: 4,
        name: 'Quinoa Bowl',
        calories: 380,
        protein: 16,
        carbs: 58,
        fat: 12,
        image: '🍲',
        time: '1:30 PM',
        servings: 1,
        completed: false
      }
    ],
    dinner: [
      {
        id: 5,
        name: 'Baked Salmon',
        calories: 420,
        protein: 40,
        carbs: 8,
        fat: 25,
        image: '🐟',
        time: '7:00 PM',
        servings: 1,
        completed: false
      },
      {
        id: 6,
        name: 'Steamed Vegetables',
        calories: 120,
        protein: 4,
        carbs: 24,
        fat: 2,
        image: '🥦',
        time: '7:15 PM',
        servings: 1,
        completed: false
      }
    ],
    snacks: [
      {
        id: 7,
        name: 'Mixed Nuts',
        calories: 180,
        protein: 6,
        carbs: 8,
        fat: 16,
        image: '🥜',
        time: '3:00 PM',
        servings: 1,
        completed: false
      },
      {
        id: 8,
        name: 'Apple with Peanut Butter',
        calories: 250,
        protein: 8,
        carbs: 32,
        fat: 12,
        image: '🍎',
        time: '5:00 PM',
        servings: 1,
        completed: false
      }
    ]
  };

  const [mealsData, setMealsData] = useState(meals);

  const mealTabs = [
    { id: 'breakfast', label: 'Breakfast', emoji: '🌅' },
    { id: 'lunch', label: 'Lunch', emoji: '☀️' },
    { id: 'dinner', label: 'Dinner', emoji: '🌙' },
    { id: 'snacks', label: 'Snacks', emoji: '🍿' }
  ];

  const dietOptions = [
    { value: 'VEG', label: 'Vegetarian', emoji: '🥬', color: 'bg-green-100 text-green-700' },
    { value: 'NON_VEG', label: 'Non-Veg', emoji: '🍖', color: 'bg-red-100 text-red-700' },
    { value: 'VEGAN', label: 'Vegan', emoji: '🌱', color: 'bg-emerald-100 text-emerald-700' }
  ];

  const toggleMealCompleted = (mealType: MealType, mealId: number) => {
    setMealsData(prev => ({
      ...prev,
      [mealType]: prev[mealType].map(meal =>
        meal.id === mealId ? { ...meal, completed: !meal.completed } : meal
      )
    }));
  };

  const getTotalCalories = () => {
    return Object.values(mealsData)
      .flat()
      .filter(meal => meal.completed)
      .reduce((total, meal) => total + meal.calories, 0);
  };

  const getTotalMacros = () => {
    const completedMeals = Object.values(mealsData)
      .flat()
      .filter(meal => meal.completed);
    
    return {
      protein: completedMeals.reduce((total, meal) => total + meal.protein, 0),
      carbs: completedMeals.reduce((total, meal) => total + meal.carbs, 0),
      fat: completedMeals.reduce((total, meal) => total + meal.fat, 0)
    };
  };

  const macros = getTotalMacros();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => navigate('/dashboard')}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <ArrowLeftIcon className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Diet Plan</h1>
                <p className="text-sm text-gray-600">Today's Nutrition</p>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <SettingsIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Daily Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">Today's Progress</h2>
            <div className="text-2xl">{getTotalCalories()}</div>
          </div>
          
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-orange-500">{getTotalCalories()}</div>
              <div className="text-xs text-gray-600">Calories</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-500">{macros.protein}g</div>
              <div className="text-xs text-gray-600">Protein</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-500">{macros.carbs}g</div>
              <div className="text-xs text-gray-600">Carbs</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-500">{macros.fat}g</div>
              <div className="text-xs text-gray-600">Fat</div>
            </div>
          </div>
        </motion.div>

        {/* Diet Type Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <h2 className="text-lg font-bold text-gray-800 mb-4">Diet Preference</h2>
          <div className="grid grid-cols-3 gap-2">
            {dietOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setDietType(option.value as DietType)}
                className={`p-3 rounded-xl border text-center transition-all ${
                  dietType === option.value
                    ? `${option.color} border-current shadow-sm`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-1">{option.emoji}</div>
                <div className="text-sm font-medium">{option.label}</div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Meal Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex bg-white rounded-xl p-1 shadow-sm border">
            {mealTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveMealType(tab.id as MealType)}
                className={`flex-1 py-3 px-2 rounded-lg text-center transition-all ${
                  activeMealType === tab.id
                    ? 'bg-primary-500 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <div className="text-lg mb-1">{tab.emoji}</div>
                <div className="text-xs font-medium">{tab.label}</div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Meals List */}
        <motion.div
          key={activeMealType}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {mealsData[activeMealType].map((meal, index) => (
            <motion.div
              key={meal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`card cursor-pointer transition-all ${
                meal.completed ? 'bg-green-50 border-green-200' : ''
              }`}
              onClick={() => toggleMealCompleted(activeMealType, meal.id)}
            >
              <div className="flex items-center space-x-4">
                <div className="text-4xl">{meal.image}</div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`font-semibold ${
                      meal.completed ? 'text-green-700 line-through' : 'text-gray-800'
                    }`}>
                      {meal.name}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{meal.time}</span>
                      </div>
                      {meal.completed ? (
                        <CheckCircleIcon className="w-6 h-6 text-green-500" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-300" />
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center space-x-1">
                      <FlameIcon className="w-4 h-4 text-orange-500" />
                      <span>{meal.calories} cal</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span>{meal.servings} serving</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4 text-xs">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                      P: {meal.protein}g
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full">
                      C: {meal.carbs}g
                    </span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                      F: {meal.fat}g
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Edit Preferences Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <button className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-shadow">
            Edit Meal Preferences
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default DietPlanPage;
