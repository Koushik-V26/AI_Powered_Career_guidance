'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Target, 
  TrendingUp, 
  BookOpen, 
  Clock, 
  Award, 
  MessageCircle,
  Calendar,
  CheckCircle,
  Play,
  ArrowRight,
  Brain,
  Star,
  Flame,
  Trophy,
  BarChart3,
  User,
  Zap,
  FileText,
  AlertCircle
} from 'lucide-react'
import RoadmapVisualizer from '../../components/RoadmapVisualizer'
import ProgressTracker from '../../components/ProgressTracker'
import AIMentor from '../../components/AIMentor'

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useState(null)
  const [onboardingData, setOnboardingData] = useState(null)
  const [userAnalysis, setUserAnalysis] = useState(null)
  const [resumeAnalysis, setResumeAnalysis] = useState(null)
  const [skillGapData, setSkillGapData] = useState(null)
  const [showMentor, setShowMentor] = useState(false)
  const [loading, setLoading] = useState(true)
  const [performanceData, setPerformanceData] = useState(null)
  const [dataSource, setDataSource] = useState('none') // 'assessment', 'resume', 'skill-gap', 'none'

  useEffect(() => {
    initializeDashboard()
  }, [])

  const initializeDashboard = () => {
    // Load current user (from auth)
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser))
    }

    // Load onboarding data (basic profile)
    const storedOnboarding = localStorage.getItem('onboardingData')
    if (storedOnboarding) {
      setOnboardingData(JSON.parse(storedOnboarding))
    }

    // Load analysis data in a prioritized order
    const storedSkillGap = localStorage.getItem('skillGapAnalysis')
    const storedResume = localStorage.getItem('resumeAnalysis')
    const storedAssessment = localStorage.getItem('assessmentResults')

    if (storedSkillGap) {
      const skillGapAnalysis = JSON.parse(storedSkillGap)
      setSkillGapData(skillGapAnalysis)
      setDataSource('skill-gap')
    } else if (storedResume) {
      const resumeData = JSON.parse(storedResume)
      setResumeAnalysis(resumeData)
      setDataSource('resume')
    } else if (storedAssessment) {
      const assessmentData = JSON.parse(storedAssessment)
      setUserAnalysis(assessmentData)
      setDataSource('assessment')
    }

    // Initialize or load performance data
    initializePerformanceData()
    setLoading(false)
  }

  const initializePerformanceData = () => {
    const storedPerformance = localStorage.getItem('performanceData')
    if (storedPerformance) {
      setPerformanceData(JSON.parse(storedPerformance))
    } else {
      const initialPerformance = generateInitialPerformanceData()
      setPerformanceData(initialPerformance)
      localStorage.setItem('performanceData', JSON.stringify(initialPerformance))
    }
  }

  const generateInitialPerformanceData = () => {
    const hasAssessment = !!localStorage.getItem('assessmentResults')
    const hasResume = !!localStorage.getItem('resumeAnalysis')
    const hasSkillGap = !!localStorage.getItem('skillGapAnalysis')
    
    let totalActivities = 1
    let completedActivities = 1
    let skillsAcquired = 5
    let learningHours = 2
    
    if (hasAssessment) {
      totalActivities += 1
      completedActivities += 1
      skillsAcquired += 3
      learningHours += 8
    }
    
    if (hasResume) {
      totalActivities += 1
      completedActivities += 1
      skillsAcquired += 5
      learningHours += 5
    }
    
    if (hasSkillGap) {
      totalActivities += 1
      completedActivities += 1
      skillsAcquired += 2
      learningHours += 10
    }

    return {
      currentStreak: Math.min(7, completedActivities * 2),
      longestStreak: Math.min(15, completedActivities * 3),
      totalLearningHours: learningHours,
      coursesCompleted: completedActivities - 1,
      skillsAcquired: skillsAcquired,
      achievementsUnlocked: completedActivities + 2,
      weeklyGoalProgress: Math.min(100, (completedActivities / totalActivities) * 85),
      monthlyGoalProgress: Math.min(100, (completedActivities / (totalActivities + 2)) * 70),
      lastActivity: new Date().toISOString(),
      learningPath: {
        currentPhase: Math.min(5, completedActivities + 1),
        totalPhases: 5,
        currentPhaseProgress: Math.min(100, (completedActivities / totalActivities) * 100)
      }
    }
  }

  const getDomainInfo = () => {
  let domain = 'General Career Development'

  // ✅ Highest priority → assessmentResults
  if (userAnalysis?.domain) {
    domain = userAnalysis.domain
  } else if (userAnalysis?.analysis?.domain) {
    domain = userAnalysis.analysis.domain
  }
  // then onboarding
  else if (onboardingData?.domain) {
    domain = onboardingData.domain
  }
  // then resume
  else if (resumeAnalysis?.domain) {
    domain = resumeAnalysis.domain
  } else if (resumeAnalysis?.analysis?.domain) {
    domain = resumeAnalysis.analysis.domain
  }
  // then skill-gap
  else if (skillGapData?.domain) {
    domain = skillGapData.domain
  } else if (skillGapData?.analysis?.domain) {
    domain = skillGapData.analysis.domain
  }

  const domainMapping = {
    'engineering': 'Software Engineering',
    'software engineering': 'Software Engineering',
    'medicine': 'Healthcare & Medicine',
    'commerce': 'Business & Commerce',
    'arts': 'Creative Arts & Design',
    'science': 'Science & Research'
  }

  return domainMapping[domain?.toLowerCase()] || domain
}



  const getUserDisplayName = () => {
    return currentUser?.fullName || 
           onboardingData?.fullName || 
           currentUser?.email?.split('@')[0] || 
           'User'
  }

  const generateDomainSpecificContent = (domain) => {
    const domainContent = {
      'Business & Commerce': {
        skillLabel: 'Business Skills',
        careerPaths: ['Business Analyst', 'Marketing Manager', 'Financial Advisor', 'Product Manager'],
        learningAreas: ['Financial Analysis', 'Market Research', 'Strategic Planning', 'Digital Marketing'],
        industryTrends: ['Digital Transformation', 'Data-Driven Decision Making', 'Sustainable Business', 'E-commerce Growth'],
        taskSuggestions: [
          'Complete Market Analysis Project',
          'Study Financial Modeling Techniques',
          'Practice Business Case Studies',
          'Learn Digital Marketing Tools'
        ],
        achievementTitles: [
          'Business Strategist',
          'Market Analyst',
          'Finance Expert',
          'Commerce Professional'
        ]
      },
      'Software Engineering': {
        skillLabel: 'Technical Skills',
        careerPaths: ['Full Stack Developer', 'Software Engineer', 'DevOps Engineer', 'Data Scientist'],
        learningAreas: ['Programming Languages', 'System Design', 'Database Management', 'Cloud Computing'],
        industryTrends: ['AI/ML Integration', 'Cloud-Native Development', 'Microservices Architecture', 'DevOps Practices'],
        taskSuggestions: [
          'Build a Full Stack Project',
          'Practice Data Structures',
          'Learn Cloud Platforms',
          'Contribute to Open Source'
        ],
        achievementTitles: [
          'Code Master',
          'System Architect',
          'Full Stack Developer',
          'Tech Innovator'
        ]
      },
      'Healthcare & Medicine': {
        skillLabel: 'Medical Skills',
        careerPaths: ['Clinical Physician', 'Medical Researcher', 'Healthcare Administrator', 'Public Health Specialist'],
        learningAreas: ['Clinical Skills', 'Medical Research', 'Patient Care', 'Health Technology'],
        industryTrends: ['Telemedicine', 'Precision Medicine', 'AI Diagnostics', 'Digital Health'],
        taskSuggestions: [
          'Study Clinical Guidelines',
          'Practice Patient Scenarios',
          'Research Medical Literature',
          'Learn Health Tech Tools'
        ],
        achievementTitles: [
          'Clinical Expert',
          'Medical Researcher',
          'Patient Advocate',
          'Health Innovator'
        ]
      },
      'Creative Arts & Design': {
        skillLabel: 'Creative Skills',
        careerPaths: ['Graphic Designer', 'UX/UI Designer', 'Creative Director', 'Digital Artist'],
        learningAreas: ['Design Principles', 'Digital Tools', 'Visual Communication', 'User Experience'],
        industryTrends: ['AR/VR Design', 'Motion Graphics', 'Sustainable Design', 'Interactive Media'],
        taskSuggestions: [
          'Create Design Portfolio',
          'Master Design Software',
          'Study Design Trends',
          'Practice User Research'
        ],
        achievementTitles: [
          'Design Virtuoso',
          'Creative Visionary',
          'UX Expert',
          'Digital Artist'
        ]
      },
      'Science & Research': {
        skillLabel: 'Research Skills',
        careerPaths: ['Research Scientist', 'Data Analyst', 'Lab Manager', 'Science Communicator'],
        learningAreas: ['Research Methods', 'Data Analysis', 'Scientific Writing', 'Laboratory Techniques'],
        industryTrends: ['Big Data Analytics', 'Interdisciplinary Research', 'Open Science', 'AI in Research'],
        taskSuggestions: [
          'Design Research Project',
          'Analyze Scientific Data',
          'Write Research Proposals',
          'Present Research Findings'
        ],
        achievementTitles: [
          'Research Master',
          'Data Scientist',
          'Lab Expert',
          'Science Leader'
        ]
      }
    }

    return domainContent[domain] || domainContent['Business & Commerce']
  }

  const generateDynamicStats = () => {
    const domain = getDomainInfo()
    const domainContent = generateDomainSpecificContent(domain)
    
    let careerMatch = '85%'
    let skillsCount = performanceData?.skillsAcquired || 8
    let trendText = 'Steady progress'
    
    // Customize based on data source with multiple fallback paths
    if (userAnalysis?.careerMatch) {
      careerMatch = userAnalysis.careerMatch
    } else if (userAnalysis?.analysis?.careerMatch) {
      careerMatch = userAnalysis.analysis.careerMatch
    } else if (resumeAnalysis?.skillMatchScore) {
      careerMatch = resumeAnalysis.skillMatchScore + '%'
    } else if (resumeAnalysis?.analysis?.skillMatchScore) {
      careerMatch = resumeAnalysis.analysis.skillMatchScore + '%'
    } else if (skillGapData?.skillGapScore) {
      careerMatch = skillGapData.skillGapScore + '%'
    } else if (skillGapData?.analysis?.skillGapScore) {
      careerMatch = skillGapData.analysis.skillGapScore + '%'
    }
    
    // Extract skills count based on source
    if (resumeAnalysis?.extractedSkills) {
      skillsCount = resumeAnalysis.extractedSkills.length
    } else if (resumeAnalysis?.analysis?.extractedSkills) {
      skillsCount = resumeAnalysis.analysis.extractedSkills.length
    } else if (skillGapData?.currentSkills) {
      skillsCount = (skillGapData.currentSkills || 0) + (skillGapData.skillsToUpdate || 0)
    } else if (skillGapData?.analysis?.currentSkills) {
      skillsCount = (skillGapData.analysis.currentSkills || 0) + (skillGapData.analysis.skillsToUpdate || 0)
    }
    
    if (dataSource === 'assessment') {
      trendText = 'Assessment complete'
    } else if (dataSource === 'resume') {
      trendText = 'Skills analyzed'
    } else if (dataSource === 'skill-gap') {
      trendText = 'Gaps identified'
    }

    return [
      { 
        label: 'Learning Streak', 
        value: `${performanceData?.currentStreak || 3} days`, 
        icon: Flame, 
        color: 'text-orange-600',
        bg: 'bg-orange-50',
        trend: `+${Math.floor((performanceData?.currentStreak || 3) / 3)} this week`
      },
      { 
        label: domainContent.skillLabel, 
        value: skillsCount, 
        icon: Award, 
        color: 'text-green-600',
        bg: 'bg-green-50',
        trend: trendText
      },
      { 
        label: 'Learning Hours', 
        value: `${performanceData?.totalLearningHours || 15}h`, 
        icon: Clock, 
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        trend: `${Math.floor((performanceData?.totalLearningHours || 15) / 7)}h this week`
      },
      { 
        label: 'Career Match', 
        value: careerMatch, 
        icon: Target, 
        color: 'text-purple-600',
        bg: 'bg-purple-50',
        trend: parseInt(careerMatch) > 80 ? 'Excellent fit' : parseInt(careerMatch) > 60 ? 'Good match' : 'Growing fit'
      }
    ]
  }

  const generateRelevantActivities = () => {
    const domain = getDomainInfo()
    const domainContent = generateDomainSpecificContent(domain)
    
    const activities = [
      { 
        title: `Joined ${domain} Career Path`, 
        time: getDaysAgo(currentUser?.createdAt || new Date().toISOString()), 
        type: 'onboarding', 
        points: 25 
      }
    ]

    if (onboardingData) {
      activities.unshift({
        title: `${domain} Profile Setup Complete`,
        time: getDaysAgo(onboardingData.completedAt),
        type: 'profile',
        points: 50
      })
    }

    if (userAnalysis) {
      const mindsetType = userAnalysis.mindsetType || userAnalysis.analysis?.mindsetType || 'Growth'
      activities.unshift({
        title: `Completed ${domain} AI Assessment`,
        time: getDaysAgo(userAnalysis.timestamp),
        type: 'assessment',
        points: 100
      })
      activities.unshift({
        title: `Discovered ${mindsetType} Mindset for ${domain}`,
        time: getDaysAgo(userAnalysis.timestamp),
        type: 'insight',
        points: 75
      })
    }

    if (resumeAnalysis) {
      const experienceLevel = resumeAnalysis.experienceLevel || resumeAnalysis.analysis?.experienceLevel || 'Intermediate'
      const skillsCount = resumeAnalysis.extractedSkills?.length || resumeAnalysis.analysis?.extractedSkills?.length || 8
      activities.unshift({
        title: `${domain} Resume Analysis - ${experienceLevel} Level`,
        time: getDaysAgo(resumeAnalysis.timestamp),
        type: 'analysis',
        points: 100
      })
      activities.unshift({
        title: `Identified ${skillsCount} ${domainContent.skillLabel}`,
        time: getDaysAgo(resumeAnalysis.timestamp),
        type: 'skills',
        points: 80
      })
    }

    if (skillGapData) {
      const gapScore = skillGapData.skillGapScore || skillGapData.analysis?.skillGapScore || 75
      activities.unshift({
        title: `${domain} Skill Gap: ${gapScore}% Industry Ready`,
        time: getDaysAgo(skillGapData.timestamp),
        type: 'gap-analysis',
        points: 120
      })
    }

    return activities.slice(0, 4)
  }

  const generateRelevantTasks = () => {
    const domain = getDomainInfo()
    const domainContent = generateDomainSpecificContent(domain)
    const tasks = []
    
    if (dataSource === 'assessment' && userAnalysis) {
      const learningStyle = userAnalysis.learningStyle || userAnalysis.analysis?.learningStyle || 'Structured'
      tasks.push({
        title: `Start ${learningStyle} ${domain} Learning Path`,
        deadline: 'Today',
        priority: 'high',
        points: 100
      })
      tasks.push({
        title: `Practice ${domainContent.learningAreas[0]}`,
        deadline: 'This week',
        priority: 'medium',
        points: 75
      })
    } else if (dataSource === 'resume' && resumeAnalysis) {
      const improvementAreas = resumeAnalysis.improvementAreas || resumeAnalysis.analysis?.improvementAreas
      if (improvementAreas?.length > 0) {
        tasks.push({
          title: `Improve ${improvementAreas[0]} in ${domain}`,
          deadline: 'This week',
          priority: 'high',
          points: 100
        })
      } else {
        tasks.push({
          title: `Enhance ${domainContent.learningAreas[0]} Skills`,
          deadline: 'This week',
          priority: 'high',
          points: 100
        })
      }
      tasks.push({
        title: `Build ${domain} Portfolio`,
        deadline: 'Next week',
        priority: 'medium',
        points: 90
      })
    } else if (dataSource === 'skill-gap' && skillGapData) {
      const skillCategories = skillGapData.skillCategories || skillGapData.analysis?.skillCategories
      if (skillCategories && skillCategories.length > 0) {
        const highPrioritySkill = skillCategories.find(cat => cat.priority === 'High') || skillCategories[0]
        tasks.push({
          title: `Master ${highPrioritySkill.category} for ${domain}`,
          deadline: 'This week',
          priority: 'high',
          points: 120
        })
      } else {
        tasks.push({
          title: `Learn ${domainContent.learningAreas[0]}`,
          deadline: 'This week',
          priority: 'high',
          points: 120
        })
      }
      tasks.push({
        title: `${domain} Industry Trend Analysis`,
        deadline: 'Tomorrow',
        priority: 'medium',
        points: 80
      })
    }

    // Add domain-specific tasks
    if (tasks.length < 2) {
      domainContent.taskSuggestions.slice(0, 2).forEach((task, index) => {
        tasks.push({
          title: task,
          deadline: index === 0 ? 'Tomorrow' : 'Next week',
          priority: index === 0 ? 'high' : 'medium',
          points: 60 + (index * 20)
        })
      })
    }
    
    tasks.push({
      title: `Set Weekly ${domain} Learning Goals`,
      deadline: 'Tomorrow',
      priority: tasks.length < 2 ? 'high' : 'low',
      points: 60
    })

    return tasks.slice(0, 4)
  }

  const generateRelevantAchievements = () => {
    const domain = getDomainInfo()
    const domainContent = generateDomainSpecificContent(domain)
    
    const achievements = [
      { title: `${domain} Journey Started`, icon: '🎯', unlocked: true, date: getDaysAgo(currentUser?.createdAt) }
    ]

    if (onboardingData) {
      achievements.push({ 
        title: `${domain} Profile Complete`, 
        icon: '✅', 
        unlocked: true, 
        date: getDaysAgo(onboardingData.completedAt) 
      })
    }

    if (userAnalysis) {
      achievements.push({ 
        title: `${domain} Assessment Master`, 
        icon: '🧠', 
        unlocked: true, 
        date: getDaysAgo(userAnalysis.timestamp) 
      })
    }

    if (resumeAnalysis) {
      achievements.push({ 
        title: `${domainContent.skillLabel} Analyzer`, 
        icon: '📋', 
        unlocked: true, 
        date: getDaysAgo(resumeAnalysis.timestamp) 
      })
    }

    if (skillGapData) {
      achievements.push({ 
        title: `${domain} Gap Identifier`, 
        icon: '🔍', 
        unlocked: true, 
        date: getDaysAgo(skillGapData.timestamp) 
      })
    }

    // Future achievements based on domain
    achievements.push({ 
      title: domainContent.achievementTitles[0], 
      icon: '🚀', 
      unlocked: false, 
      requirement: `Complete first ${domain.toLowerCase()} project` 
    })

    return achievements.slice(0, 5)
  }

  const generatePersonalizedMentorMessage = () => {
    const userName = getUserDisplayName().split(' ')[0]
    const domain = getDomainInfo()
    const domainContent = generateDomainSpecificContent(domain)
    
    if (dataSource === 'assessment' && userAnalysis) {
      const mindsetType = userAnalysis.mindsetType || userAnalysis.analysis?.mindsetType || 'learning'
      const learningStyle = userAnalysis.learningStyle || userAnalysis.analysis?.learningStyle || 'structured'
      return `Hello ${userName}! I've analyzed your ${mindsetType} profile for ${domain}. Your ${learningStyle} approach is perfect for mastering ${domainContent.learningAreas[0]}. Ready to dive into your personalized roadmap?`
    } else if (dataSource === 'resume' && resumeAnalysis) {
      const experienceLevel = resumeAnalysis.experienceLevel || resumeAnalysis.analysis?.experienceLevel || 'intermediate'
      const skillsCount = resumeAnalysis.extractedSkills?.length || resumeAnalysis.analysis?.extractedSkills?.length || 'several'
      return `Hi ${userName}! Your ${experienceLevel} background in ${domain} shows great potential. I've spotted ${skillsCount} key ${domainContent.skillLabel.toLowerCase()} we can build upon for your career in ${domainContent.careerPaths[0]}!`
    } else if (dataSource === 'skill-gap' && skillGapData) {
      const gapScore = skillGapData.skillGapScore || skillGapData.analysis?.skillGapScore || 75
      return `Welcome ${userName}! Your skill analysis shows ${gapScore}% readiness for ${domain} roles. I have a targeted plan to bridge those gaps and get you to ${domainContent.careerPaths[0]} level quickly!`
    }
    
    return `Hi ${userName}! I'm excited to be your AI mentor for ${domain}. Let's create an amazing learning journey focusing on ${domainContent.learningAreas[0]} and ${domainContent.learningAreas[1]}!`
  }

  const getDaysAgo = (timestamp) => {
    if (!timestamp) return 'Recently'
    const days = Math.floor((Date.now() - new Date(timestamp).getTime()) / (1000 * 60 * 60 * 24))
    if (days === 0) return 'Today'
    if (days === 1) return 'Yesterday'
    if (days < 7) return `${days} days ago`
    if (days < 30) return `${Math.floor(days/7)} week${Math.floor(days/7) > 1 ? 's' : ''} ago`
    return `${Math.floor(days/30)} month${Math.floor(days/30) > 1 ? 's' : ''} ago`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Brain className="animate-spin text-primary-600 mx-auto mb-4" size={48} />
          <p className="text-gray-600">Loading your personalized dashboard...</p>
        </div>
      </div>
    )
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <AlertCircle className="text-orange-600 mx-auto mb-4" size={48} />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h2>
          <p className="text-gray-600 mb-6">Please log in to access your personalized dashboard.</p>
          <a href="/auth" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 inline-flex items-center gap-2">
            Go to Login <ArrowRight size={16} />
          </a>
        </div>
      </div>
    )
  }

  if (dataSource === 'none') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome, {getUserDisplayName()}!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Let's start building your AI-powered career roadmap
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-8 text-center"
            >
              <Brain className="w-16 h-16 text-blue-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Take AI Assessment</h3>
              <p className="text-gray-600 mb-6">
                Discover your learning style, strengths, and ideal career path through our comprehensive AI assessment.
              </p>
              <a 
                href="/assessment"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 inline-flex items-center gap-2"
              >
                Start Assessment <ArrowRight size={16} />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-xl p-8 text-center"
            >
              <FileText className="w-16 h-16 text-green-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Analyze Experience</h3>
              <p className="text-gray-600 mb-6">
                Upload your resume or describe your experience to get personalized skill analysis and career guidance.
              </p>
              <a 
                href="/experience-level"
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-all duration-300 inline-flex items-center gap-2"
              >
                Get Started <ArrowRight size={16} />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  const currentDomain = getDomainInfo()
  const displayName = getUserDisplayName()
  const stats = generateDynamicStats()
  const recentActivities = generateRelevantActivities()
  const upcomingTasks = generateRelevantTasks()
  const achievements = generateRelevantAchievements()
  const mentorMessage = generatePersonalizedMentorMessage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {displayName}!
              </h1>
              <p className="text-gray-600 text-lg">
                Continue your journey in <span className="capitalize font-semibold text-primary-600">{currentDomain}</span>
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {userAnalysis?.analysis?.mindsetType && (
                  <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    <Brain size={16} />
                    {userAnalysis.analysis.mindsetType} Mindset
                  </div>
                )}
                {resumeAnalysis?.analysis?.experienceLevel && (
                  <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    <FileText size={16} />
                    {resumeAnalysis.analysis.experienceLevel} Level
                  </div>
                )}
                {skillGapData?.analysis?.skillGapScore && (
                  <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                    <Target size={16} />
                    {skillGapData.analysis.skillGapScore}% Industry Ready
                  </div>
                )}
              </div>
            </div>

            {performanceData?.learningPath && (
              <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Learning Progress</div>
                    <div className="text-lg font-bold text-primary-600">
                      Phase {performanceData.learningPath.currentPhase} of {performanceData.learningPath.totalPhases}
                    </div>
                    <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-primary-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${performanceData.learningPath.currentPhaseProgress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg ${stat.bg} flex items-center justify-center`}>
                  <stat.icon size={24} className={stat.color} />
                </div>
                <TrendingUp size={16} className="text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-xs text-green-600">{stat.trend}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <BarChart3 className="text-primary-600" size={24} />
                  Performance Tracker
                </h2>
                <button className="text-primary-600 hover:text-primary-700 font-medium">
                  View Details
                </button>
              </div>
              <ProgressTracker performanceData={performanceData} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Target className="text-primary-600" size={24} />
                  Your {currentDomain} Roadmap
                </h2>
                <button className="text-primary-600 hover:text-primary-700 font-medium">
                  View Full Roadmap
                </button>
              </div>
              <RoadmapVisualizer 
                domain={currentDomain} 
                userAnalysis={userAnalysis}
                resumeAnalysis={resumeAnalysis}
                skillGapData={skillGapData}
                currentPhase={performanceData?.learningPath?.currentPhase || 1}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="text-primary-600" size={20} />
                Recent Activities
              </h3>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <CheckCircle size={16} className="text-green-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-primary-600">+{activity.points} XP</span>
                      <Zap size={14} className="text-yellow-500" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Brain className="text-primary-600" size={20} />
                  AI Mentor
                </h3>
                <button
                  onClick={() => setShowMentor(!showMentor)}
                  className="text-primary-600 hover:text-primary-700"
                >
                  <MessageCircle size={20} />
                </button>
              </div>
              
              <div className="bg-primary-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-primary-800 mb-2">
                  {mentorMessage}
                </p>
                <p className="text-xs text-primary-600">AI Mentor • 5 min ago</p>
              </div>
              
              <button 
                onClick={() => setShowMentor(true)}
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-all duration-300 w-full flex items-center justify-center gap-2"
              >
                <MessageCircle size={16} />
                Chat with Mentor
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                {dataSource === 'assessment' ? <Brain className="text-primary-600" size={20} /> : <FileText className="text-green-600" size={20} />}
                {dataSource === 'assessment' ? 'Assessment Results' : 'Analysis Summary'}
              </h3>
              
              {dataSource === 'assessment' && userAnalysis?.analysis && (
                <div className="space-y-3">
                  <div className="bg-primary-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-primary-900 mb-1">Mindset Type</p>
                    <p className="text-primary-800">{userAnalysis.analysis.mindsetType}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-green-900 mb-1">Learning Style</p>
                    <p className="text-green-800">{userAnalysis.analysis.learningStyle}</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-purple-900 mb-1">Career Match</p>
                    <p className="text-purple-800">{userAnalysis.analysis.careerMatch}</p>
                  </div>
                </div>
              )}

              {dataSource === 'resume' && resumeAnalysis?.analysis && (
                <div className="space-y-3">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-blue-900 mb-1">Experience Level</p>
                    <p className="text-blue-800">{resumeAnalysis.analysis.experienceLevel}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-green-900 mb-1">Top Skills</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {resumeAnalysis.analysis.extractedSkills?.slice(0, 4).map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-orange-900 mb-1">Improvement Areas</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {resumeAnalysis.analysis.improvementAreas?.slice(0, 2).map((area, index) => (
                        <span key={index} className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {dataSource === 'skill-gap' && skillGapData?.analysis && (
                <div className="space-y-3">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-purple-900 mb-1">Skill Gap Score</p>
                    <p className="text-purple-800">{skillGapData.analysis.skillGapScore}% Industry Ready</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-orange-900 mb-1">Key Updates</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {skillGapData.analysis.industryTrends?.slice(0, 2).map((trend, index) => (
                        <span key={index} className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">
                          {trend}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-blue-900 mb-1">Time to Upskill</p>
                    <p className="text-blue-800">{skillGapData.analysis.estimatedTimeToUpskill}</p>
                  </div>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Trophy className="text-primary-600" size={20} />
                Achievements
              </h3>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className={`flex items-center gap-3 p-3 rounded-lg border ${
                    achievement.unlocked 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${
                        achievement.unlocked ? 'text-green-900' : 'text-gray-600'
                      }`}>
                        {achievement.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {achievement.unlocked ? achievement.date : achievement.requirement}
                      </p>
                    </div>
                    {achievement.unlocked && (
                      <CheckCircle size={16} className="text-green-500" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="text-primary-600" size={20} />
                Upcoming Tasks
              </h3>
              <div className="space-y-3">
                {upcomingTasks.map((task, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className={`w-3 h-3 rounded-full ${
                      task.priority === 'high' ? 'bg-red-500' :
                      task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{task.title}</p>
                      <p className="text-xs text-gray-500">{task.deadline}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-primary-600">+{task.points} XP</span>
                      <Play size={16} className="text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center hover:shadow-xl transition-shadow duration-300">
            <BookOpen className="text-primary-600 mx-auto mb-4" size={32} />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Continue Learning</h3>
            <p className="text-gray-600 text-sm mb-4">Resume Phase {performanceData?.learningPath?.currentPhase || 2}</p>
            <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-all duration-300 w-full">Continue</button>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center hover:shadow-xl transition-shadow duration-300">
            <Award className="text-primary-600 mx-auto mb-4" size={32} />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Skill Assessment</h3>
            <p className="text-gray-600 text-sm mb-4">Test your progress</p>
            <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-all duration-300 w-full">Take Assessment</button>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center hover:shadow-xl transition-shadow duration-300">
            <Star className="text-primary-600 mx-auto mb-4" size={32} />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Career Opportunities</h3>
            <p className="text-gray-600 text-sm mb-4">Explore job matches</p>
            <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-all duration-300 w-full">Explore</button>
          </div>
        </motion.div>
      </div>

      {showMentor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <AIMentor 
              userId={currentUser?.id}
              currentProgress={{
                domain: currentDomain,
                mindsetType: userAnalysis?.analysis?.mindsetType,
                currentPhase: performanceData?.learningPath?.currentPhase,
                performanceData: performanceData
              }}
              onClose={() => setShowMentor(false)}
            />
          </div>
        </div>
      )}
    </div>
  )
}