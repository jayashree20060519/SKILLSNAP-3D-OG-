const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface GenerateImageRequest {
  prompt: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt }: GenerateImageRequest = await req.json();

    if (!prompt) {
      return new Response(
        JSON.stringify({ error: 'Prompt is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = Deno.env.get('INTEGRATIONS_API_KEY');
    
    // If no API key, generate SVG diagram
    if (!apiKey) {
      const svgDiagram = generateSVGDiagram(prompt);
      return new Response(
        JSON.stringify({ 
          success: true, 
          type: 'svg',
          content: svgDiagram 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    try {
      // Step 1: Create image generation task
      const createUrl = 'https://app-abinn1w1pji9-api-DY8MnRlwkXKa.gateway.appmedo.com/v1/images/generations';
      
      const createResponse = await fetch(createUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Gateway-Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model_name: 'kling-v1',
          prompt: prompt,
          n: 1,
          aspect_ratio: '16:9',
        }),
      });

      if (!createResponse.ok) {
        throw new Error(`Create API returned ${createResponse.status}`);
      }

      const createData = await createResponse.json();
      
      if (createData.code !== 0 || !createData.data?.task_id) {
        throw new Error(createData.message || 'Failed to create image generation task');
      }

      const taskId = createData.data.task_id;

      // Step 2: Poll for task completion (max 30 seconds)
      const maxAttempts = 15;
      const pollInterval = 2000; // 2 seconds

      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        await new Promise(resolve => setTimeout(resolve, pollInterval));

        const queryUrl = `https://app-abinn1w1pji9-api-M9v0wzOkZXGY.gateway.appmedo.com/v1/images/generations/${taskId}`;
        
        const queryResponse = await fetch(queryUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Gateway-Authorization': `Bearer ${apiKey}`,
          },
        });

        if (!queryResponse.ok) {
          continue; // Try again
        }

        const queryData = await queryResponse.json();

        if (queryData.code !== 0) {
          continue;
        }

        const status = queryData.data?.task_status;

        if (status === 'succeed' && queryData.data?.task_result?.images?.length > 0) {
          const imageUrl = queryData.data.task_result.images[0].url;
          
          return new Response(
            JSON.stringify({ 
              success: true, 
              type: 'image',
              imageUrl: imageUrl
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        } else if (status === 'failed') {
          throw new Error(queryData.data?.task_status_msg || 'Image generation failed');
        }
        // If still processing, continue polling
      }

      // Timeout - return SVG fallback
      throw new Error('Image generation timeout');

    } catch (apiError) {
      console.error('Image API failed, using SVG diagram:', apiError);
      
      // Fallback to SVG diagram
      const svgDiagram = generateSVGDiagram(prompt);
      return new Response(
        JSON.stringify({ 
          success: true, 
          type: 'svg',
          content: svgDiagram 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

  } catch (error) {
    console.error('Error in generate-image:', error);
    
    // Final fallback
    return new Response(
      JSON.stringify({ 
        success: true, 
        type: 'svg',
        content: generateSVGDiagram('Visual Concept')
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

// Generate structured SVG visual diagram
function generateSVGDiagram(prompt: string): string {
  const title = prompt.substring(0, 40);
  
  return `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:0.1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:0.1" />
    </linearGradient>
    <linearGradient id="boxGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:0.8" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:0.8" />
    </linearGradient>
  </defs>
  
  <rect width="800" height="600" fill="url(#bgGradient)"/>
  
  <!-- Title -->
  <text x="400" y="50" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#333" text-anchor="middle">${title}</text>
  
  <!-- Main Box -->
  <rect x="250" y="100" width="300" height="80" rx="10" fill="url(#boxGradient)" stroke="#667eea" stroke-width="2"/>
  <text x="400" y="145" font-family="Arial, sans-serif" font-size="18" fill="white" text-anchor="middle" font-weight="bold">Main Concept</text>
  
  <!-- Arrow Down -->
  <line x1="400" y1="180" x2="400" y2="220" stroke="#667eea" stroke-width="3" marker-end="url(#arrowhead)"/>
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
      <polygon points="0 0, 10 5, 0 10" fill="#667eea"/>
    </marker>
  </defs>
  
  <!-- Component Boxes -->
  <rect x="100" y="240" width="200" height="100" rx="8" fill="#f0f4ff" stroke="#667eea" stroke-width="2"/>
  <text x="200" y="270" font-family="Arial, sans-serif" font-size="16" fill="#333" text-anchor="middle" font-weight="bold">Component 1</text>
  <text x="200" y="295" font-family="Arial, sans-serif" font-size="12" fill="#666" text-anchor="middle">Foundation</text>
  <text x="200" y="315" font-family="Arial, sans-serif" font-size="12" fill="#666" text-anchor="middle">Core Logic</text>
  
  <rect x="500" y="240" width="200" height="100" rx="8" fill="#f0f4ff" stroke="#764ba2" stroke-width="2"/>
  <text x="600" y="270" font-family="Arial, sans-serif" font-size="16" fill="#333" text-anchor="middle" font-weight="bold">Component 2</text>
  <text x="600" y="295" font-family="Arial, sans-serif" font-size="12" fill="#666" text-anchor="middle">Implementation</text>
  <text x="600" y="315" font-family="Arial, sans-serif" font-size="12" fill="#666" text-anchor="middle">Features</text>
  
  <!-- Connecting Lines -->
  <line x1="400" y1="220" x2="200" y2="240" stroke="#667eea" stroke-width="2"/>
  <line x1="400" y1="220" x2="600" y2="240" stroke="#764ba2" stroke-width="2"/>
  
  <!-- Output Boxes -->
  <rect x="100" y="380" width="200" height="60" rx="8" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="2"/>
  <text x="200" y="415" font-family="Arial, sans-serif" font-size="14" fill="#333" text-anchor="middle" font-weight="bold">Output A</text>
  
  <rect x="500" y="380" width="200" height="60" rx="8" fill="#fce7f3" stroke="#ec4899" stroke-width="2"/>
  <text x="600" y="415" font-family="Arial, sans-serif" font-size="14" fill="#333" text-anchor="middle" font-weight="bold">Output B</text>
  
  <!-- Arrows to Outputs -->
  <line x1="200" y1="340" x2="200" y2="380" stroke="#0ea5e9" stroke-width="2" marker-end="url(#arrowhead2)"/>
  <line x1="600" y1="340" x2="600" y2="380" stroke="#ec4899" stroke-width="2" marker-end="url(#arrowhead3)"/>
  
  <defs>
    <marker id="arrowhead2" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
      <polygon points="0 0, 10 5, 0 10" fill="#0ea5e9"/>
    </marker>
    <marker id="arrowhead3" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
      <polygon points="0 0, 10 5, 0 10" fill="#ec4899"/>
    </marker>
  </defs>
  
  <!-- Result Box -->
  <rect x="300" y="480" width="200" height="60" rx="8" fill="#dcfce7" stroke="#22c55e" stroke-width="2"/>
  <text x="400" y="515" font-family="Arial, sans-serif" font-size="16" fill="#333" text-anchor="middle" font-weight="bold">Final Result</text>
  
  <!-- Arrows to Result -->
  <line x1="200" y1="440" x2="350" y2="480" stroke="#22c55e" stroke-width="2"/>
  <line x1="600" y1="440" x2="450" y2="480" stroke="#22c55e" stroke-width="2"/>
  
  <!-- Labels -->
  <text x="400" y="575" font-family="Arial, sans-serif" font-size="12" fill="#666" text-anchor="middle">Visual representation of: ${title}</text>
</svg>`;
}
