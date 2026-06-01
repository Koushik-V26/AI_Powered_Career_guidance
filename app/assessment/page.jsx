'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowLeft, CheckCircle, Brain, Clock, Star, BookOpen, Stethoscope, Calculator, Palette, Microscope } from 'lucide-react'

export default function Assessment() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [userData, setUserData] = useState(null)
  const [selectedDomain, setSelectedDomain] = useState('')
  const [currentStep, setCurrentStep] = useState('domain') // domain, assessment, analyzing
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  useEffect(() => {
    // Check for user data
    const storedUserData = localStorage.getItem('onboardingData')
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData))
    }

    // Check URL params
    const domain = searchParams.get('domain')
    const level = searchParams.get('level')
    
    if (domain) {
      setSelectedDomain(domain)
      setCurrentStep('assessment')
    }
  }, [searchParams])

  const domains = [
    {
      id: 'engineering',
      name: 'Engineering',
      icon: BookOpen,
      color: 'from-blue-500 to-blue-700',
    },
    {
      id: 'medicine',
      name: 'Medicine',
      icon: Stethoscope,
      color: 'from-red-500 to-red-700',
    },
    {
      id: 'commerce',
      name: 'Commerce',
      icon: Calculator,
      color: 'from-green-500 to-green-700',
    },
    {
      id: 'arts',
      name: 'Arts',
      icon: Palette,
      color: 'from-purple-500 to-purple-700',
    },
    {
      id: 'science',
      name: 'Science',
      icon: Microscope,
      color: 'from-orange-500 to-orange-700',
    }
  ]

  const domainInfo = {
    engineering: { name: 'Engineering', color: 'blue' },
    medicine: { name: 'Medicine', color: 'red' },
    commerce: { name: 'Commerce', color: 'green' },
    arts: { name: 'Arts', color: 'purple' },
    science: { name: 'Science', color: 'orange' }
  }

  const currentDomain = domainInfo[selectedDomain] || { name: 'Selected Domain', color: 'blue' }

  const questions = [
    {
      id: 1,
      category: 'learning_style',
      question: 'How do you prefer to learn new concepts?',
      options: [
        { id: 'a', text: 'Through hands-on practice and experimentation', weight: { practical: 3, analytical: 1 } },
        { id: 'b', text: 'By reading detailed explanations and theory', weight: { analytical: 3, theoretical: 2 } },
        { id: 'c', text: 'Through visual diagrams and demonstrations', weight: { visual: 3, creative: 1 } },
        { id: 'd', text: 'By discussing with others and group learning', weight: { collaborative: 3, social: 2 } }
      ]
    },
    {
      id: 2,
      category: 'problem_solving',
      question: 'When facing a complex problem, you typically:',
      options: [
        { id: 'a', text: 'Break it down into smaller, manageable parts', weight: { analytical: 3, systematic: 2 } },
        { id: 'b', text: 'Look for creative and innovative solutions', weight: { creative: 3, innovative: 2 } },
        { id: 'c', text: 'Research similar problems and their solutions', weight: { research: 3, methodical: 2 } },
        { id: 'd', text: 'Collaborate with others to find solutions', weight: { collaborative: 3, social: 1 } }
      ]
    },
    {
      id: 3,
      category: 'work_environment',
      question: 'What is your favourite subject?',
      options: [
        { id: 'a', text: 'Science', weight: { independent: 3, focused: 2 } },
        { id: 'b', text: 'Maths', weight: { collaborative: 3, social: 2 } },
        { id: 'c', text: 'Social', weight: { adaptable: 3, dynamic: 2 } },
        { id: 'd', text: 'Economics', weight: { systematic: 3, organized: 2 } }
      ]
    },
    {
      id: 4,
      category: 'motivation',
      question: `What motivates you most about pursuing a career?`,
      options: [
        { id: 'a', text: 'Solving complex technical challenges', weight: { analytical: 3, technical: 2 } },
        { id: 'b', text: 'Making a positive impact on people\'s lives', weight: { social_impact: 3, empathetic: 2 } },
        { id: 'c', text: 'Financial stability and career growth', weight: { practical: 2, ambitious: 3 } },
        { id: 'd', text: 'Creative expression and innovation', weight: { creative: 3, innovative: 2 } }
      ]
    },
    {
      id: 5,
      category: 'strengths',
      question: 'Which of these best describes your natural strengths?',
      options: [
        { id: 'a', text: 'Logical thinking and attention to detail', weight: { analytical: 3, detail_oriented: 2 } },
        { id: 'b', text: 'Communication and interpersonal skills', weight: { social: 3, communicative: 2 } },
        { id: 'c', text: 'Creativity and artistic abilities', weight: { creative: 3, artistic: 2 } },
        { id: 'd', text: 'Leadership and organizational skills', weight: { leadership: 3, organized: 2 } }
      ]
    },
    {
      id: 6,
      category: 'career_goals',
      question: 'Where do you see yourself in 5 years?',
      options: [
        { id: 'a', text: 'Leading a team or department in my field', weight: { leadership: 3, ambitious: 2 } },
        { id: 'b', text: 'Being a recognized expert in my specialization', weight: { expertise_focused: 3, specialized: 2 } },
        { id: 'c', text: 'Running my own business or consultancy', weight: { entrepreneurial: 3, independent: 2 } },
        { id: 'd', text: 'Making significant contributions to research/innovation', weight: { research: 3, innovative: 2 } }
      ]
    },
    {
      id: 7,
      category: 'challenges',
      question: 'What type of challenges energize you the most?',
      options: [
        { id: 'a', text: 'Technical puzzles that require deep analysis', weight: { analytical: 3, technical: 2 } },
        { id: 'b', text: 'People-related challenges and relationship building', weight: { social: 3, empathetic: 2 } },
        { id: 'c', text: 'Creative projects with artistic elements', weight: { creative: 3, artistic: 2 } },
        { id: 'd', text: 'Strategic business challenges and growth opportunities', weight: { strategic: 3, business_oriented: 2 } }
      ]
    },
    {
      id: 8,
      category: 'learning_pace',
      question: 'How do you prefer to pace your learning?',
      options: [
        { id: 'a', text: 'Intensive, fast-paced learning with quick results', weight: { intensive: 3, fast_learner: 2 } },
        { id: 'b', text: 'Steady, consistent progress over time', weight: { consistent: 3, methodical: 2 } },
        { id: 'c', text: 'Flexible pace based on interest and motivation', weight: { flexible: 3, self_directed: 2 } },
        { id: 'd', text: 'Structured timeline with clear milestones', weight: { structured: 3, goal_oriented: 2 } }
      ]
    }
  ]

  const handleDomainSelect = (domain) => {
    setSelectedDomain(domain.id)
    setCurrentStep('assessment')
  }

  const handleAnswerSelect = (optionId) => {
    setAnswers({ ...answers, [currentQuestion]: optionId })
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      analyzeResults()
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  // In your assessment page, replace the analyzeResults function:
const analyzeResults = async () => {
  setIsAnalyzing(true)
  
  // Calculate personality traits based on answers
  const traits = {}
  
  questions.forEach((question, index) => {
    const selectedOption = answers[index]
    if (selectedOption) {
      const option = question.options.find(opt => opt.id === selectedOption)
      if (option && option.weight) {
        Object.entries(option.weight).forEach(([trait, weight]) => {
          traits[trait] = (traits[trait] || 0) + weight
        })
      }
    }
  })

  // Simulate AI analysis
  setTimeout(async () => {
    try {
      const response = await fetch('/api/analyzeAssessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domain: selectedDomain,
          level: 'beginner',
          traits: traits,
          answers: answers,
          userData: userData
        })
      })
      
      let result
      if (response.ok) {
        result = await response.json()
      } else {
        throw new Error('Failed to analyze assessment')
      }
      
      // Store results and navigate to recommended domains
      localStorage.setItem('assessmentResults', JSON.stringify(result))
      router.push('/recommended-domains')
      
    } catch (error) {
      console.error('Assessment analysis error:', error)
      // Navigate to recommended domains with basic analysis
      const basicAnalysis = {
        mindsetType: 'Analytical and Goal-Oriented',
        learningStyle: 'Structured and Methodical',
        recommendedPath: `${currentDomain.name} - Beginner Track`,
        traits: traits,
        domain: selectedDomain,
        timestamp: new Date().toISOString()
      }
      localStorage.setItem('assessmentResults', JSON.stringify(basicAnalysis))
      router.push('/recommended-domains')
    }
  }, 3000)
}

  const goBack = () => {
    if (currentStep === 'assessment') {
      if (currentQuestion === 0) {
        setCurrentStep('domain')
      } else {
        prevQuestion()
      }
    } else {
      router.push('/')
    }
  }

  // Domain Selection Step
  if (currentStep === 'domain') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            {userData && (
              <div className="mb-4">
                <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                  Welcome, {userData.fullName}!
                </span>
              </div>
            )}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              AI Career Assessment
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select your domain of interest to begin your personalized career assessment
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {domains.map((domain, index) => (
              <motion.div
                key={domain.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`
                  relative group cursor-pointer rounded-2xl border-2 transition-all duration-300 hover:shadow-2xl hover:scale-105
                  ${selectedDomain === domain.id 
                    ? 'border-blue-500 bg-blue-50 shadow-xl scale-105' 
                    : 'border-gray-200 bg-white hover:border-gray-300'
                  }
                `}
                onClick={() => handleDomainSelect(domain)}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${domain.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
                
                <div className="relative p-8 text-center">
                  <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-r ${domain.color} rounded-xl flex items-center justify-center transform transition-transform group-hover:scale-110`}>
                    <domain.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {domain.name}
                  </h3>

                  <button
                    className={`
                      w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2
                      bg-gradient-to-r ${domain.color} hover:shadow-lg transform hover:translateY(-1px)
                    `}
                  >
                    Start Assessment
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {selectedDomain === domain.id && (
                  <div className="absolute top-4 right-4 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {selectedDomain && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-8 text-center"
            >
              <button
                onClick={() => setCurrentStep('assessment')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2"
              >
                Begin Assessment for {domainInfo[selectedDomain].name}
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    )
  }

  // Analyzing Step
  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="relative">
              <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-500 border-t-transparent mx-auto mb-6"></div>
              <Brain className="absolute inset-0 m-auto w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Analyzing Your Profile</h2>
            <div className="space-y-2 text-gray-600">
              <p>Processing your responses...</p>
              <p>Identifying your learning style...</p>
              <p>Determining your mindset type...</p>
              <p>Generating personalized roadmap...</p>
            </div>
          </motion.div>
          
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Star className="w-6 h-6 text-yellow-500" />
              <span className="font-medium">AI Assessment Engine</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full animate-pulse" style={{ width: '85%' }}></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Creating your personalized career guidance...</p>
          </div>
        </div>
      </div>
    )
  }

  // Assessment Questions Step
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="mb-4">
            <span className={`inline-flex items-center px-4 py-2 rounded-full bg-${currentDomain.color}-100 text-${currentDomain.color}-800 text-sm font-medium`}>
              {currentDomain.name} • AI Assessment
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Career Assessment
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Help our AI understand your learning style and personality to create the perfect roadmap
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Question {currentQuestion + 1} of {questions.length}</span>
            <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {questions[currentQuestion]?.question}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questions[currentQuestion]?.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswerSelect(option.id)}
                className={`
                  p-6 rounded-xl border-2 transition-all duration-300 text-left hover:shadow-lg
                  ${answers[currentQuestion] === option.id
                    ? 'border-blue-500 bg-blue-50 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                <div className="flex items-center">
                  <div className={`
                    w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4
                    ${answers[currentQuestion] === option.id
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                    }
                  `}>
                    {answers[currentQuestion] === option.id && (
                      <CheckCircle className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <span className="text-gray-900">{option.text}</span>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={goBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {currentQuestion === 0 ? 'Choose Domain' : 'Previous'}
          </button>

          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">
              <Clock className="w-4 h-4 inline mr-1" />
              ~5 minutes remaining
            </div>
            
            <button
              onClick={nextQuestion}
              disabled={!answers[currentQuestion]}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
            >
              {currentQuestion === questions.length - 1 ? 'Analyze Results' : 'Next'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}