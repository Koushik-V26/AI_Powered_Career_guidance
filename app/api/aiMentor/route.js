// app/api/aiMentor/route.js
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    // Check if API key exists
    if (!process.env.GROQ_API_KEY) {
      console.error('GROQ_API_KEY environment variable is not set')
      return NextResponse.json(
        { error: 'AI service configuration error. Please check environment variables.' },
        { status: 500 }
      )
    }

    const { userInput, currentProgress } = await request.json()

    if (!userInput?.trim()) {
      return NextResponse.json(
        { error: 'User input is required' },
        { status: 400 }
      )
    }

    const modelName = 'llama-3.3-70b-versatile'

    // Create context-aware prompt
    const systemPrompt = `You are an AI Career Mentor with expertise in professional development, career transitions, and skill building. 

USER CONTEXT:
- Domain: ${currentProgress?.domain || 'General'}
- Mindset Type: ${currentProgress?.mindsetType || 'Growth'}
- Current Phase: ${currentProgress?.currentPhase || 1}
- Skills Acquired: ${currentProgress?.performanceData?.skillsAcquired || 0}
- Current Streak: ${currentProgress?.performanceData?.currentStreak || 0} days

PERSONALITY:
- Supportive and encouraging
- Practical and actionable
- Personalized to user's context
- Professional yet friendly

GUIDELINES:
1. Always provide actionable advice
2. Consider the user's current domain and progress
3. Be encouraging but realistic
4. Suggest specific next steps when appropriate
5. Ask follow-up questions to better understand their needs
6. Keep responses conversational and not too long (2-3 paragraphs max)`

    console.log('Attempting to generate Groq content...')
    
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY.trim()}`
      },
      body: JSON.stringify({
        model: modelName,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userInput }
        ],
        temperature: 0.7
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `Groq API returned status ${response.status}`);
    }

    const data = await response.json()
    const aiMessage = data.choices[0].message.content

    console.log('Successfully generated Groq response')
    
    return NextResponse.json({
      aiMessage,
      source: 'groq',
      modelUsed: modelName,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Groq API Error Details:', error.message)

    // Get userInput from the caught error context
    const body = await request.json().catch(() => ({ userInput: '', currentProgress: {} }))
    const fallbackResponse = getFallbackResponse(body.userInput, body.currentProgress)

    return NextResponse.json({
      aiMessage: fallbackResponse,
      source: 'fallback',
      note: 'AI is temporarily unavailable, but I can still help with general guidance!',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Service unavailable',
      timestamp: new Date().toISOString()
    })
  }
}

function getFallbackResponse(userInput, currentProgress) {
  const input = userInput?.toLowerCase() || ''
  const domain = currentProgress?.domain || 'your field'

  // Common career guidance patterns
  if (input.includes('stuck') || input.includes('motivation')) {
    return `Feeling stuck is completely normal in any career journey! Here are some strategies that work well:

1. **Break it down**: Focus on one small, achievable goal today
2. **Connect with others**: Reach out to professionals in ${domain} for advice
3. **Celebrate progress**: Look at how far you've come already

What specific area feels most challenging right now? I'd love to help you create a concrete next step.`
  }

  if (input.includes('skills') || input.includes('learn')) {
    return `Great question about skill development in ${domain}! The key is to focus on both technical skills and soft skills that employers value.

I'd recommend starting with the most in-demand skills in your area and building projects that showcase your abilities. Consider creating a learning schedule that dedicates time each day to skill building.

What specific skills are you most interested in developing? I can help you prioritize based on current market demand.`
  }

  if (input.includes('career change') || input.includes('transition')) {
    return `Career transitions can be exciting opportunities! The key is to leverage your existing skills while building new ones relevant to your target field.

Start by researching the requirements in your desired field, networking with professionals, and potentially gaining experience through projects or volunteer work.

What field are you considering transitioning to? I can help you identify transferable skills and create a transition plan.`
  }

  // Default response
  return `Thanks for your question! While I'm having some technical difficulties connecting to my advanced AI systems, I'm still here to help with career guidance.

Based on your ${domain} background, I'd be happy to discuss:
- Skill development strategies
- Career planning and goal setting  
- Professional networking tips
- Learning resources and next steps

Could you tell me more specifically what aspect of your career you'd like to focus on? This will help me provide more targeted advice.`
}