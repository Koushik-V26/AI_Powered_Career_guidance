'use client'

import React, { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, Calendar, Target, Clock, Flame, Award, BarChart3, PieChartIcon } from 'lucide-react'

const ProgressTracker = ({ performanceData }) => {
  const [activeTab, setActiveTab] = useState('overview')

  const weeklyProgressData = [
    { day: 'Mon', hours: 2, completed: 3 },
    { day: 'Tue', hours: 1.5, completed: 2 },
    { day: 'Wed', hours: 3, completed: 4 },
    { day: 'Thu', hours: 2.5, completed: 3 },
    { day: 'Fri', hours: 1, completed: 1 },
    { day: 'Sat', hours: 4, completed: 5 },
    { day: 'Sun', hours: 2, completed: 2 }
  ]

  const skillProgressData = [
    { skill: 'Programming', progress: 85, target: 90 },
    { skill: 'Problem Solving', progress: 78, target: 85 },
    { skill: 'Communication', progress: 65, target: 75 },
    { skill: 'Project Management', progress: 45, target: 60 },
    { skill: 'Data Analysis', progress: 70, target: 80 }
  ]

  const monthlyTrends = [
    { month: 'Jan', learningHours: 32, skillsGained: 8, coursesCompleted: 2 },
    { month: 'Feb', learningHours: 28, skillsGained: 6, coursesCompleted: 1 },
    { month: 'Mar', learningHours: 45, skillsGained: 12, coursesCompleted: 3 },
    { month: 'Apr', learningHours: 38, skillsGained: 9, coursesCompleted: 2 }
  ]

  const goalDistribution = [
    { name: 'Completed', value: performanceData?.weeklyGoalProgress || 75, color: '#10b981' },
    { name: 'Remaining', value: 100 - (performanceData?.weeklyGoalProgress || 75), color: '#e5e7eb' }
  ]

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'weekly', name: 'Weekly', icon: Calendar },
    { id: 'skills', name: 'Skills', icon: Target },
    { id: 'trends', name: 'Trends', icon: TrendingUp }
  ]

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Goal Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between mb-2">
            <Target className="w-6 h-6" />
            <span className="text-2xl font-bold">{performanceData?.weeklyGoalProgress || 75}%</span>
          </div>
          <p className="text-sm opacity-90">Weekly Goal</p>
          <div className="w-full bg-blue-400 rounded-full h-2 mt-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-500"
              style={{ width: `${performanceData?.weeklyGoalProgress || 75}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between mb-2">
            <Flame className="w-6 h-6" />
            <span className="text-2xl font-bold">{performanceData?.currentStreak || 7}</span>
          </div>
          <p className="text-sm opacity-90">Current Streak</p>
          <p className="text-xs opacity-75 mt-1">
            Best: {performanceData?.longestStreak || 12} days
          </p>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between mb-2">
            <Award className="w-6 h-6" />
            <span className="text-2xl font-bold">{performanceData?.achievementsUnlocked || 8}</span>
          </div>
          <p className="text-sm opacity-90">Achievements</p>
          <p className="text-xs opacity-75 mt-1">
            {(performanceData?.achievementsUnlocked || 8) + 2} more available
          </p>
        </div>
      </div>

      {/* Weekly Goal Progress Pie Chart */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <PieChartIcon className="w-5 h-5 text-primary-600" />
          Weekly Goal Progress
        </h4>
        <div className="flex items-center justify-center">
          <ResponsiveContainer width={200} height={200}>
            <PieChart>
              <Pie
                data={goalDistribution}
                cx={100}
                cy={100}
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {goalDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="text-center mt-4">
          <p className="text-2xl font-bold text-gray-900">{performanceData?.weeklyGoalProgress || 75}%</p>
          <p className="text-gray-600">of weekly goal achieved</p>
        </div>
      </div>
    </div>
  )

  const renderWeeklyTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary-600" />
          Daily Learning Hours
        </h4>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={weeklyProgressData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="hours" fill="#3b82f6" radius={4} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-primary-600" />
          Tasks Completed Daily
        </h4>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={weeklyProgressData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="completed" 
              stroke="#10b981" 
              strokeWidth={3}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )

  const renderSkillsTab = () => (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <Target className="w-5 h-5 text-primary-600" />
        Skill Development Progress
      </h4>
      
      {skillProgressData.map((skill, index) => (
        <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-900">{skill.skill}</span>
            <span className="text-sm text-gray-600">{skill.progress}% / {skill.target}%</span>
          </div>
          
          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${skill.progress}%` }}
              ></div>
            </div>
            <div 
              className="absolute top-0 w-1 h-3 bg-gray-400 rounded"
              style={{ left: `${skill.target}%` }}
              title={`Target: ${skill.target}%`}
            ></div>
          </div>
          
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Current: {skill.progress}%</span>
            <span>Target: {skill.target}%</span>
          </div>
        </div>
      ))}
    </div>
  )

  const renderTrendsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary-600" />
          Monthly Learning Trends
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="learningHours" 
              stroke="#3b82f6" 
              strokeWidth={2}
              name="Learning Hours"
            />
            <Line 
              type="monotone" 
              dataKey="skillsGained" 
              stroke="#10b981" 
              strokeWidth={2}
              name="Skills Gained"
            />
            <Line 
              type="monotone" 
              dataKey="coursesCompleted" 
              stroke="#f59e0b" 
              strokeWidth={2}
              name="Courses Completed"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h5 className="font-medium text-green-900 mb-2">Best Performance</h5>
          <p className="text-sm text-green-800">
            March showed your highest learning activity with 45 hours and 12 new skills acquired.
          </p>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h5 className="font-medium text-blue-900 mb-2">Improvement Opportunity</h5>
          <p className="text-sm text-blue-800">
            Consider focusing on consistent daily practice to maintain steady progress.
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors
              ${activeTab === tab.id
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }
            `}
          >
            <tab.icon size={16} />
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="transition-all duration-300">
        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'weekly' && renderWeeklyTab()}
        {activeTab === 'skills' && renderSkillsTab()}
        {activeTab === 'trends' && renderTrendsTab()}
      </div>
    </div>
  )
}

export default ProgressTracker