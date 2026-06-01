// app/api/analyzeUser/route.js
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Sleep function for retry logic
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAYS = [1000, 2000, 4000];

async function callGeminiWithRetry(prompt, retryCount = 0) {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        maxOutputTokens: 2000,
        temperature: 0.7,
      },
    });

    console.log(`🔹 Analysis attempt ${retryCount + 1}`);
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiResponse = response.text();
    
    console.log(`✅ Analysis successful on attempt ${retryCount + 1}`);
    return aiResponse;
    
  } catch (error) {
    console.log(`❌ Analysis attempt ${retryCount + 1} failed:`, error.message);
    
    if (error.status === 503 && retryCount < MAX_RETRIES - 1) {
      const delay = RETRY_DELAYS[retryCount];
      console.log(`⏳ Waiting ${delay}ms before retry...`);
      await sleep(delay);
      return callGeminiWithRetry(prompt, retryCount + 1);
    }
    
    throw error;
  }
}

function generateFallbackAnalysis(userData) {
  const { domain, awarenessLevel, subCategory } = userData;
  
  // Generate fallback analysis based on input data
  const mindsetTypes = {
    'engineering': 'Analytical and Problem-Solving',
    'medicine': 'Caring and Detail-Oriented', 
    'commerce': 'Strategic and Results-Driven',
    'arts': 'Creative and Expressive',
    'science': 'Curious and Research-Oriented'
  };

  const learningStyles = {
    'beginner': 'Structured and Step-by-step',
    'intermediate': 'Practical and Project-based',
    'skill-gap': 'Focused and Update-oriented',
    'exploration': 'Exploratory and Discovery-based'
  };

  return {
    mindsetType: mindsetTypes[domain] || 'Analytical and Goal-Oriented',
    learningStyle: learningStyles[subCategory] || 'Structured and Comprehensive',
    careerMatch: Math.floor(Math.random() * 20) + 80 + '%', // 80-99%
    roadmapType: awarenessLevel === 'not-aware' ? 'Exploratory' : 'Targeted',
    recommendedPath: `${domain} - ${subCategory} track`,
    keyStrengths: [
      'Strong foundational knowledge',
      'Goal-oriented mindset',
      'Adaptable learning approach'
    ],
    suggestedSkills: domain === 'engineering' ? 
      ['Programming', 'Problem Solving', 'System Design'] :
      domain === 'medicine' ? 
      ['Clinical Skills', 'Research Methods', 'Patient Care'] :
      ['Communication', 'Analysis', 'Leadership'],
    roadmapPrompt: generateRoadmapPrompt(userData)
  };
}

function generateRoadmapPrompt(userData) {
  const { domain, awarenessLevel, subCategory, careerGoals, graduationYear, fullName } = userData;
  
  let basePrompt = `Generate a comprehensive, interactive career roadmap for a user with the following profile:

DOMAIN: ${domain}
AWARENESS LEVEL: ${awarenessLevel}
SUBCATEGORY: ${subCategory}
USER NAME: ${fullName || 'User'}`;

  if (careerGoals) {
    basePrompt += `\nCAREER GOALS: ${careerGoals}`;
  }

  if (graduationYear) {
    basePrompt += `\nGRADUATION YEAR: ${graduationYear} (${2024 - graduationYear} years since graduation)`;
  }

  basePrompt += `\n\nCREATE A ROADMAP THAT INCLUDES:
1. Phase-wise learning structure (3-6 phases)
2. Specific skills to develop at each phase
3. Recommended resources and courses
4. Practical projects and milestones
5. Industry-relevant certifications
6. Networking and career development activities
7. Timeline estimates for each phase
8. Skills gap analysis (if applicable)
9. Current market trends and opportunities

FORMAT: Return a structured JSON-like format that can be easily parsed for roadmap visualization.`;

  return basePrompt;
}

