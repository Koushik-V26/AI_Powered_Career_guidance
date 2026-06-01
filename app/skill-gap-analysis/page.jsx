'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowLeft, Clock, TrendingUp, BookOpen, Target, CheckCircle, AlertCircle, Calendar, Award, Brain, Zap, Users, Globe } from 'lucide-react'

export default function SkillGapAnalysis() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [selectedDomain, setSelectedDomain] = useState('')
  const [currentStep, setCurrentStep] = useState('background') // background, analysis, results
  const [formData, setFormData] = useState({
    graduationYear: '',
    degree: '',
    lastWorked: '',
    previousRole: '',
    targetRole: '',
    hasProjects: false,
    projectDescription: '',
    preferredLearningTime: '',
    currentSkillLevel: ''
  })
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResults, setAnalysisResults] = useState(null)

  useEffect(() => {
    const domain = searchParams.get('domain')
    if (domain) {
      setSelectedDomain(domain)
    }
  }, [searchParams])

  const domainInfo = {
    engineering: { name: 'Engineering', color: 'blue', icon: 'Tech' },
    medicine: { name: 'Medicine', color: 'red', icon: 'Health' },
    commerce: { name: 'Commerce', color: 'green', icon: 'Business' },
    arts: { name: 'Arts', color: 'purple', icon: 'Creative' },
    science: { name: 'Science', color: 'orange', icon: 'Research' }
  }

  const currentDomain = domainInfo[selectedDomain] || { name: 'Selected Domain', color: 'blue', icon: 'General' }

  // Domain-specific data
  const getDomainSpecificData = (domain) => {
    const domainData = {
      engineering: {
        industryTrends: [
          'AI/ML Integration',
          'Cloud Computing',
          'DevOps Automation',
          'Microservices Architecture',
          'Cybersecurity'
        ],
        skillCategories: [
          {
            category: 'Programming & Development',
            status: 'needs-update',
            skills: ['Modern JavaScript/Python', 'React/Angular', 'Node.js', 'REST APIs'],
            priority: 'High',
            timeRequired: '2-3 months'
          },
          {
            category: 'Cloud & DevOps',
            status: 'missing',
            skills: ['AWS/Azure', 'Docker/Kubernetes', 'CI/CD Pipelines', 'Infrastructure as Code'],
            priority: 'High',
            timeRequired: '2-3 months'
          },
          {
            category: 'Data & Analytics',
            status: 'needs-update',
            skills: ['SQL/NoSQL Databases', 'Data Analysis', 'Machine Learning Basics', 'Big Data Tools'],
            priority: 'Medium',
            timeRequired: '1-2 months'
          },
          {
            category: 'Soft Skills',
            status: 'good',
            skills: ['Agile Methodology', 'Team Collaboration', 'Technical Communication', 'Problem Solving'],
            priority: 'Low',
            timeRequired: '1 month'
          }
        ],
        recommendedPath: [
          {
            phase: 'Modern Development Stack',
            duration: '2-3 months',
            focus: 'Update programming languages and frameworks'
          },
          {
            phase: 'Cloud & DevOps Mastery',
            duration: '2-3 months',
            focus: 'Learn cloud platforms and automation tools'
          },
          {
            phase: 'System Design & Architecture',
            duration: '2 months',
            focus: 'Advanced system design and scalability'
          },
          {
            phase: 'Job Market Preparation',
            duration: '1 month',
            focus: 'Technical interviews and portfolio building'
          }
        ]
      },
      medicine: {
        industryTrends: [
          'Telemedicine',
          'Digital Health Records',
          'AI Diagnostics',
          'Personalized Medicine',
          'Medical Robotics'
        ],
        skillCategories: [
          {
            category: 'Clinical Knowledge',
            status: 'needs-update',
            skills: ['Current Treatment Protocols', 'Evidence-Based Medicine', 'Clinical Guidelines', 'Drug Interactions'],
            priority: 'High',
            timeRequired: '3-4 months'
          },
          {
            category: 'Medical Technology',
            status: 'missing',
            skills: ['Electronic Health Records', 'Medical Imaging Software', 'Telemedicine Platforms', 'Medical AI Tools'],
            priority: 'High',
            timeRequired: '2-3 months'
          },
          {
            category: 'Regulatory & Compliance',
            status: 'needs-update',
            skills: ['HIPAA Regulations', 'Medical Ethics', 'Patient Safety Protocols', 'Quality Assurance'],
            priority: 'High',
            timeRequired: '2 months'
          },
          {
            category: 'Patient Care',
            status: 'good',
            skills: ['Patient Communication', 'Bedside Manner', 'Medical History Taking', 'Physical Examination'],
            priority: 'Medium',
            timeRequired: '1 month'
          }
        ],
        recommendedPath: [
          {
            phase: 'Medical Knowledge Update',
            duration: '3-4 months',
            focus: 'Current medical practices and protocols'
          },
          {
            phase: 'Healthcare Technology',
            duration: '2-3 months',
            focus: 'Digital health systems and tools'
          },
          {
            phase: 'Specialization Refresh',
            duration: '2-3 months',
            focus: 'Field-specific updates and certifications'
          },
          {
            phase: 'Medical Practice Re-entry',
            duration: '1-2 months',
            focus: 'Licensing renewal and job placement'
          }
        ]
      },
      commerce: {
        industryTrends: [
          'Digital Transformation',
          'E-commerce Growth',
          'Data Analytics',
          'Cryptocurrency/Fintech',
          'Sustainable Business'
        ],
        skillCategories: [
          {
            category: 'Digital Marketing & Analytics',
            status: 'missing',
            skills: ['Google Analytics', 'Social Media Marketing', 'SEO/SEM', 'Marketing Automation'],
            priority: 'High',
            timeRequired: '2-3 months'
          },
          {
            category: 'Financial Technology',
            status: 'needs-update',
            skills: ['Financial Modeling', 'Excel/Power BI', 'Cryptocurrency Knowledge', 'Fintech Platforms'],
            priority: 'High',
            timeRequired: '2-3 months'
          },
          {
            category: 'E-commerce & Sales',
            status: 'needs-update',
            skills: ['E-commerce Platforms', 'CRM Systems', 'Sales Funnels', 'Customer Analytics'],
            priority: 'Medium',
            timeRequired: '1-2 months'
          },
          {
            category: 'Business Strategy',
            status: 'good',
            skills: ['Strategic Planning', 'Market Research', 'Business Development', 'Negotiation'],
            priority: 'Low',
            timeRequired: '1 month'
          }
        ],
        recommendedPath: [
          {
            phase: 'Digital Business Skills',
            duration: '2-3 months',
            focus: 'Digital marketing and e-commerce mastery'
          },
          {
            phase: 'Financial Technology & Analytics',
            duration: '2-3 months',
            focus: 'Modern financial tools and data analysis'
          },
          {
            phase: 'Strategic Business Management',
            duration: '2 months',
            focus: 'Leadership and business strategy update'
          },
          {
            phase: 'Career Transition',
            duration: '1 month',
            focus: 'Professional networking and job search'
          }
        ]
      },
      arts: {
        industryTrends: [
          'Digital Art & NFTs',
          'Social Media Content',
          'UX/UI Design',
          'Video Production',
          'AR/VR Experiences'
        ],
        skillCategories: [
          {
            category: 'Digital Design Tools',
            status: 'needs-update',
            skills: ['Adobe Creative Suite 2024', 'Figma/Sketch', 'Procreate', '3D Modeling Software'],
            priority: 'High',
            timeRequired: '2-3 months'
          },
          {
            category: 'Web & Interactive Design',
            status: 'missing',
            skills: ['UX/UI Design', 'Web Design', 'Motion Graphics', 'Interactive Media'],
            priority: 'High',
            timeRequired: '3-4 months'
          },
          {
            category: 'Content Creation',
            status: 'needs-update',
            skills: ['Social Media Content', 'Video Editing', 'Photography', 'Brand Identity'],
            priority: 'Medium',
            timeRequired: '2 months'
          },
          {
            category: 'Creative Business',
            status: 'missing',
            skills: ['Freelance Management', 'Client Relations', 'Portfolio Marketing', 'Pricing Strategies'],
            priority: 'Medium',
            timeRequired: '1-2 months'
          }
        ],
        recommendedPath: [
          {
            phase: 'Digital Art Mastery',
            duration: '3-4 months',
            focus: 'Modern digital design tools and techniques'
          },
          {
            phase: 'UX/UI & Web Design',
            duration: '3 months',
            focus: 'User experience and web design skills'
          },
          {
            phase: 'Portfolio Development',
            duration: '2 months',
            focus: 'Professional portfolio and online presence'
          },
          {
            phase: 'Creative Career Launch',
            duration: '1 month',
            focus: 'Freelance setup and client acquisition'
          }
        ]
      },
      science: {
        industryTrends: [
          'Data Science & AI',
          'Biotech & Genomics',
          'Climate Technology',
          'Laboratory Automation',
          'Open Science Practices'
        ],
        skillCategories: [
          {
            category: 'Data Analysis & Programming',
            status: 'needs-update',
            skills: ['Python/R Programming', 'Statistical Analysis', 'Machine Learning', 'Data Visualization'],
            priority: 'High',
            timeRequired: '3-4 months'
          },
          {
            category: 'Modern Laboratory Techniques',
            status: 'missing',
            skills: ['Automated Lab Equipment', 'Bioinformatics', 'High-Throughput Analysis', 'Quality Control'],
            priority: 'High',
            timeRequired: '2-3 months'
          },
          {
            category: 'Research Technology',
            status: 'needs-update',
            skills: ['Literature Databases', 'Research Software', 'Collaboration Tools', 'Grant Writing'],
            priority: 'Medium',
            timeRequired: '2 months'
          },
          {
            category: 'Scientific Communication',
            status: 'good',
            skills: ['Scientific Writing', 'Data Presentation', 'Peer Review', 'Conference Presentations'],
            priority: 'Low',
            timeRequired: '1 month'
          }
        ],
        recommendedPath: [
          {
            phase: 'Data Science Foundation',
            duration: '3-4 months',
            focus: 'Programming and statistical analysis skills'
          },
          {
            phase: 'Modern Lab Techniques',
            duration: '2-3 months',
            focus: 'Current laboratory and research methods'
          },
          {
            phase: 'Research Specialization',
            duration: '2-3 months',
            focus: 'Field-specific advanced techniques'
          },
          {
            phase: 'Academic/Industry Transition',
            duration: '1-2 months',
            focus: 'Career placement and networking'
          }
        ]
      }
    }

    return domainData[domain] || domainData.engineering
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const runSkillGapAnalysis = async () => {
    setIsAnalyzing(true)
    setCurrentStep('analysis')

    // Simulate AI analysis with domain-specific content
    setTimeout(() => {
      const mockResults = generateMockAnalysisResults()
      setAnalysisResults(mockResults)
      setCurrentStep('results')
      setIsAnalyzing(false)
    }, 4000)
  }

  const generateMockAnalysisResults = () => {
    const domainData = getDomainSpecificData(selectedDomain)
    const currentYear = new Date().getFullYear()
    const yearsGap = formData.graduationYear ? currentYear - parseInt(formData.graduationYear) : 5
    
    // Calculate skill gap score based on years gap
    let skillGapScore = 85 - (yearsGap * 3)
    if (formData.lastWorked === 'currently-working') skillGapScore += 10
    if (formData.currentSkillLevel === 'advanced') skillGapScore += 5
    skillGapScore = Math.max(40, Math.min(95, skillGapScore))

    return {
      skillGapScore: skillGapScore,
      totalSkillsNeeded: domainData.skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0),
      currentSkills: Math.floor(skillGapScore * 0.15),
      skillsToUpdate: Math.floor(skillGapScore * 0.10),
      newSkillsToLearn: Math.floor((100 - skillGapScore) * 0.12),
      estimatedTimeToUpskill: `${Math.floor(6 + (100 - skillGapScore) * 0.05)}-${Math.floor(9 + (100 - skillGapScore) * 0.08)} months`,
      industryTrends: domainData.industryTrends,
      skillCategories: domainData.skillCategories,
      recommendedPath: domainData.recommendedPath
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'good':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'needs-update':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
      case 'missing':
        return <Target className="w-5 h-5 text-red-500" />
      default:
        return <CheckCircle className="w-5 h-5 text-gray-400" />
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'text-red-600 bg-red-50 border-red-200'
      case 'Medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'Low':
        return 'text-green-600 bg-green-50 border-green-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  if (!selectedDomain) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Domain Selected</h2>
          <p className="text-gray-600 mb-6">Please select a domain to analyze your skills.</p>
          <button
            onClick={() => router.push('/domain-selection')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Select Domain
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-${currentDomain.color}-100 text-${currentDomain.color}-800 mb-4`}>
            <Globe className="w-5 h-5" />
            {currentDomain.name} Domain
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Skill Gap Analysis</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Let's analyze your current skills and identify gaps to help you succeed in {currentDomain.name.toLowerCase()}
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[
              { id: 'background', name: 'Background', icon: Brain },
              { id: 'analysis', name: 'Analysis', icon: Zap },
              { id: 'results', name: 'Results', icon: Target }
            ].map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep === step.id 
                    ? `bg-${currentDomain.color}-600 text-white` 
                    : currentStep === 'results' && step.id !== 'results'
                      ? `bg-${currentDomain.color}-200 text-${currentDomain.color}-800`
                      : 'bg-gray-200 text-gray-600'
                }`}>
                  <step.icon className="w-5 h-5" />
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep === step.id ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {step.name}
                </span>
                {index < 2 && (
                  <ArrowRight className="w-4 h-4 text-gray-400 mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Background Information Form */}
        {currentStep === 'background' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Tell Us About Your Background</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Graduation Year
                </label>
                <input
                  type="number"
                  value={formData.graduationYear}
                  onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 2020"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Degree/Qualification
                </label>
                <input
                  type="text"
                  value={formData.degree}
                  onChange={(e) => handleInputChange('degree', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={`e.g., ${selectedDomain === 'medicine' ? 'MBBS' : selectedDomain === 'engineering' ? 'B.Tech Computer Science' : selectedDomain === 'commerce' ? 'BBA/MBA' : selectedDomain === 'arts' ? 'BFA' : 'B.Sc'}`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Worked
                </label>
                <select
                  value={formData.lastWorked}
                  onChange={(e) => handleInputChange('lastWorked', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select...</option>
                  <option value="currently-working">Currently Working</option>
                  <option value="1-year-ago">1 Year Ago</option>
                  <option value="2-3-years-ago">2-3 Years Ago</option>
                  <option value="3-5-years-ago">3-5 Years Ago</option>
                  <option value="5-plus-years-ago">5+ Years Ago</option>
                  <option value="never-worked">Never Worked in {currentDomain.name}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Previous Role
                </label>
                <input
                  type="text"
                  value={formData.previousRole}
                  onChange={(e) => handleInputChange('previousRole', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={`e.g., ${
                    selectedDomain === 'medicine' ? 'Junior Doctor' : 
                    selectedDomain === 'engineering' ? 'Software Developer' : 
                    selectedDomain === 'commerce' ? 'Business Analyst' : 
                    selectedDomain === 'arts' ? 'Graphic Designer' : 
                    'Research Assistant'
                  }`}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Role
                </label>
                <input
                  type="text"
                  value={formData.targetRole}
                  onChange={(e) => handleInputChange('targetRole', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={`What ${selectedDomain} role are you targeting?`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Learning Time
                </label>
                <select
                  value={formData.preferredLearningTime}
                  onChange={(e) => handleInputChange('preferredLearningTime', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select...</option>
                  <option value="1-2-hours-daily">1-2 hours daily</option>
                  <option value="3-4-hours-daily">3-4 hours daily</option>
                  <option value="part-time-weekends">Part-time (weekends)</option>
                  <option value="full-time">Full-time learning</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Skill Level
                </label>
                <select
                  value={formData.currentSkillLevel}
                  onChange={(e) => handleInputChange('currentSkillLevel', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select...</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={runSkillGapAnalysis}
                disabled={!formData.graduationYear || !formData.degree || !formData.targetRole}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                Analyze Skills
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Analysis Loading */}
        {currentStep === 'analysis' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-lg p-12 text-center"
          >
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Analyzing Your {currentDomain.name} Skills</h2>
            <p className="text-gray-600">
              We're evaluating your background against current {currentDomain.name.toLowerCase()} industry requirements...
            </p>
            <div className="mt-6 space-y-2">
              <div className="text-sm text-gray-500">Analyzing industry trends...</div>
              <div className="text-sm text-gray-500">Comparing skill requirements...</div>
              <div className="text-sm text-gray-500">Generating personalized recommendations...</div>
            </div>
          </motion.div>
        )}

        {/* Results */}
        {currentStep === 'results' && analysisResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Skill Gap Score */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Your {currentDomain.name} Skill Gap Score</h2>
                <div className={`text-6xl font-bold text-${currentDomain.color}-600 mb-4`}>
                  {analysisResults.skillGapScore}%
                </div>
                <p className="text-gray-600">
                  Based on current {currentDomain.name.toLowerCase()} industry standards
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">{analysisResults.currentSkills}</div>
                  <div className="text-sm text-gray-600">Current Skills</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <AlertCircle className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-yellow-600">{analysisResults.skillsToUpdate}</div>
                  <div className="text-sm text-gray-600">Need Updates</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <Target className="w-8 h-8 text-red-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-red-600">{analysisResults.newSkillsToLearn}</div>
                  <div className="text-sm text-gray-600">New Skills Needed</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-lg font-bold text-blue-600">{analysisResults.estimatedTimeToUpskill}</div>
                  <div className="text-sm text-gray-600">Est. Time to Upskill</div>
                </div>
              </div>
            </div>

            {/* Industry Trends */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-blue-500" />
                Current {currentDomain.name} Industry Trends
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {analysisResults.industryTrends.map((trend, index) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                    <div className="font-semibold text-gray-900">{trend}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skill Categories */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-green-500" />
                Skill Categories Assessment
              </h3>
              <div className="space-y-6">
                {analysisResults.skillCategories.map((category, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(category.status)}
                        <h4 className="text-lg font-semibold text-gray-900">{category.category}</h4>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(category.priority)}`}>
                        {category.priority} Priority
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {category.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {category.timeRequired}
                      </span>
                      <span className="capitalize">Status: {category.status.replace('-', ' ')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Learning Path */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Target className="w-6 h-6 text-purple-500" />
                Recommended Learning Path
              </h3>
              <div className="space-y-4">
                {analysisResults.recommendedPath.map((phase, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{phase.phase}</h4>
                      <p className="text-gray-600 text-sm">{phase.focus}</p>
                    </div>
                    <div className="text-sm font-medium text-blue-600">
                      {phase.duration}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Ready to Start Your {currentDomain.name} Journey?</h3>
                <p className="text-blue-100">
                  Based on your analysis, we've created a personalized learning roadmap for you.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => router.push(`/roadmap?domain=${selectedDomain}`)}
                  className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 flex items-center justify-center gap-2"
                >
                  View Learning Roadmap
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => router.push(`/dashboard?domain=${selectedDomain}`)}
                  className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 flex items-center justify-center gap-2"
                >
                  Go to Dashboard
                  <Users className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}