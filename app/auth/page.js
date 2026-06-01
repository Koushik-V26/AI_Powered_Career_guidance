'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Lock,
  Eye,
  EyeOff,
  Brain 
} from 'lucide-react'

export default function AuthPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  
  const [authData, setAuthData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [onboardingData, setOnboardingData] = useState({
    fullName: '',
    phone: '',
    location: '',
    age: '',
    currentStatus: 'student'
  })

  // ✅ Clears all previous user's progress data from localStorage
  const clearPreviousUserData = () => {
    const keysToRemove = [
      'assessmentResults',
      'performanceData',
      'resumeAnalysis',
      'skillGapAnalysis',
      'onboardingData',
      'skillGapData'
    ]
    keysToRemove.forEach(key => localStorage.removeItem(key))
  }

  const handleAuthChange = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value })
  }

  const handleOnboardingChange = (e) => {
    setOnboardingData({ ...onboardingData, [e.target.name]: e.target.value })
  }

  const handleAuthSubmit = () => {
    if (isLogin) {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const user = users.find(u => u.email === authData.email && u.password === authData.password)
      
      if (user) {
        // ✅ Clear previous user's data before setting new user
        clearPreviousUserData()
        localStorage.setItem('currentUser', JSON.stringify(user))
        router.push('/')
      } else {
        alert('Invalid email or password')
      }
    } else {
      if (authData.password !== authData.confirmPassword) {
        alert('Passwords do not match')
        return
      }
      
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      if (users.find(u => u.email === authData.email)) {
        alert('User already exists with this email')
        return
      }
      
      setCurrentStep(2)
    }
  }

  const handleOnboardingSubmit = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const newUser = {
      id: Date.now().toString(),
      email: authData.email,
      password: authData.password,
      ...onboardingData,
      createdAt: new Date().toISOString()
    }
    
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))

    // ✅ Clear any previous user's data before setting new user
    clearPreviousUserData()
    localStorage.setItem('currentUser', JSON.stringify(newUser))
    // ✅ Save onboarding data for the new user
    localStorage.setItem('onboardingData', JSON.stringify({
      ...onboardingData,
      completedAt: new Date().toISOString()
    }))
    
    router.push('/')
  }

  const statusOptions = [
    { value: 'student', label: 'Student' },
    { value: 'working', label: 'Currently Working' },
    { value: 'unemployed', label: 'Looking for Job' },
    { value: 'career_change', label: 'Career Change' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
              <Brain className="text-white" size={28} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">AI Career Guide</h1>
          </div>
          
          {currentStep === 1 ? (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {isLogin ? 'Welcome Back!' : 'Join Us Today!'}
              </h2>
              <p className="text-gray-600">
                {isLogin 
                  ? 'Sign in to continue your career journey' 
                  : 'Create your account to get personalized career guidance'
                }
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Tell Us About Yourself
              </h2>
              <p className="text-gray-600">
                Help us provide you with personalized career recommendations
              </p>
            </>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {currentStep === 1 ? (
            <>
              <div className="flex mb-8">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-3 px-4 text-center font-medium rounded-l-lg transition-colors ${
                    isLogin 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-3 px-4 text-center font-medium rounded-r-lg transition-colors ${
                    !isLogin 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={authData.email}
                    onChange={handleAuthChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Lock className="w-4 h-4 inline mr-2" />
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      required
                      value={authData.password}
                      onChange={handleAuthChange}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Lock className="w-4 h-4 inline mr-2" />
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        required
                        value={authData.confirmPassword}
                        onChange={handleAuthChange}
                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleAuthSubmit}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {isLogin ? 'Sign In' : 'Continue to Profile Setup'}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              {isLogin && (
                <div className="mt-6 text-center">
                  <p className="text-gray-600">
                    Don't have an account?{' '}
                    <button
                      onClick={() => setIsLogin(false)}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Sign up here
                    </button>
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={onboardingData.fullName}
                  onChange={handleOnboardingChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={onboardingData.phone}
                  onChange={handleOnboardingChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={onboardingData.location}
                  onChange={handleOnboardingChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="City, State/Country"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  min="16"
                  max="100"
                  value={onboardingData.age}
                  onChange={handleOnboardingChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your age"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Status *
                </label>
                <select
                  name="currentStatus"
                  required
                  value={onboardingData.currentStatus}
                  onChange={handleOnboardingChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleOnboardingSubmit}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Complete Setup
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}