import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeftIcon,
  PlayIcon,
  ClockIcon,
  FlameIcon,
  TrendingUpIcon,
  HomeIcon,
  Building2Icon,
  CheckIcon,
  StarIcon
} from 'lucide-react';

interface Exercise {
  id: number;
  name: string;
  bodyPart: string;
  duration: string;
  reps?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  calories: number;
  image: string;
  completed: boolean;
  description: string;
}

interface WorkoutDay {
  day: string;
  focus: string;
  emoji: string;
  exercises: Exercise[];
  completed: boolean;
}

type WorkoutType = 'home' | 'gym';

const WorkoutPlanPage: React.FC = () => {
  const navigate = useNavigate();
  const [workoutType, setWorkoutType] = useState<WorkoutType>('home');
  const [selectedDay, setSelectedDay] = useState(0);

  const workoutSchedule: WorkoutDay[] = [
    {
      day: 'Monday',
      focus: 'Chest & Triceps',
      emoji: '💪',
      completed: true,
      exercises: [
        {
          id: 1,
          name: 'Push-ups',
          bodyPart: 'Chest',
          duration: '3 sets',
          reps: '12-15 reps',
          difficulty: 'Beginner',
          calories: 50,
          image: '💪',
          completed: true,
          description: 'Classic push-up targeting chest and triceps'
        },
        {
          id: 2,
          name: 'Tricep Dips',
          bodyPart: 'Triceps',
          duration: '3 sets',
          reps: '10-12 reps',
          difficulty: 'Intermediate',
          calories: 40,
          image: '🏋️',
          completed: true,
          description: 'Dips using a chair or bench'
        },
        {
          id: 3,
          name: 'Diamond Push-ups',
          bodyPart: 'Triceps',
          duration: '2 sets',
          reps: '8-10 reps',
          difficulty: 'Advanced',
          calories: 45,
          image: '💎',
          completed: false,
          description: 'Advanced push-up variation'
        }
      ]
    },
    {
      day: 'Tuesday',
      focus: 'Back & Biceps',
      emoji: '🔥',
      completed: false,
      exercises: [
        {
          id: 4,
          name: 'Pull-ups',
          bodyPart: 'Back',
          duration: '3 sets',
          reps: '6-10 reps',
          difficulty: 'Intermediate',
          calories: 60,
          image: '🎯',
          completed: false,
          description: 'Great for building back strength'
        },
        {
          id: 5,
          name: 'Resistance Band Rows',
          bodyPart: 'Back',
          duration: '3 sets',
          reps: '12-15 reps',
          difficulty: 'Beginner',
          calories: 35,
          image: '🔗',
          completed: false,
          description: 'Using resistance bands for rows'
        }
      ]
    },
    {
      day: 'Wednesday',
      focus: 'Legs & Glutes',
      emoji: '🦵',
      completed: false,
      exercises: [
        {
          id: 6,
          name: 'Squats',
          bodyPart: 'Legs',
          duration: '3 sets',
          reps: '15-20 reps',
          difficulty: 'Beginner',
          calories: 70,
          image: '⬇️',
          completed: false,
          description: 'Fundamental leg exercise'
        },
        {
          id: 7,
          name: 'Lunges',
          bodyPart: 'Legs',
          duration: '3 sets',
          reps: '10 each leg',
          difficulty: 'Intermediate',
          calories: 55,
          image: '🚶',
          completed: false,
          description: 'Alternating forward lunges'
        }
      ]
    },
    {
      day: 'Thursday',
      focus: 'Shoulders & Abs',
      emoji: '🏆',
      completed: false,
      exercises: [
        {
          id: 8,
          name: 'Shoulder Press',
          bodyPart: 'Shoulders',
          duration: '3 sets',
          reps: '12-15 reps',
          difficulty: 'Intermediate',
          calories: 45,
          image: '🔝',
          completed: false,
          description: 'Overhead shoulder press'
        },
        {
          id: 9,
          name: 'Plank',
          bodyPart: 'Core',
          duration: '3 sets',
          reps: '30-60 sec',
          difficulty: 'Beginner',
          calories: 25,
          image: '🛡️',
          completed: false,
          description: 'Hold plank position'
        }
      ]
    },
    {
      day: 'Friday',
      focus: 'Cardio & Full Body',
      emoji: '❤️',
      completed: false,
      exercises: [
        {
          id: 10,
          name: 'Burpees',
          bodyPart: 'Full Body',
          duration: '3 sets',
          reps: '8-12 reps',
          difficulty: 'Advanced',
          calories: 80,
          image: '💥',
          completed: false,
          description: 'Full body explosive movement'
        },
        {
          id: 11,
          name: 'Jumping Jacks',
          bodyPart: 'Cardio',
          duration: '3 sets',
          reps: '20-30 reps',
          difficulty: 'Beginner',
          calories: 40,
          image: '🤸',
          completed: false,
          description: 'Classic cardio exercise'
        }
      ]
    }
  ];

  const [schedule, setSchedule] = useState(workoutSchedule);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700 border-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const toggleExerciseCompleted = (dayIndex: number, exerciseId: number) => {
    setSchedule(prev => prev.map((day, index) => {
      if (index === dayIndex) {
        const updatedExercises = day.exercises.map(exercise => 
          exercise.id === exerciseId 
            ? { ...exercise, completed: !exercise.completed }
            : exercise
        );
        return { 
          ...day, 
          exercises: updatedExercises,
          completed: updatedExercises.every(ex => ex.completed)
        };
      }
      return day;
    }));
  };

  const getTotalCaloriesForDay = (dayIndex: number) => {
    return schedule[dayIndex].exercises
      .filter(ex => ex.completed)
      .reduce((total, ex) => total + ex.calories, 0);
  };

  const getWorkoutStreak = () => {
    return schedule.filter(day => day.completed).length;
  };

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
                <h1 className="text-xl font-bold text-gray-800">Workout Plan</h1>
                <p className="text-sm text-gray-600">Week 1 - Day {selectedDay + 1}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-primary-500">{getWorkoutStreak()}/5</div>
              <div className="text-xs text-gray-600">Days Complete</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Workout Type Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <h2 className="text-lg font-bold text-gray-800 mb-4">Workout Location</h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setWorkoutType('home')}
              className={`p-4 rounded-xl border transition-all flex items-center space-x-3 ${
                workoutType === 'home'
                  ? 'border-primary-500 bg-primary-50 shadow-sm'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <HomeIcon className="w-6 h-6" />
              <div className="text-left">
                <div className="font-semibold">Home</div>
                <div className="text-sm text-gray-600">No equipment</div>
              </div>
            </button>
            <button
              onClick={() => setWorkoutType('gym')}
              className={`p-4 rounded-xl border transition-all flex items-center space-x-3 ${
                workoutType === 'gym'
                  ? 'border-primary-500 bg-primary-50 shadow-sm'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Building2Icon className="w-6 h-6" />
              <div className="text-left">
                <div className="font-semibold">Gym</div>
                <div className="text-sm text-gray-600">Full equipment</div>
              </div>
            </button>
          </div>
        </motion.div>

        {/* Weekly Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-lg font-bold text-gray-800 mb-4">Weekly Schedule</h2>
          <div className="space-y-2">
            {schedule.map((day, index) => (
              <button
                key={day.day}
                onClick={() => setSelectedDay(index)}
                className={`w-full p-4 rounded-xl border transition-all text-left ${
                  selectedDay === index
                    ? 'border-primary-500 bg-primary-50 shadow-sm'
                    : day.completed
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{day.emoji}</div>
                    <div>
                      <div className="font-semibold flex items-center space-x-2">
                        <span>{day.day}</span>
                        {day.completed && <CheckIcon className="w-4 h-4 text-green-500" />}
                      </div>
                      <div className="text-sm text-gray-600">{day.focus}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{day.exercises.length} exercises</div>
                    <div className="text-xs text-gray-500">{getTotalCaloriesForDay(index)} cal burned</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Today's Workout */}
        <motion.div
          key={selectedDay}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">Today's Exercises</h2>
            <div className="flex items-center space-x-2">
              <StarIcon className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-gray-600">{schedule[selectedDay].focus}</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {schedule[selectedDay].exercises.map((exercise, index) => (
              <motion.div
                key={exercise.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`card transition-all ${
                  exercise.completed ? 'bg-green-50 border-green-200' : ''
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{exercise.image}</div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className={`font-semibold text-lg ${
                          exercise.completed ? 'text-green-700 line-through' : 'text-gray-800'
                        }`}>
                          {exercise.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">{exercise.description}</p>
                      </div>
                      <button
                        onClick={() => toggleExerciseCompleted(selectedDay, exercise.id)}
                        className={`p-2 rounded-xl transition-colors ${
                          exercise.completed
                            ? 'bg-green-500 text-white'
                            : 'border border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <CheckIcon className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <ClockIcon className="w-4 h-4" />
                        <span>{exercise.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <TrendingUpIcon className="w-4 h-4" />
                        <span>{exercise.reps}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FlameIcon className="w-4 h-4 text-orange-500" />
                        <span>{exercise.calories} cal</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                          getDifficultyColor(exercise.difficulty)
                        }`}>
                          {exercise.difficulty}
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          {exercise.bodyPart}
                        </span>
                      </div>
                      <button className="flex items-center space-x-2 text-primary-500 hover:text-primary-600 text-sm font-medium">
                        <PlayIcon className="w-4 h-4" />
                        <span>Watch Demo</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Start Workout Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="sticky bottom-6"
        >
          <button className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-4 px-8 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center space-x-2">
            <PlayIcon className="w-5 h-5" />
            <span>Start Workout</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default WorkoutPlanPage;