export async function POST(request) {
  try {
    console.log('🔹 User Analysis API called');
    
    const userData = await request.json();
    console.log('🔹 Analyzing user data:', {
      domain: userData.domain,
      awarenessLevel: userData.awarenessLevel,
      subCategory: userData.subCategory
    });

    // Validate required data
    if (!userData.domain || !userData.awarenessLevel) {
      return NextResponse.json({
        success: false,
        error: 'Missing required user data'
      }, { status: 400 });
    }

    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      console.log('❌ Gemini API key not configured, using fallback');
      const fallbackAnalysis = generateFallbackAnalysis(userData);
      return NextResponse.json({
        success: true,
        analysis: fallbackAnalysis,
        source: 'fallback'
      });
    }

    try {
      // Create analysis prompt based on user category
      let analysisPrompt = '';

      if (userData.subCategory === 'exploration') {
        analysisPrompt = `Analyze this user profile for career exploration in ${userData.domain}:

USER PROFILE:
- Domain: ${userData.domain}
- Awareness Level: Complete beginner (${userData.awarenessLevel})
- Career Goals: ${userData.careerGoals || 'To be discovered'}
- Name: ${userData.fullName || 'User'}

ANALYZE AND PROVIDE:
1. MINDSET ANALYSIS: Determine learning style and personality traits based on their interest in ${userData.domain}
2. CAREER EXPLORATION: Suggest 3-5 specific career paths within ${userData.domain}
3. LEARNING APPROACH: Recommend the best learning methodology
4. SKILLS FRAMEWORK: Essential skills they should develop
5. ROADMAP TYPE: Structured exploration path

Return analysis in this format:
{
  "mindsetType": "Primary personality/learning trait",
  "learningStyle": "Recommended learning approach", 
  "careerMatch": "85%",
  "roadmapType": "Exploratory/Structured",
  "recommendedPaths": ["career1", "career2", "career3"],
  "keyStrengths": ["strength1", "strength2"],
  "suggestedSkills": ["skill1", "skill2", "skill3"],
  "roadmapPrompt": "Detailed prompt for roadmap generation"
}`;

      } else if (userData.subCategory === 'beginner') {
        analysisPrompt = `Analyze this beginner user profile in ${userData.domain}:

USER PROFILE:
- Domain: ${userData.domain}
- Level: Beginner (knows goal, needs path)
- Career Goals: ${userData.careerGoals}
- Name: ${userData.fullName}

PROVIDE MINDSET AND LEARNING ANALYSIS:
1. Assess their goal clarity and motivation level
2. Determine optimal learning sequence and methodology
3. Identify key skills gaps to address
4. Recommend structured learning path
5. Suggest assessment and milestone checkpoints

Focus on creating a goal-oriented, structured approach since they know what they want but need guidance on execution.

Return structured analysis with mindsetType, learningStyle, careerMatch, roadmapType, keyStrengths, suggestedSkills, and detailed roadmapPrompt.`;

      } else if (userData.subCategory === 'intermediate') {
        analysisPrompt = `Analyze this intermediate user profile in ${userData.domain}:

USER PROFILE:
- Domain: ${userData.domain}
- Level: Intermediate (has experience/projects)
- Resume Uploaded: ${userData.uploadedFile ? 'Yes' : 'No'}
- Career Goals: ${userData.careerGoals}

ANALYZE FOR SKILL ADVANCEMENT:
1. Assess current skill level and experience gaps
2. Identify areas for specialization and growth
3. Recommend advanced learning paths and certifications
4. Suggest portfolio enhancement strategies
5. Career advancement opportunities

Since they have experience, focus on skill enhancement, specialization, and career progression strategies.

Return analysis focusing on advancement opportunities and skill enhancement.`;

      } else if (userData.subCategory === 'skill-gap') {
        analysisPrompt = `Analyze this skill-gap user profile in ${userData.domain}:

USER PROFILE:
- Domain: ${userData.domain}
- Graduation Year: ${userData.graduationYear}
- Years Since Graduation: ${userData.graduationYear ? 2024 - userData.graduationYear : 'Unknown'}
- Career Goals: ${userData.careerGoals}
- Current Status: Need to update skills to current standards

SKILL GAP ANALYSIS:
1. Identify technology and methodology changes since graduation
2. Assess current market demands vs. their likely outdated knowledge
3. Prioritize skills that need immediate updating
4. Create catch-up learning plan with modern tools and practices
5. Bridge knowledge gaps efficiently

Focus on updating outdated skills and bringing them current with industry standards.

Return analysis emphasizing skill updates and modern practices.`;
      }

      // Call Gemini API
      const aiAnalysis = await callGeminiWithRetry(analysisPrompt);
      
      // Try to parse the AI response as JSON, fallback if needed
      let parsedAnalysis;
      try {
        // Extract JSON from the response if it's wrapped in text
        const jsonMatch = aiAnalysis.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsedAnalysis = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('No JSON found in response');
        }
      } catch (parseError) {
        console.log('❌ Failed to parse AI response, using fallback');
        parsedAnalysis = generateFallbackAnalysis(userData);
        parsedAnalysis.aiResponse = aiAnalysis; // Include raw response
      }

      // Ensure roadmap prompt is included
      if (!parsedAnalysis.roadmapPrompt) {
        parsedAnalysis.roadmapPrompt = generateRoadmapPrompt(userData);
      }

      return NextResponse.json({
        success: true,
        analysis: parsedAnalysis,
        source: 'gemini'
      });

    } catch (geminiError) {
      console.log('❌ Gemini analysis failed, using intelligent fallback');
      console.error('Gemini error:', geminiError.message);
      
      const fallbackAnalysis = generateFallbackAnalysis(userData);
      return NextResponse.json({
        success: true,
        analysis: fallbackAnalysis,
        source: 'fallback',
        note: 'Analysis completed using offline intelligence while AI systems are being updated.'
      });
    }

  } catch (error) {
    console.error('❌ Analysis API Error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Analysis failed. Please try again.',
      source: 'error'
    }, { status: 500 });
  }
}