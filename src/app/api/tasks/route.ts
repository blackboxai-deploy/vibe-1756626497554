import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { action, title, description } = await request.json();

    if (action === "generate-insight") {
      if (!title || !description) {
        return NextResponse.json(
          { error: "Title and description required for insight generation" },
          { status: 400 }
        );
      }

      // Generate AI insight using Claude Sonnet-4
      const response = await fetch("https://oi-server.onrender.com/chat/completions", {
        method: "POST",
        headers: {
          "customerId": "sm7574894@gmail.com",
          "Content-Type": "application/json",
          "Authorization": "Bearer xxx"
        },
        body: JSON.stringify({
          model: "openrouter/anthropic/claude-sonnet-4",
          messages: [
            {
              role: "user",
              content: `Analyze this task for productivity optimization and provide a brief neural insight:

Title: ${title}
Description: ${description}

Provide a 1-2 sentence insight about:
1. Complexity assessment
2. Time optimization suggestions
3. Neural efficiency patterns
4. Resource allocation recommendations

Format: Brief, technical, futuristic tone focusing on AI/neural analysis.`
            }
          ],
          max_tokens: 200,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        console.error("OpenRouter API error:", response.status);
        return NextResponse.json({
          insight: "Neural analysis pending. Task complexity assessment in progress with quantum processing patterns."
        });
      }

      const data = await response.json();
      const insight = data.choices?.[0]?.message?.content || 
        "Neural complexity detected. Optimized processing pathways recommended for enhanced productivity flow.";

      return NextResponse.json({ insight });
    }

    return NextResponse.json(
      { error: "Invalid action" },
      { status: 400 }
    );

  } catch (error) {
    console.error("Tasks API error:", error);
    return NextResponse.json(
      { 
        error: "Internal server error", 
        details: error instanceof Error ? error.message : "Unknown error" 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "Neural task management system active",
    features: [
      "AI-powered task prioritization",
      "Quantum-inspired analytics",
      "Neural efficiency scoring",
      "Predictive time estimation",
      "Smart categorization",
      "Productivity optimization"
    ],
    neural_processing: true,
    quantum_enhanced: true
  });
}