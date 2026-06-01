'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Stethoscope, Calculator, Palette, Microscope } from 'lucide-react'

const DomainSelection = () => {
  const [selectedDomain, setSelectedDomain] = useState('')
  const router = useRouter()

  const domains = [
    {
      id: 'engineering',
      name: 'Engineering',
      description: 'Software, Mechanical, Civil, Electrical, and other engineering fields',
      icon: BookOpen,
      color: 'from-blue-500 to-blue-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      careers: ['Software Engineer', 'Data Scientist', 'DevOps Engineer', 'AI/ML Engineer']
    },
    {
      id: 'medicine',
      name: 'Medicine',
      description: 'Healthcare, Medical practice, Research, and allied health sciences',
      icon: Stethoscope,
      color: 'from-red-500 to-red-700',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      careers: ['Doctor', 'Nurse', 'Medical Researcher', 'Healthcare Administrator']
    },
    {
      id: 'commerce',
      name: 'Commerce',
      description: 'Business, Finance, Marketing, Economics, and entrepreneurship',
      icon: Calculator,
      color: 'from-green-500 to-green-700',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      careers: ['Business Analyst', 'Financial Advisor', 'Marketing Manager', 'Entrepreneur']
    },
    {
      id: 'arts',
      name: 'Arts',
      description: 'Creative fields, Design, Literature, Music, and visual arts',
      icon: Palette,
      color: 'from-purple-500 to-purple-700',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      careers: ['Graphic Designer', 'Content Writer', 'UI/UX Designer', 'Digital Artist']
    },
    {
      id: 'science',
      name: 'Science',
      description: 'Research, Laboratory work, Environmental science, and pure sciences',
      icon: Microscope,
      color: 'from-orange-500 to-orange-700',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      careers: ['Research Scientist', 'Lab Technician', 'Environmental Consultant', 'Data Analyst']
    }
  ]

  const handleDomainSelect = (domain) => {
    setSelectedDomain(domain.id)
    // Navigate to awareness selection page with domain parameter
    router.push(`/awareness-selection?domain=${domain.id}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose Your Domain
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select your field of interest to get started with AI-powered career guidance and personalized learning roadmaps
          </p>
        </motion.div>

        {/* Domain Cards */}
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
                  ? `${domain.borderColor} ${domain.bgColor} shadow-xl scale-105` 
                  : 'border-gray-200 bg-white hover:border-gray-300'
                }
              `}
              onClick={() => handleDomainSelect(domain)}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-r ${domain.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
              
              <div className="relative p-8">
                {/* Icon */}
                <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-r ${domain.color} rounded-xl flex items-center justify-center transform transition-transform group-hover:scale-110`}>
                  <domain.icon className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
                  {domain.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-center mb-6 leading-relaxed">
                  {domain.description}
                </p>

                {/* Popular Careers */}
                <div className="space-y-2 mb-6">
                  <p className="text-sm font-semibold text-gray-700 text-center">Popular Careers:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {domain.careers.slice(0, 2).map((career, careerIndex) => (
                      <span 
                        key={careerIndex}
                        className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                      >
                        {career}
                      </span>
                    ))}
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                      +{domain.careers.length - 2} more
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  className={`
                    w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2
                    bg-gradient-to-r ${domain.color} hover:shadow-lg transform hover:translateY(-1px)
                  `}
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Selection Indicator */}
              {selectedDomain === domain.id && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Why Choose Our Platform */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 bg-white rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Why Our AI-Powered Career Guidance?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Mindset Analysis</h3>
              <p className="text-gray-600 text-sm">AI analyzes your personality and learning style to create personalized guidance</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Custom Roadmaps</h3>
              <p className="text-gray-600 text-sm">Get step-by-step learning paths tailored to your experience and goals</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Progress Tracking</h3>
              <p className="text-gray-600 text-sm">Monitor your growth with detailed analytics, streaks, and achievements</p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">
            Join thousands of professionals who have transformed their careers with our AI guidance
          </p>
          <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              10,000+ Career Roadmaps Generated
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              95% Success Rate
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              AI-Powered Insights
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default DomainSelection