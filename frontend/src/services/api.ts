import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User API
export const userAPI = {
  register: (userData: any) => apiClient.post('/users/register', userData),
  getUserById: (id: number) => apiClient.get(`/users/${id}`),
  getUserByEmail: (email: string) => apiClient.get(`/users/email/${email}`),
  updateUser: (id: number, userData: any) => apiClient.put(`/users/${id}`, userData),
  deleteUser: (id: number) => apiClient.delete(`/users/${id}`),
};

// BMI API
export const bmiAPI = {
  calculateBMI: (userId: number, weight: number, height: number) => 
    apiClient.post(`/bmi/calculate/${userId}?weight=${weight}&height=${height}`),
  getUserBMIHistory: (userId: number) => apiClient.get(`/bmi/user/${userId}`),
  getLatestBMI: (userId: number) => apiClient.get(`/bmi/latest/${userId}`),
  quickCalculateBMI: (weight: number, height: number) => 
    apiClient.post(`/bmi/quick-calculate?weight=${weight}&height=${height}`),
};

// Progress API
export const progressAPI = {
  updateProgress: (userId: number, progressData: any) => 
    apiClient.post(`/progress/update/${userId}`, null, { params: progressData }),
  getUserProgress: (userId: number) => apiClient.get(`/progress/user/${userId}`),
  getTodayProgress: (userId: number) => apiClient.get(`/progress/user/${userId}/today`),
  getProgressByDateRange: (userId: number, startDate: string, endDate: string) => 
    apiClient.get(`/progress/user/${userId}/range?startDate=${startDate}&endDate=${endDate}`),
  getUserStats: (userId: number) => apiClient.get(`/progress/user/${userId}/stats`),
};

export default apiClient;
