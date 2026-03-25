const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ChatMessage {
  role: 'user' | 'model';
  parts: Array<{ text?: string; inlineData?: { mimeType: string; data: string } }>;
}

interface RequestBody {
  messages: ChatMessage[];
  mode?: 'create-image' | 'deep-research' | 'thinking' | 'normal';
}

// Intelligent fallback responses based on question type
function generateIntelligentFallback(userMessage: string, mode: string): string {
  const lowerMsg = userMessage.toLowerCase();
  
  // Create Image mode fallback
  if (mode === 'create-image') {
    return `# Visual Concept: ${userMessage}

I'll describe this concept in a structured visual format:

\`\`\`
┌─────────────────────────────────────────────┐
│                                             │
│         ${userMessage.substring(0, 30)}...  │
│                                             │
└─────────────────────────────────────────────┘
                    ↓
        ┌───────────────────────┐
        │   Core Components     │
        └───────────────────────┘
                ↓
    ┌───────────┴───────────┐
    ↓                       ↓
[Component 1]          [Component 2]
    ↓                       ↓
[Details]              [Details]
\`\`\`

**Visual Breakdown:**

1. **Main Concept**: ${userMessage}
2. **Key Elements**: 
   - Primary structure and foundation
   - Supporting components
   - Connections and relationships
3. **Flow**: Top-down hierarchical structure
4. **Purpose**: Clear visualization of the concept

Would you like me to elaborate on any specific part?`;
  }
  
  // Image analysis fallback
  if (lowerMsg.includes('image') || lowerMsg.includes('picture') || lowerMsg.includes('photo')) {
    return `I can help you analyze images! Here's what I can do:

**Image Analysis Capabilities:**
- 📄 **Documents/Syllabus**: Extract topics and create study plans
- 📊 **Diagrams**: Explain concepts and relationships
- 📝 **Notes**: Summarize and organize content
- 💼 **Resumes**: Provide feedback and suggestions

**How to use:**
1. Upload your image using the upload button
2. Tell me what you'd like me to do with it
3. I'll analyze and provide detailed insights

What would you like to analyze?`;
  }
  
  // Coding questions
  if (lowerMsg.includes('code') || lowerMsg.includes('programming') || lowerMsg.includes('function') || lowerMsg.includes('algorithm')) {
    return `**Coding Help:**

For your coding question about "${userMessage.substring(0, 50)}...", here's a structured approach:

**1. Problem Analysis:**
- Break down the problem into smaller parts
- Identify input and output requirements
- Consider edge cases

**2. Solution Strategy:**
- Choose appropriate data structures
- Plan the algorithm step-by-step
- Consider time and space complexity

**3. Implementation Tips:**
- Write clean, readable code
- Add comments for complex logic
- Test with sample inputs

**4. Best Practices:**
- Follow naming conventions
- Handle errors gracefully
- Optimize after it works

Would you like me to:
- Provide a code example?
- Explain a specific concept?
- Help debug an issue?`;
  }
  
  // Career advice
  if (lowerMsg.includes('career') || lowerMsg.includes('job') || lowerMsg.includes('interview') || lowerMsg.includes('resume')) {
    return `**Career Guidance:**

Regarding "${userMessage.substring(0, 50)}...", here's my advice:

**Career Development:**
- 🎯 **Skills**: Focus on in-demand technologies
- 💼 **Experience**: Build a strong portfolio
- 🤝 **Network**: Connect with professionals
- 📚 **Learning**: Stay updated with trends

**Job Search Strategy:**
- Tailor your resume for each application
- Practice coding interviews regularly
- Prepare behavioral questions (STAR method)
- Research companies thoroughly

**Interview Preparation:**
- Technical: Data structures, algorithms, system design
- Behavioral: Past experiences, problem-solving
- Questions: Prepare thoughtful questions to ask

**Next Steps:**
1. Assess your current skills
2. Identify gaps and learning goals
3. Build projects to showcase abilities
4. Apply strategically to relevant positions

What specific aspect would you like to explore?`;
  }
  
  // Study planning
  if (lowerMsg.includes('study') || lowerMsg.includes('learn') || lowerMsg.includes('exam') || lowerMsg.includes('notes')) {
    return `**Study Planning:**

For "${userMessage.substring(0, 50)}...", here's an effective approach:

**Study Strategy:**
- 📅 **Schedule**: Create a realistic study timetable
- 🎯 **Goals**: Set specific, measurable objectives
- 📝 **Notes**: Use active recall and spaced repetition
- 🧠 **Practice**: Apply concepts through problems

**Learning Techniques:**
1. **Pomodoro**: 25-min focused sessions
2. **Active Recall**: Test yourself regularly
3. **Spaced Repetition**: Review at intervals
4. **Feynman Technique**: Teach to understand

**Resources:**
- Use our Career Hub for structured learning
- Watch recommended videos
- Practice with hackathon challenges
- Track progress regularly

**Tips:**
- Start with fundamentals
- Build projects while learning
- Join study groups
- Take regular breaks

How can I help you get started?`;
  }
  
  // General fallback
  return `I'm here to help you with "${userMessage}"!

**I can assist with:**

🎓 **Learning & Study:**
- Create study plans
- Explain concepts
- Generate notes and quizzes
- Provide learning resources

💻 **Coding & Tech:**
- Explain programming concepts
- Help with algorithms
- Debug code issues
- Suggest best practices

💼 **Career Development:**
- Resume reviews
- Interview preparation
- Career path guidance
- Skill recommendations

📊 **Analysis:**
- Analyze uploaded images/documents
- Create summaries
- Generate diagrams
- Extract key information

**How to get the best help:**
1. Be specific about what you need
2. Upload relevant files if needed
3. Ask follow-up questions
4. Let me know if you need examples

What would you like to explore first?`;
}

