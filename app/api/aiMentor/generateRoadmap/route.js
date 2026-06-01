// app/api/aiMentor/generateRoadmap/route.js
import { NextResponse } from 'next/server';

// Sleep function for retry logic
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAYS = [1000, 2000, 4000];

async function callGroqWithRetry(prompt, retryCount = 0) {
  try {
    console.log(`🔹 Roadmap generation attempt ${retryCount + 1}`);
    
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY.trim()}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "user", content: prompt }
        ],
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error?.message || `Groq API returned status ${response.status}`;
      
      // Retry on transient status codes like 429 (rate limit) or 503 (service unavailable)
      if ((response.status === 429 || response.status === 503) && retryCount < MAX_RETRIES - 1) {
        const delay = RETRY_DELAYS[retryCount];
        console.log(`⏳ Groq transient error ${response.status}. Waiting ${delay}ms before retry...`);
        await sleep(delay);
        return callGroqWithRetry(prompt, retryCount + 1);
      }
      
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log(`✅ Roadmap generation successful on attempt ${retryCount + 1}`);
    return data.choices[0].message.content;
    
  } catch (error) {
    console.log(`❌ Roadmap generation attempt ${retryCount + 1} failed:`, error.message);
    
    if (retryCount < MAX_RETRIES - 1) {
      const delay = RETRY_DELAYS[retryCount];
      console.log(`⏳ Waiting ${delay}ms before retry...`);
      await sleep(delay);
      return callGroqWithRetry(prompt, retryCount + 1);
    }
    
    throw error;
  }
}

function generateFallbackRoadmap(domain, mindsetType) {
  const fallbackRoadmaps = {
    engineering: {
      title: "Engineering Career Roadmap",
      totalPhases: 5,
      estimatedDuration: "12-18 months",
      phases: [
        {
          id: 1,
          title: "Foundation & Programming Basics",
          duration: "2-3 months",
          description: "Build strong programming fundamentals and logical thinking",
          skills: ["Programming Logic", "Data Types", "Control Structures", "Basic Algorithms"],
          milestones: ["Complete first programming course", "Build simple calculator", "Solve 50 coding problems"],
          resources: ["Online coding platforms", "Programming tutorials", "Practice websites"]
        },
        {
          id: 2,
          title: "Core Computer Science Concepts",
          duration: "3-4 months",
          description: "Master essential CS concepts and data structures",
          skills: ["Data Structures", "Algorithms", "Database Design", "Object-Oriented Programming"],
          milestones: ["Implement all basic data structures", "Complete algorithms course", "Build database project"],
          resources: ["CS textbooks", "Algorithm visualization tools", "Database tutorials"]
        },
        {
          id: 3,
          title: "Technology Specialization",
          duration: "3-4 months",
          description: "Focus on specific technology stack and frameworks",
          skills: ["Web Development", "Mobile Development", "Cloud Technologies", "DevOps Basics"],
          milestones: ["Build full-stack application", "Deploy to cloud", "Contribute to open source"],
          resources: ["Framework documentation", "Cloud platforms", "Open source projects"]
        },
        {
          id: 4,
          title: "Professional Skills Development",
          duration: "2-3 months",
          description: "Develop soft skills and professional competencies",
          skills: ["System Design", "Code Review", "Team Collaboration", "Technical Communication"],
          milestones: ["Design system architecture", "Lead code review session", "Give technical presentation"],
          resources: ["System design resources", "Communication workshops", "Professional development courses"]
        },
        {
          id: 5,
          title: "Career Preparation & Job Search",
          duration: "1-2 months",
          description: "Prepare for job search and interviews",
          skills: ["Interview Preparation", "Resume Building", "Portfolio Development", "Networking"],
          milestones: ["Optimize LinkedIn profile", "Complete portfolio website", "Apply to target companies"],
          resources: ["Interview prep platforms", "Resume templates", "Professional networking events"]
        }
      ]
    }
  };

  return fallbackRoadmaps[domain] || fallbackRoadmaps.engineering;
}

