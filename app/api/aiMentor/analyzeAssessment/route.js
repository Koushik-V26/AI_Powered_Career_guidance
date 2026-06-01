import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { domain, level, traits, answers, userData } = await request.json()

    // Analyze traits to determine mindset and learning style
    const topTraits = Object.entries(traits)
      .sort(([, a], [, b]) => b - a)
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
      careerMatch: Math.floor(Math.random() * 20) + 80 + '%',
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