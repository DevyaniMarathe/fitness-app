import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ScaleIcon, 
  FlameIcon, 
  ActivityIcon,
  TargetIcon,
  CalendarIcon,
  MenuIcon,
  LogOutIcon
} from 'lucide-react';

interface BMIData {
  bmiValue: number;
  category: string;
  minHealthyWeight: number;
  maxHealthyWeight: number;
}

interface TodayProgress {
  caloriesConsumed: number;
  caloriesBurned: number;
  workoutCompleted: boolean;
  waterIntake: number;
  mealsCompleted: number;
}

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [bmiData] = useState<BMIData>({
    bmiValue: 23.5,
    category: 'NORMAL',
    minHealthyWeight: 58.5,
    maxHealthyWeight: 78.9
  });
  const [todayProgress] = useState<TodayProgress>({
    caloriesConsumed: 1250,
    caloriesBurned: 450,
    workoutCompleted: false,
    waterIntake: 6,
    mealsCompleted: 2
  });
  const [userData] = useState({ name: 'John Doe' });
  const [showMenu, setShowMenu] = useState(false);
  const [loading] = useState(false);

  const getBMIColor = (category: string) => {
    switch (category) {
      case 'UNDERWEIGHT': return 'text-blue-500';
      case 'NORMAL': return 'text-green-500';
      case 'OVERWEIGHT': return 'text-yellow-500';
      case 'OBESE': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getBMIGaugeColor = (category: string) => {
    switch (category) {
      case 'UNDERWEIGHT': return 'stroke-blue-500';
      case 'NORMAL': return 'stroke-green-500';
      case 'OVERWEIGHT': return 'stroke-yellow-500';
      case 'OBESE': return 'stroke-red-500';
      default: return 'stroke-gray-500';
    }
  };

  const calculateBMIGaugeAngle = (bmi: number) => {
    // BMI gauge from 15 to 40, mapped to 180 degrees
    const minBMI = 15;
    const maxBMI = 40;
    const clampedBMI = Math.max(minBMI, Math.min(maxBMI, bmi));
    return ((clampedBMI - minBMI) / (maxBMI - minBMI)) * 180;
  };

  const formatCategoryName = (category: string) => {
    switch (category) {
      case 'UNDERWEIGHT': return 'Underweight';
      case 'NORMAL': return 'Normal Weight';
      case 'OVERWEIGHT': return 'Overweight';
      case 'OBESE': return 'Obese';
      default: return category;
    }
  };

  const handleSignOut = () => {
    navigate('/');
  };

  const navigateToPage = (path: string) => {
    navigate(path);
    setShowMenu(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-800">
              Welcome, {userData?.name?.split(' ')[0] || 'User'}! 👋
            </h1>
            <p className="text-sm text-gray-600">Let's crush your fitness goals today</p>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
            
            {/* Dropdown Menu */}
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border z-50"
              >
                <div className="py-2">
                  <button onClick={() => navigateToPage('/diet-plan')} className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors">
                    Diet Plan
                  </button>
                  <button onClick={() => navigateToPage('/workout-plan')} className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors">
                    Workout Plan
                  </button>
                  <button onClick={() => navigateToPage('/progress')} className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors">
                    Progress Tracker
                  </button>
                  <button onClick={() => navigateToPage('/notifications')} className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors">
                    Notifications
                  </button>
                  <button onClick={() => navigateToPage('/settings')} className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors">
                    Settings
                  </button>
                  <hr className="my-2" />
                  <button onClick={handleSignOut} className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2">
                    <LogOutIcon className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* BMI Card */}
        {bmiData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
          >
            <div className="text-center mb-4">
              <h2 className="text-lg font-bold text-gray-800 mb-2">Your BMI Score</h2>
              
              {/* BMI Gauge */}
              <div className="relative w-48 h-24 mx-auto mb-4">
                <svg viewBox="0 0 200 100" className="w-full h-full">
                  {/* Background arc */}
                  <path
                    d="M 20 80 A 80 80 0 0 1 180 80"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                  />
                  {/* BMI color segments */}
                  <path d="M 20 80 A 80 80 0 0 1 60 30" fill="none" stroke="#3b82f6" strokeWidth="8" opacity="0.3" />
                  <path d="M 60 30 A 80 80 0 0 1 100 20" fill="none" stroke="#22c55e" strokeWidth="8" opacity="0.3" />
                  <path d="M 100 20 A 80 80 0 0 1 140 30" fill="none" stroke="#f59e0b" strokeWidth="8" opacity="0.3" />
                  <path d="M 140 30 A 80 80 0 0 1 180 80" fill="none" stroke="#ef4444" strokeWidth="8" opacity="0.3" />
                  
                  {/* Active indicator */}
                  <path
                    d="M 20 80 A 80 80 0 0 1 180 80"
                    fill="none"
                    className={getBMIGaugeColor(bmiData.category)}
                    strokeWidth="8"
                    strokeDasharray={`${calculateBMIGaugeAngle(bmiData.bmiValue) * 2.51} 628`}
                    transform="rotate(-180 100 50)"
                  />
                  
                  {/* Needle */}
                  <line
                    x1="100"
                    y1="80"
                    x2={100 + 60 * Math.cos((calculateBMIGaugeAngle(bmiData.bmiValue) - 90) * Math.PI / 180)}
                    y2={80 + 60 * Math.sin((calculateBMIGaugeAngle(bmiData.bmiValue) - 90) * Math.PI / 180)}
                    stroke="#374151"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle cx="100" cy="80" r="4" fill="#374151" />
                </svg>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800 mb-1">{bmiData.bmiValue}</div>
                <div className={`text-lg font-semibold mb-2 ${getBMIColor(bmiData.category)}`}>
                  {formatCategoryName(bmiData.category)}
                </div>
                <div className="text-sm text-gray-600">
                  Healthy weight range: {bmiData.minHealthyWeight.toFixed(1)} - {bmiData.maxHealthyWeight.toFixed(1)} kg
                </div>
              </div>
              
              <button
                onClick={() => navigate('/profile-setup')}
                className="mt-4 bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-xl text-sm font-medium transition-colors"
              >
                Update Goal
              </button>
            </div>
          </motion.div>
        )}

        {/* Today's Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <CalendarIcon className="w-5 h-5 mr-2" />
            Today's Overview
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-xl">
              <FlameIcon className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{todayProgress.caloriesConsumed || 0}</div>
              <div className="text-sm text-gray-600">Calories Eaten</div>
            </div>
            
            <div className="text-center p-3 bg-orange-50 rounded-xl">
              <ActivityIcon className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{todayProgress.caloriesBurned || 0}</div>
              <div className="text-sm text-gray-600">Calories Burned</div>
            </div>
            
            <div className="text-center p-3 bg-blue-50 rounded-xl">
              <TargetIcon className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">
                {todayProgress.workoutCompleted ? 'Done' : 'Pending'}
              </div>
              <div className="text-sm text-gray-600">Workout</div>
            </div>
            
            <div className="text-center p-3 bg-purple-50 rounded-xl">
              <ScaleIcon className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{todayProgress.waterIntake || 0}</div>
              <div className="text-sm text-gray-600">Glasses Water</div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h2>
          
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate('/diet-plan')}
              className="p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors text-center"
            >
              <div className="text-2xl mb-2">🍎</div>
              <div className="font-medium text-gray-800">Diet Plan</div>
            </button>
            
            <button
              onClick={() => navigate('/workout-plan')}
              className="p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors text-center"
            >
              <div className="text-2xl mb-2">💪</div>
              <div className="font-medium text-gray-800">Workouts</div>
            </button>
            
            <button
              onClick={() => navigate('/progress')}
              className="p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors text-center"
            >
              <div className="text-2xl mb-2">📊</div>
              <div className="font-medium text-gray-800">Progress</div>
            </button>
            
            <button
              onClick={() => navigate('/notifications')}
              className="p-4 bg-yellow-50 hover:bg-yellow-100 rounded-xl transition-colors text-center"
            >
              <div className="text-2xl mb-2">🔔</div>
              <div className="font-medium text-gray-800">Reminders</div>
            </button>
          </div>
        </motion.div>

        {/* Motivational Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-center"
        >
          <div className="text-2xl mb-2">💫</div>
          <p className="font-medium mb-2">"Success is the sum of small efforts repeated day in and day out."</p>
          <p className="text-sm opacity-90">- Robert Collier</p>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