export async function POST(request) {
  try {
    console.log('🔹 Roadmap Generation API called');
    
    const { prompt, domain, mindsetType, learningStyle } = await request.json();
    
    // Validate required data
    if (!prompt || !domain) {
      return NextResponse.json({
        success: false,
        error: 'Missing required parameters'
      }, { status: 400 });
    }

    // Check if API key is configured
    if (!process.env.GROQ_API_KEY) {
      console.log('❌ Groq API key not configured, using fallback roadmap');
      const fallbackRoadmap = generateFallbackRoadmap(domain, mindsetType);
      return NextResponse.json({
        success: true,
        roadmap: fallbackRoadmap,
        source: 'fallback'
      });
    }

    try {
      // Enhanced prompt for roadmap generation
      const enhancedPrompt = `${prompt}

ADDITIONAL CONTEXT:
- Domain: ${domain}
- Mindset Type: ${mindsetType || 'Not specified'}
- Learning Style: ${learningStyle || 'Not specified'}

SPECIFIC REQUIREMENTS:
1. Create exactly 4-6 phases for the learning journey
2. Each phase should have:
   - Clear title and description
   - Realistic duration estimate
   - 4-6 specific skills to develop
   - 3-4 concrete milestones
   - 3-4 recommended resource types
3. Ensure progression is logical and builds upon previous phases
4. Tailor the complexity and approach to the specified mindset type
5. Include current industry trends and market demands
6. Make it actionable and specific to ${domain}

RETURN FORMAT:
Return a valid JSON structure with this exact format:
{
  "title": "Specific Career Path Title",
  "totalPhases": number,
  "estimatedDuration": "X-Y months total",
  "phases": [
    {
      "id": 1,
      "title": "Phase Title",
      "duration": "X-Y months",
      "description": "What this phase accomplishes",
      "skills": ["Skill1", "Skill2", "Skill3", "Skill4"],
      "milestones": ["Milestone1", "Milestone2", "Milestone3"],
      "resources": ["Resource1", "Resource2", "Resource3"]
    }
  ]
}

Generate a comprehensive, personalized roadmap now:`;

      // Call Groq API
      const aiResponse = await callGroqWithRetry(enhancedPrompt);
      
      // Try to parse the AI response as JSON
      let roadmapData;
      try {
        // Extract JSON from the response if it's wrapped in text
        const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          roadmapData = JSON.parse(jsonMatch[0]);
          
          // Validate the structure
          if (!roadmapData.phases || !Array.isArray(roadmapData.phases)) {
            throw new Error('Invalid roadmap structure');
          }
          
          // Ensure all phases have required fields
          roadmapData.phases = roadmapData.phases.map((phase, index) => ({
            id: phase.id || index + 1,
            title: phase.title || `Phase ${index + 1}`,
            duration: phase.duration || '2-3 months',
            description: phase.description || 'Learning phase description',
            skills: Array.isArray(phase.skills) ? phase.skills : [],
            milestones: Array.isArray(phase.milestones) ? phase.milestones : [],
            resources: Array.isArray(phase.resources) ? phase.resources : []
          }));
          
        } else {
          throw new Error('No JSON found in response');
        }
      } catch (parseError) {
        console.log('❌ Failed to parse AI roadmap response, using fallback');
        roadmapData = generateFallbackRoadmap(domain, mindsetType);
        roadmapData.aiResponse = aiResponse; // Include raw response for debugging
      }

      // Ensure required fields
      roadmapData.totalPhases = roadmapData.totalPhases || roadmapData.phases.length;
      roadmapData.estimatedDuration = roadmapData.estimatedDuration || '12-18 months';

      return NextResponse.json({
        success: true,
        roadmap: roadmapData,
        source: 'groq'
      });

    } catch (groqError) {
      console.log('❌ Groq roadmap generation failed, using intelligent fallback');
      console.error('Groq error:', groqError.message);
      
      const fallbackRoadmap = generateFallbackRoadmap(domain, mindsetType);
      return NextResponse.json({
        success: true,
        roadmap: fallbackRoadmap,
        source: 'fallback',
        note: 'Roadmap generated using offline intelligence while AI systems are being updated.'
      });
    }

  } catch (error) {
    console.error('❌ Roadmap Generation API Error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Roadmap generation failed. Please try again.',
      source: 'error'
    }, { status: 500 });
  }
}