// System prompt for better AI behavior
const SYSTEM_CONTEXT = `You are an AI Mentor for SkillSnap 3D, a student learning platform. Your role:

1. ANALYZE IMAGES ACCURATELY:
   - If syllabus/document: Extract topics and create study plan
   - If diagram: Explain the concepts shown
   - If random image: Describe what you actually see
   - If unclear: Say "I couldn't clearly understand the image. Please provide more context."
   - NEVER generate unrelated content

2. RESPONSE STYLE:
   - Friendly and clear
   - Focus on student learning
   - Provide actionable advice
   - After answering, suggest: "Would you like me to create notes, a quiz, or a diagram for this?"

3. CONTEXT-AWARE:
   - Only respond based on user input and uploaded content
   - No random topic generation
   - Stay relevant to the conversation

4. FOR SPECIAL MODES:
   - Create Image: Provide detailed visual description and concept breakdown
   - Deep Research: Give comprehensive explanation with examples
   - Thinking Mode: Show step-by-step reasoning

5. TOPICS: Help with coding, career advice, study planning, resume reviews, and learning strategies.`;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, mode = 'normal' }: RequestBody = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Messages array is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get user's last message for fallback
    const lastUserMessage = messages.filter(m => m.role === 'user').pop();
    const userText = lastUserMessage?.parts.find(p => p.text)?.text || '';

    const apiKey = Deno.env.get('INTEGRATIONS_API_KEY');
    
    // If no API key, use intelligent fallback immediately
    if (!apiKey) {
      const fallbackResponse = generateIntelligentFallback(userText, mode);
      
      // Return as SSE stream format
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        start(controller) {
          const data = JSON.stringify({
            candidates: [{
              content: {
                role: 'model',
                parts: [{ text: fallbackResponse }]
              },
              finishReason: 'STOP'
            }]
          });
          controller.enqueue(encoder.encode(`data: ${data}\n\n`));
          controller.close();
        }
      });
      
      return new Response(stream, {
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    }

    // Add system context to messages
    const enhancedMessages: ChatMessage[] = [
      {
        role: 'user',
        parts: [{ text: SYSTEM_CONTEXT }]
      },
      {
        role: 'model',
        parts: [{ text: 'I understand. I will be a helpful AI Mentor, analyze images accurately, stay context-aware, and provide relevant learning assistance.' }]
      },
      ...messages
    ];

    // Add mode-specific context
    if (mode !== 'normal' && lastUserMessage) {
      let modeContext = '';
      switch (mode) {
        case 'create-image':
          modeContext = '\n\n[MODE: Create Image - Provide detailed visual description and concept breakdown as if creating an image. Use ASCII art or structured diagrams if helpful.]';
          break;
        case 'deep-research':
          modeContext = '\n\n[MODE: Deep Research - Provide comprehensive explanation with examples, use cases, and detailed analysis]';
          break;
        case 'thinking':
          modeContext = '\n\n[MODE: Thinking - Show step-by-step reasoning and problem-solving process]';
          break;
      }
      
      if (modeContext && lastUserMessage.parts[0].text) {
        lastUserMessage.parts[0].text += modeContext;
      }
    }

    // Try API call with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000); // 45 second timeout

    try {
      const geminiUrl = 'https://app-abinn1w1pji9-api-VaOwP8E7dJqa.gateway.appmedo.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse';
      
      const response = await fetch(geminiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Gateway-Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          contents: enhancedMessages,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }

      // Stream the response back to the client
      return new Response(response.body, {
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });

    } catch (apiError) {
      clearTimeout(timeoutId);
      console.error('API call failed, using fallback:', apiError);
      
      // Use intelligent fallback
      const fallbackResponse = generateIntelligentFallback(userText, mode);
      
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        start(controller) {
          const data = JSON.stringify({
            candidates: [{
              content: {
                role: 'model',
                parts: [{ text: fallbackResponse }]
              },
              finishReason: 'STOP'
            }]
          });
          controller.enqueue(encoder.encode(`data: ${data}\n\n`));
          controller.close();
        }
      });
      
      return new Response(stream, {
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    }

  } catch (error) {
    console.error('Error in ai-mentor-chat:', error);
    
    // Final fallback
    const fallbackResponse = `I'm here to help you learn and grow! 

**I can assist with:**
- 💻 Coding and programming questions
- 📚 Study planning and learning strategies
- 💼 Career advice and interview preparation
- 📊 Analyzing documents and images
- 🎯 Creating notes, quizzes, and diagrams

Please try asking your question again, and I'll do my best to help!`;
    
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        const data = JSON.stringify({
          candidates: [{
            content: {
              role: 'model',
              parts: [{ text: fallbackResponse }]
            },
            finishReason: 'STOP'
          }]
        });
        controller.enqueue(encoder.encode(`data: ${data}\n\n`));
        controller.close();
      }
    });
    
    return new Response(stream, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  }
});
