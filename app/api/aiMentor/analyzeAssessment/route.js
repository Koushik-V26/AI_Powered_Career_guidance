// app/api/analyzeAssessment/route.js
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { domain, level, traits, answers, userData } = await request.json()
    
    // Analyze traits to determine mindset and learning style
    const topTraits = Object.entries(traits)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([trait]) => trait)
    
    // Determine mindset type based on top traits
    let mindsetType = 'Balanced Learner'
    if (topTraits.includes('analytical') && topTraits.includes('systematic')) {
      mindsetType = 'Analytical Problem Solver'
    } else if (topTraits.includes('creative') && topTraits.includes('innovative')) {
      mindsetType = 'Creative Innovator'
    } else if (topTraits.includes('social') && topTraits.includes('collaborative')) {
      mindsetType = 'Collaborative Leader'
    } else if (topTraits.includes('practical') && topTraits.includes('goal_oriented')) {
      mindsetType = 'Practical Achiever'
    }
    
    // Determine learning style
    let learningStyle = 'Adaptive Learner'
    if (topTraits.includes('visual') && topTraits.includes('creative')) {
      learningStyle = 'Visual Creative Learner'
    } else if (topTraits.includes('analytical') && topTraits.includes('methodical')) {
      learningStyle = 'Analytical Methodical Learner'
    } else if (topTraits.includes('collaborative') && topTraits.includes('social')) {
      learningStyle = 'Social Collaborative Learner'
    } else if (topTraits.includes('practical') && topTraits.includes('hands_on')) {
      learningStyle = 'Practical Hands-on Learner'
    }
    
    const analysis = {
      mindsetType,
      learningStyle,
      domain,
      level,
      topTraits,
      careerMatch: Math.floor(Math.random() * 20) + 80 + '%', // 80-99%
      roadmapPrompt: `Create a personalized learning roadmap for a ${mindsetType} in ${domain} who prefers ${learningStyle} approach.`,
      userName: userData?.fullName || 'User',
      timestamp: new Date().toISOString()
    }
    
    return NextResponse.json({
      success: true,
      analysis
    })
  } catch (error) {
    console.error('Assessment analysis error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to analyze assessment' },
      { status: 500 }
    )
  }
}

// app/api/processResume/route.js
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')
    const domain = formData.get('domain')
    const level = formData.get('level')
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file uploaded' },
        { status: 400 }
      )
    }
    
    // In a real implementation, you would:
    // 1. Extract text from PDF/DOC using libraries like pdf-parse or mammoth
    // 2. Use Gemini API to analyze the text and extract skills
    // 3. Generate personalized recommendations
    
    // Mock analysis for now
    const mockSkills = {
      engineering: [
        'JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'AWS',
        'Problem Solving', 'Algorithm Design', 'System Architecture'
      ],
      medicine: [
        'Clinical Research', 'Patient Care', 'Medical Writing', 'Data Analysis',
        'Healthcare Management', 'Medical Ethics', 'Diagnostic Skills'
      ],
      commerce: [
        'Financial Analysis', 'Business Strategy', 'Market Research', 'Excel',
        'Project Management', 'Communication', 'Sales', 'Marketing'
      ],
      arts: [
        'Graphic Design', 'Adobe Creative Suite', 'Typography', 'Branding',
        'UI/UX Design', 'Creative Writing', 'Digital Marketing'
      ],
      science: [
        'Research Methods', 'Data Analysis', 'Laboratory Skills', 'Statistical Analysis',
        'Scientific Writing', 'Experiment Design', 'Critical Thinking'
      ]
    }
    
    const extractedSkills = mockSkills[domain] || mockSkills.engineering
    
    const analysis = {
      fileName: file.name,
      fileSize: file.size,
      extractedSkills: extractedSkills.slice(0, 8), // Top 8 skills
      experienceLevel: 'Intermediate',
      strengthAreas: extractedSkills.slice(0, 3),
      improvementAreas: ['Communication', 'Leadership', 'Advanced Technical Skills'],
      careerRecommendations: [
        `Senior ${domain} Specialist`,
        `${domain} Team Lead`,
        `${domain} Consultant`
      ],
      learningPriorities: [
        'Advanced technical skills in your domain',
        'Leadership and management skills',
        'Industry-specific certifications',
        'Communication and presentation skills'
      ],
      roadmapGenerated: true,
      domain,
      level,
      timestamp: new Date().toISOString()
    }
    
    return NextResponse.json({
      success: true,
      analysis
    })
  } catch (error) {
    console.error('Resume processing error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process resume' },
      { status: 500 }
    )
  }
}

// app/api/generateRoadmap/route.js
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { prompt, domain, mindsetType, learningStyle } = await request.json()
    
    // Mock roadmap generation - in real implementation, use Gemini API
    const roadmapTemplates = {
      engineering: {
        title: 'Engineering Career Roadmap',
        phases: [
          {
            id: 1,
            title: 'Foundation & Programming Basics',
            duration: '2-3 months',
            skills: ['Programming Fundamentals', 'Data Structures', 'Algorithms', 'Version Control'],
            milestones: ['Complete coding bootcamp', 'Build 3 projects', 'Contribute to open source'],
            description: 'Establish strong programming foundation'
          },
          {
            id: 2,
            title: 'Advanced Development',
            duration: '3-4 months',
            skills: ['Framework Mastery', 'Database Design', 'API Development', 'Testing'],
            milestones: ['Full-stack application', 'API integration', 'Database optimization'],
            description: 'Develop advanced technical skills'
          },
          {
            id: 3,
            title: 'Specialization & System Design',
            duration: '4-5 months',
            skills: ['System Architecture', 'Cloud Technologies', 'DevOps', 'Performance Optimization'],
            milestones: ['Scalable system design', 'Cloud deployment', 'Performance monitoring'],
            description: 'Master system design and specialization'
          },
          {
            id: 4,
            title: 'Professional Development',
            duration: '2-3 months',
            skills: ['Team Collaboration', 'Code Review', 'Mentoring', 'Technical Leadership'],
            milestones: ['Lead a project', 'Mentor junior developers', 'Technical presentations'],
            description: 'Develop leadership and soft skills'
          },
          {
            id: 5,
            title: 'Career Launch',
            duration: '1-2 months',
            skills: ['Interview Preparation', 'Portfolio Development', 'Networking', 'Salary Negotiation'],
            milestones: ['Complete portfolio', 'Job applications', 'Interview success'],
            description: 'Launch your engineering career'
          }
        ]
      }
      // Add other domain templates...
    }
    
    const roadmap = roadmapTemplates[domain] || roadmapTemplates.engineering
    
    // Customize based on mindset and learning style
    roadmap.customizedFor = {
      mindsetType,
      learningStyle,
      domain
    }
    
    return NextResponse.json({
      success: true,
      roadmap
    })
  } catch (error) {
    console.error('Roadmap generation error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate roadmap' },
      { status: 500 }
    )
  }
}