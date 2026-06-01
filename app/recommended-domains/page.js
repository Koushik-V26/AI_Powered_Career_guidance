// app/recommended-domains/page.js
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function RecommendedDomains() {
  const router = useRouter()
  const [assessmentData, setAssessmentData] = useState(null)
  const [selectedDomain, setSelectedDomain] = useState(null)

  // Mapping of fields for each domain
  const domainFields = {
    engineering: [
      "Software Development",
      "Mechanical Engineering",
      "Civil Engineering",
      "Electrical Engineering",
      "Data Science"
    ],
    medicine: [
      "General Physician",
      "Surgery",
      "Psychiatry",
      "Nursing",
      "Biotechnology"
    ],
    commerce: [
      "Accounting",
      "Finance",
      "Marketing",
      "Entrepreneurship",
      "Business Analytics"
    ],
    arts: [
      "Literature",
      "Performing Arts",
      "Design",
      "History",
      "Journalism"
    ],
    science: [
      "Physics",
      "Chemistry",
      "Biology",
      "Research",
      "Environmental Science"
    ]
  }

  // Random percentage generator
  const getRandomPercentage = () => Math.floor(Math.random() * 41) + 60 // 60–100%

  useEffect(() => {
    const storedAssessment = localStorage.getItem('assessmentResults')
    if (storedAssessment) {
      const data = JSON.parse(storedAssessment)
      setAssessmentData(data)
      setSelectedDomain(data.domain)
    } else {
      router.push('/assessment')
    }
  }, [router])

  const proceedToDashboard = () => {
    if (selectedDomain && assessmentData) {
      // ✅ Always overwrite the domain inside assessmentResults
        const updatedData = {
        ...assessmentData,
        domain: selectedDomain,
        analysis: {
            ...(assessmentData.analysis || {}),
            domain: selectedDomain
        }
        }
        localStorage.setItem('assessmentResults', JSON.stringify(updatedData))
    }
    router.push('/dashboard')
    }

  if (!assessmentData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading recommendations...</p>
        </div>
      </div>
    )
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
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Recommended Fields
          </h1>
          <p className="text-xl text-gray-600">
            Here are the fields you can explore in your selected domain
          </p>
        </motion.div>

        {/* Recommended Fields */}
        {selectedDomain && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Fields in {selectedDomain.charAt(0).toUpperCase() + selectedDomain.slice(1)}
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {domainFields[selectedDomain]?.map((field, idx) => {
                const percentage = getRandomPercentage()
                const barColor =
                  percentage >= 85 ? 'bg-green-500' :
                  percentage >= 75 ? 'bg-yellow-500' :
                  'bg-red-500'

                return (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">{field}</span>
                      <span className="text-sm font-semibold text-gray-700">{percentage}% match</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`${barColor} h-2 rounded-full`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </motion.li>
                )
              })}
            </ul>
          </div>
        )}

        {/* Continue Button */}
        <div className="text-center">
          <p className="text-gray-600 mb-6">
            Selected domain: <span className="font-semibold capitalize">
              {selectedDomain || assessmentData.domain}
            </span>
          </p>
          <button
            onClick={proceedToDashboard}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 inline-flex items-center gap-2"
          >
            Continue to Dashboard
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}