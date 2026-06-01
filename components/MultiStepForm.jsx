'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, User, Briefcase, Target, Loader } from 'lucide-react'

export default function MultiStepForm({ 
  selectedDomain, 
  isAware, 
  currentStep, 
  setCurrentStep, 
  formData, 
  setFormData 
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 2) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const completeData = {
      ...formData,
      domain: selectedDomain,
      isAware: isAware,
      timestamp: new Date().toISOString()
    }
    
    // Store in localStorage for demo purposes
    localStorage.setItem('onboardingData', JSON.stringify(completeData))
    
    setLoading(false)
    router.push('/dashboard')
  }

  // Step 3: Personal Information
  if (currentStep === 3) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <User className="text-primary-600" size={28} />
          <h2 className="text-3xl font-bold text-gray-900">Personal Information</h2>
        </div>
        <p className="text-gray-600 mb-8 text-lg">
          Tell us about yourself to personalize your experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              value={formData.fullName || ''}
              onChange={(e) => updateFormData('fullName', e.target.value)}
              className="input-field"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age
            </label>
            <input
              type="number"
              value={formData.age || ''}
              onChange={(e) => updateFormData('age', e.target.value)}
              className="input-field"
              placeholder="Your age"
              min="15"
              max="65"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              value={formData.location || ''}
              onChange={(e) => updateFormData('location', e.target.value)}
              className="input-field"
              placeholder="City, Country"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Education Level *
            </label>
            <select
              value={formData.educationLevel || ''}
              onChange={(e) => updateFormData('educationLevel', e.target.value)}
              className="input-field"
              required
            >
              <option value="">Select education level</option>
              <option value="high_school">High School</option>
              <option value="undergraduate">Undergraduate</option>
              <option value="graduate">Graduate</option>
              <option value="postgraduate">Postgraduate</option>
              <option value="phd">PhD</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Status
            </label>
            <select
              value={formData.currentStatus || ''}
              onChange={(e) => updateFormData('currentStatus', e.target.value)}
              className="input-field"
            >
              <option value="">Select your current status</option>
              <option value="student">Student</option>
              <option value="employed">Employed</option>
              <option value="unemployed">Unemployed</option>
              <option value="freelancer">Freelancer</option>
              <option value="entrepreneur">Entrepreneur</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <button onClick={handleBack} className="btn-secondary inline-flex items-center gap-2">
            <ArrowLeft size={20} /> Back
          </button>
          <button 
            onClick={handleNext} 
            className="btn-primary inline-flex items-center gap-2"
            disabled={!formData.fullName || !formData.educationLevel}
          >
            Continue <ArrowRight size={20} />
          </button>
        </div>
      </motion.div>
    )
  }

  // Step 4: Skills & Experience
  if (currentStep === 4) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <Briefcase className="text-primary-600" size={28} />
          <h2 className="text-3xl font-bold text-gray-900">Skills & Experience</h2>
        </div>
        <p className="text-gray-600 mb-8 text-lg">
          Help us understand your current capabilities and background.
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Technical Skills
            </label>
            <textarea
              value={formData.technicalSkills || ''}
              onChange={(e) => updateFormData('technicalSkills', e.target.value)}
              className="input-field h-24 resize-none"
              placeholder="List your technical skills (e.g., Python, JavaScript, Data Analysis, etc.)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Soft Skills
            </label>
            <textarea
              value={formData.softSkills || ''}
              onChange={(e) => updateFormData('softSkills', e.target.value)}
              className="input-field h-24 resize-none"
              placeholder="Describe your soft skills (e.g., Leadership, Communication, Problem-solving, etc.)"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Years of Experience
              </label>
              <select
                value={formData.experience || ''}
                onChange={(e) => updateFormData('experience', e.target.value)}
                className="input-field"
              >
                <option value="">Select experience level</option>
                <option value="0">No experience</option>
                <option value="1">Less than 1 year</option>
                <option value="2">1-2 years</option>
                <option value="5">3-5 years</option>
                <option value="10">5+ years</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Certifications
              </label>
              <input
                type="text"
                value={formData.certifications || ''}
                onChange={(e) => updateFormData('certifications', e.target.value)}
                className="input-field"
                placeholder="Any relevant certifications"
              />
            </div>
          </div>

          {isAware && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Previous Projects/Work
              </label>
              <textarea
                value={formData.projects || ''}
                onChange={(e) => updateFormData('projects', e.target.value)}
                className="input-field h-32 resize-none"
                placeholder="Describe any relevant projects, internships, or work experience"
              />
            </div>
          )}
        </div>

        <div className="flex justify-between mt-8">
          <button onClick={handleBack} className="btn-secondary inline-flex items-center gap-2">
            <ArrowLeft size={20} /> Back
          </button>
          <button onClick={handleNext} className="btn-primary inline-flex items-center gap-2">
            Continue <ArrowRight size={20} />
          </button>
        </div>
      </motion.div>
    )
  }

  // Step 5: Goals & Preferences
  if (currentStep === 5) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <Target className="text-primary-600" size={28} />
          <h2 className="text-3xl font-bold text-gray-900">Goals & Preferences</h2>
        </div>
        <p className="text-gray-600 mb-8 text-lg">
          Let us know your aspirations and learning preferences.
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Short-term Goals (6-12 months) *
            </label>
            <textarea
              value={formData.shortTermGoals || ''}
              onChange={(e) => updateFormData('shortTermGoals', e.target.value)}
              className="input-field h-24 resize-none"
              placeholder="What do you want to achieve in the next 6-12 months?"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Long-term Goals (2-5 years)
            </label>
            <textarea
              value={formData.longTermGoals || ''}
              onChange={(e) => updateFormData('longTermGoals', e.target.value)}
              className="input-field h-24 resize-none"
              placeholder="Where do you see yourself in 2-5 years?"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Learning Preference
              </label>
              <select
                value={formData.learningPreference || ''}
                onChange={(e) => updateFormData('learningPreference', e.target.value)}
                className="input-field"
              >
                <option value="">Select your preference</option>
                <option value="visual">Visual (Videos, Diagrams)</option>
                <option value="reading">Reading (Articles, Books)</option>
                <option value="practical">Hands-on (Projects, Labs)</option>
                <option value="mixed">Mixed Approach</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Available (hours/week)
              </label>
              <select
                value={formData.timeAvailable || ''}
                onChange={(e) => updateFormData('timeAvailable', e.target.value)}
                className="input-field"
              >
                <option value="">Select time commitment</option>
                <option value="5">Less than 5 hours</option>
                <option value="10">5-10 hours</option>
                <option value="20">10-20 hours</option>
                <option value="30">20+ hours</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Specific Interests
            </label>
            <textarea
              value={formData.specificInterests || ''}
              onChange={(e) => updateFormData('specificInterests', e.target.value)}
              className="input-field h-24 resize-none"
              placeholder="Any specific areas within your chosen domain that interest you?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Budget for Learning (Monthly)
            </label>
            <select
              value={formData.budget || ''}
              onChange={(e) => updateFormData('budget', e.target.value)}
              className="input-field"
            >
              <option value="">Select budget range</option>
              <option value="0">Free resources only</option>
              <option value="50">$1-$50</option>
              <option value="100">$51-$100</option>
              <option value="200">$101-$200</option>
              <option value="500">$200+</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <button onClick={handleBack} className="btn-secondary inline-flex items-center gap-2">
            <ArrowLeft size={20} /> Back
          </button>
          <button 
            onClick={handleNext} 
            className="btn-primary inline-flex items-center gap-2"
            disabled={loading || !formData.shortTermGoals}
          >
            {loading ? (
              <>
                <Loader size={20} className="animate-spin" /> Processing...
              </>
            ) : (
              <>
                Complete Setup <ArrowRight size={20} />
              </>
            )}
          </button>
        </div>
      </motion.div>
    )
  }

  return null
}