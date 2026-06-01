'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowLeft, Target, Upload, Clock, FileText, Brain, Award, CheckCircle, File, X } from 'lucide-react'
import Dashboard from '../dashboard/page'

export default function ExperienceLevel() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [selectedDomain, setSelectedDomain] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('')
  const [uploadedFile, setUploadedFile] = useState(null)
  const [isProcessingFile, setIsProcessingFile] = useState(false)
  const [currentStep, setCurrentStep] =
    useState("selection");
  const [extractedSkills, setExtractedSkills] =
    useState([]);

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

  const experienceLevels = [
    {
      id: 'beginner',
      title: 'Beginner',
      subtitle: 'I know my goal but need guidance',
      description: 'You are aware of your career goal but don\'t know the specific steps to achieve it. You need a structured learning path and skill assessment.',
      icon: Target,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      features: [
        'AI-powered career assessment',
        'Personalized skill evaluation',
        'Step-by-step learning roadmap',
        'Goal-oriented milestone tracking',
        'Industry-specific guidance'
      ],
      process: 'Assessment → Roadmap Generation',
      nextStep: 'Take AI Assessment',
      route: '/assessment',
      requiresUpload: false
    },
    {
      id: 'intermediate',
      title: 'Intermediate',
      subtitle: 'I have projects, experience, or resume',
      description: 'You have some projects, research papers, internships, or work experience. You can upload your resume for AI analysis to get skill-based recommendations.',
      icon: FileText,
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      features: [
        'Resume/CV analysis by AI',
        'Skill extraction and evaluation',
        'Experience-based roadmap',
        'Portfolio enhancement suggestions',
        'Career advancement strategies'
      ],
      process: 'Resume Upload → AI Analysis → Roadmap',
      nextStep: 'Upload Resume',
      route: '/resume-analysis',
      requiresUpload: true
    },
    {
      id: 'skill-gap',
      title: 'Skill Gap User',
      subtitle: 'Need to update outdated skills',
      description: 'You completed your studies some years ago but your skills may be outdated. Get AI-powered recommendations to bridge the gap with current industry standards.',
      icon: Clock,
      color: 'from-purple-500 to-violet-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      features: [
        'Current industry trend analysis',
        'Skill gap identification',
        'Technology update roadmap',
        'Modern tool recommendations',
        'Career re-entry guidance'
      ],
      process: 'Background Analysis → Gap Assessment → Update Plan',
      nextStep: 'Start Gap Analysis',
      route: '/skill-gap-analysis',
      requiresUpload: false
    }
  ]

  const handleLevelSelection = (level) => {
    setSelectedLevel(level.id)
    
    if (level.requiresUpload) {
      setCurrentStep('upload')
    } else {
      // Store selection and navigate
      localStorage.setItem('experienceLevel', JSON.stringify({
        domain: selectedDomain,
        level: level.id,
        timestamp: new Date().toISOString()
      }))
      
      router.push(`${level.route}?domain=${selectedDomain}&level=${level.id}`)
    }
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Check if the file is 0 bytes
      if (file.size === 0) {
        alert('Upload the valid resume')
        return
      }
      
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload a PDF or Word document (.pdf, .doc, .docx)')
        return
      }
      
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB')
        return
      }
      
      setUploadedFile(file)
    }
  }

  const removeFile = () => {
    setUploadedFile(null)
  }

  const processFile = async () => {
  if (!uploadedFile) return;

  setIsProcessingFile(true);
  setCurrentStep("processing");

  try {
    const formData = new FormData();
    formData.append("resume", uploadedFile);

    const response = await fetch(
      "/api/aiMentor/processResume",
      {
        method: "POST",
        body: formData
      }
    );

    const data = await response.json();

    // Handle API failure
    if (!response.ok) {
      throw new Error(
        data.error || "Resume parsing failed"
      );
    }

    console.log(
      "Extracted skills:",
      data.extractedSkills
    );

    // Save result
    localStorage.setItem(
      "resumeAnalysis",
      JSON.stringify({
        fileName: uploadedFile.name,
        extractedSkills:
          data.extractedSkills || [],
        domain: selectedDomain,
        level: selectedLevel,
        timestamp:
          new Date().toISOString()
      })
    );

    // Redirect after success
    setExtractedSkills(
      data.extractedSkills || []
      );

    setCurrentStep("results");

  } catch (error) {
    console.error(
      "Resume processing error:",
      error
    );

    alert(
      error.message ||
      "Resume analysis failed"
    );

    // Reset UI properly
    setCurrentStep("upload");
    setIsProcessingFile(false);
  } finally {
    setIsProcessingFile(false);
  }
};

  const goBack = () => {
    if (currentStep === 'upload') {
      setCurrentStep('selection')
      setSelectedLevel('')
      setUploadedFile(null)
    } else {
      router.push('/')
    }
  }

  // File Upload Step
  if (currentStep === 'upload') {
    const selectedLevelData = experienceLevels.find(level => level.id === selectedLevel)
    
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
                {currentDomain.name} • {selectedLevelData?.title}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Upload Your Resume
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Upload your resume or CV for AI analysis to extract skills and generate a personalized roadmap
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            {/* File Upload Area */}
            <div className="mb-8">
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  id="resume-upload"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                
                {!uploadedFile ? (
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Drop your resume here or click to browse
                    </h3>
                    <p className="text-gray-500">
                      Supported formats: PDF, DOC, DOCX (Max 5MB)
                    </p>
                  </label>
                ) : (
                  <div className="flex items-center justify-center gap-4">
                    <File className="w-8 h-8 text-blue-600" />
                    <div className="text-left">
                      <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                      <p className="text-sm text-gray-500">
                        {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      onClick={removeFile}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* File Processing Info */}
            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <h4 className="font-semibold text-blue-900 mb-4 flex items-center">
                <Brain className="w-5 h-5 mr-2" />
                What happens next?
              </h4>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-1 text-blue-600" />
                  AI analyzes your resume and extracts skills
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-1 text-blue-600" />
                  Identifies skill gaps in your chosen domain
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-1 text-blue-600" />
                  Generates personalized learning roadmap
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-1 text-blue-600" />
                  Suggests career advancement opportunities
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center">
              <button
                onClick={goBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Experience Level
              </button>

              <button
                onClick={processFile}
                disabled={!uploadedFile}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
              >
                Analyze Resume
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  // Processing Step
  if (currentStep === 'processing') {
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Analyzing Your Resume</h2>
            <div className="space-y-2 text-gray-600">
              <p>Extracting skills and experience...</p>
              <p>Analyzing your background...</p>
              <p>Generating personalized roadmap...</p>
              <p>Preparing your dashboard...</p>
            </div>
          </motion.div>
          
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <FileText className="w-6 h-6 text-blue-500" />
              <span className="font-medium">AI Resume Analysis</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Processing {uploadedFile?.name}...</p>
          </div>
        </div>
      </div>
    )
  }
  if (currentStep === "results") {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-4xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Resume Analysis Complete
          </h1>

          <p className="text-lg text-gray-600">
            We extracted the following skills from your resume
          </p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-xl p-8">

          <h3 className="text-xl font-semibold mb-6 text-gray-800">
            Extracted Skills
          </h3>

          <div className="flex flex-wrap gap-3 mb-8">
            {extractedSkills.length > 0 ? (
              extractedSkills.map((skill, index) => (
                <div
                  key={index}
                  className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium"
                >
                  {skill}
                </div>
              ))
            ) : (
              <p className="text-gray-500">
                No skills found
              </p>
            )}
          </div>

          <div className="flex justify-between items-center">

            <button
              onClick={() => {
                setCurrentStep("upload");
              }}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <button
              onClick={() => {

                localStorage.setItem(
                  "resumeAnalysis",
                  JSON.stringify({
                    fileName: uploadedFile?.name,
                    extractedSkills,
                    domain: selectedDomain,
                    level: selectedLevel,
                    timestamp:
                      new Date().toISOString()
                  })
                );

                router.push("/dashboard");
              }}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              Continue to Dashboard
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

  // Experience Level Selection Step
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="mb-4">
            <span className={`inline-flex items-center px-4 py-2 rounded-full bg-${currentDomain.color}-100 text-${currentDomain.color}-800 text-sm font-medium`}>
              {currentDomain.name} • AWARE Path
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose Your Experience Level
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select the option that best describes your current situation in {currentDomain.name}
          </p>
        </motion.div>

        {/* Experience Level Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {experienceLevels.map((level, index) => (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`
                group cursor-pointer rounded-2xl border-2 transition-all duration-300 hover:shadow-2xl hover:scale-105
                ${selectedLevel === level.id
                  ? `${level.borderColor} ${level.bgColor} shadow-xl scale-105`
                  : 'border-gray-200 bg-white hover:border-gray-300'
                }
              `}
              onClick={() => handleLevelSelection(level)}
            >
              <div className="p-8">
                {/* Icon and Title */}
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${level.color} rounded-xl flex items-center justify-center transform transition-transform group-hover:scale-110`}>
                    <level.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{level.title}</h3>
                  <p className="text-gray-600 font-medium">{level.subtitle}</p>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-center mb-6 leading-relaxed">
                  {level.description}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3 text-center">What you'll get:</h4>
                  <ul className="space-y-2">
                    {level.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-sm">
                        <div className={`w-2 h-2 bg-gradient-to-r ${level.color} rounded-full mt-2 mr-3 flex-shrink-0`}></div>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Process Flow */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Process:</h4>
                  <p className="text-xs text-gray-600">{level.process}</p>
                </div>

                {/* Action Button */}
                <button
                  className={`
                    w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2
                    bg-gradient-to-r ${level.color} hover:shadow-lg transform hover:translateY(-1px)
                  `}
                >
                  {level.nextStep}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Selection Indicator */}
              {selectedLevel === level.id && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-between items-center mt-8"
        >
          <button
            onClick={goBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="text-sm text-gray-500 text-center">
            <p>Need more information?</p>
            <button className="text-blue-600 hover:text-blue-700 underline">
              Get advices from our AI Mentor
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}