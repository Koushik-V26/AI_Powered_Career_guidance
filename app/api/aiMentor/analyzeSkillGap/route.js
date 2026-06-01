// app/api/analyzeSkillGap/route.js
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { domain, level, lastStudied, currentRole, yearsExperience, specificSkills, careerGoals, timeCommitment } = await request.json()
    
    const currentYear = new Date().getFullYear()
    const lastStudiedYear = parseInt(lastStudied) || currentYear - 5
    const yearsGap = currentYear - lastStudiedYear

    const industryTrendsByDomain = {
      engineering: ['AI/ML Integration', 'Cloud-Native Development', 'DevOps & CI/CD', 'Microservices Architecture'],
      medicine: ['Telemedicine', 'AI Diagnostics', 'Precision Medicine', 'Digital Health Records'],
      commerce: ['Digital Transformation', 'Data Analytics', 'E-commerce Platforms', 'Blockchain Technology'],
      arts: ['UI/UX Design', 'Motion Graphics', 'AR/VR Design', 'Sustainable Design'],
      science: ['Big Data Analytics', 'Machine Learning', 'Bioinformatics', 'Climate Science']
    }

    const skillCategoriesByDomain = {
      engineering: [
        { category: 'Modern Frameworks', gap: 'High', priority: 'High' },
        { category: 'Cloud Technologies', gap: 'Medium', priority: 'High' },
        { category: 'DevOps Tools', gap: 'High', priority: 'Medium' },
        { category: 'AI/ML Basics', gap: 'Medium', priority: 'Low' }
      ],
      medicine: [
        { category: 'Digital Health Tools', gap: 'High', priority: 'High' },
        { category: 'Telemedicine Platforms', gap: 'Medium', priority: 'High' },
        { category: 'Health Data Analysis', gap: 'High', priority: 'Medium' },
        { category: 'Medical AI', gap: 'Medium', priority: 'Low' }
      ],
      commerce: [
        { category: 'Digital Marketing', gap: 'High', priority: 'High' },
        { category: 'Data Analytics', gap: 'Medium', priority: 'High' },
        { category: 'E-commerce Platforms', gap: 'High', priority: 'Medium' },
        { category: 'Business Intelligence', gap: 'Medium', priority: 'Medium' }
      ],
      arts: [
        { category: 'Digital Design Tools', gap: 'Medium', priority: 'High' },
        { category: 'UX/UI Design', gap: 'High', priority: 'High' },
        { category: 'Motion Graphics', gap: 'High', priority: 'Medium' },
        { category: 'Interactive Design', gap: 'Medium', priority: 'Low' }
      ],
      science: [
        { category: 'Data Science Tools', gap: 'High', priority: 'High' },
        { category: 'Statistical Software', gap: 'Medium', priority: 'High' },
        { category: 'Machine Learning', gap: 'High', priority: 'Medium' },
        { category: 'Research Platforms', gap: 'Medium', priority: 'Medium' }
      ]
    }

    const skillGapScore = Math.max(20, 95 - (yearsGap * 8))
    const estimatedTime = yearsGap > 3 ? `${yearsGap * 2}-${yearsGap * 3} months` : '3-6 months'

    const analysis = {
      domain,
      level,
      yearsGap,
      skillGapScore,
      industryTrends: industryTrendsByDomain[domain] || [],
      skillCategories: skillCategoriesByDomain[domain] || [],
      estimatedTimeToUpskill: estimatedTime,
      currentSkills: specificSkills ? specificSkills.split(',').length : 5,
      skillsToUpdate: skillCategoriesByDomain[domain]?.filter(s => s.gap === 'High').length || 3,
      priorityAreas: skillCategoriesByDomain[domain]?.filter(s => s.priority === 'High') || [],
      recommendedPath: `${domain} Skills Update Program`,
      lastStudied,
      currentRole,
      careerGoals,
      timeCommitment,
      timestamp: new Date().toISOString()
    }
    
    return NextResponse.json({
      success: true,
      analysis
    })
  } catch (error) {
    console.error('Skill gap analysis error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to analyze skill gap' },
      { status: 500 }
    )
  }
}