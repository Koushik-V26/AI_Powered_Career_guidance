// FILE: app/awareness-selection/page.jsx (UPDATED)

'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowLeft, HelpCircle, Target, Brain } from 'lucide-react'

export default function AwarenessSelection() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [selectedDomain, setSelectedDomain] = useState('')

  useEffect(() => {
    const domain = searchParams.get('domain')
    if (domain) {
      setSelectedDomain(domain)
    }
  }, [searchParams])

  const domainInfo = {
    engineering: { name: 'Engineering', color: 'blue' },
    medicine: { name: 'Medicine', color: 'red' },
    commerce: { name: 'Commerce', color: 'green' },
    arts: { name: 'Arts', color: 'purple' },
    science: { name: 'Science', color: 'orange' }
  }

  const currentDomain = domainInfo[selectedDomain] || { name: 'Selected Domain', color: 'blue' }

  const handlePathSelection = (path) => {
    if (path === 'not-aware') {
      // FIXED: Navigate directly to AI Career Assessment
      router.push(`/assessment?domain=${selectedDomain}`)
    } else {
      router.push(`/experience-level?domain=${selectedDomain}&aware=true`)
    }
  }

  const goBack = () => {
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="mb-4">
            <span className={`inline-flex items-center px-4 py-2 rounded-full bg-${currentDomain.color}-100 text-${currentDomain.color}-800 text-sm font-medium`}>
              Selected: {currentDomain.name}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Tell us about your background
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            This helps us create the most suitable career guidance and learning path for you
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* NOT AWARE Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group cursor-pointer rounded-2xl border-2 transition-all duration-300 hover:shadow-xl hover:scale-105 border-gray-200 bg-white hover:border-orange-300"
            onClick={() => handlePathSelection('not-aware')}
          >
            <div className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <HelpCircle className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">NOT AWARE</h2>
                <p className="text-gray-600">Complete Beginner / Exploring Options</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-white p-4 rounded-lg border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-2">Perfect if you:</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Have little to no knowledge about {currentDomain.name}
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Want to explore career opportunities in this field
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Need guidance on which career path to choose
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border border-orange-200">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <Brain className="w-4 h-4 mr-2 text-orange-600" />
                    What you'll get:
                  </h3>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Career exploration and discovery</li>
                    <li>• Interest and aptitude assessment</li>
                    <li>• Multiple career path options</li>
                    <li>• Foundational learning roadmap</li>
                  </ul>
                </div>
              </div>

              <button className="w-full py-3 px-6 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
                Start AI Career Assessment
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* AWARE Section - Keep exactly the same */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="group cursor-pointer rounded-2xl border-2 transition-all duration-300 hover:shadow-xl hover:scale-105 border-gray-200 bg-white hover:border-blue-300"
            onClick={() => handlePathSelection('aware')}
          >
            <div className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">AWARE</h2>
                <p className="text-gray-600">Have Some Background / Clear Goals</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-white p-4 rounded-lg border border-gray-100">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-green-600 font-bold text-sm">1</span>
                    </div>
                    <h3 className="font-semibold text-gray-900">Beginner</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Know your goal but need guidance on how to achieve it</p>
                  <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded inline-block">
                    AI Assessment → Personalized Roadmap
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-100">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold text-sm">2</span>
                    </div>
                    <h3 className="font-semibold text-gray-900">Intermediate</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Have projects, experience, or resume to analyze</p>
                  <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded inline-block">
                    Resume Analysis → Skill-based Roadmap
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-100">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-purple-600 font-bold text-sm">3</span>
                    </div>
                    <h3 className="font-semibold text-gray-900">Skill Gap</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Completed studies years ago, need skill updates</p>
                  <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded inline-block">
                    Gap Analysis → Update Roadmap
                  </div>
                </div>
              </div>

              <button className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
                Choose Experience Level
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-between items-center"
        >
          <button
            onClick={goBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Choose Different Domain
          </button>

          <div className="text-sm text-gray-500 text-center">
            <p>Not sure which option fits you?</p>
            <button className="text-blue-600 hover:text-blue-700 underline">
              Take our quick assessment
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}