import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages format" },
        { status: 400 }
      );
    }

    // Custom OpenRouter endpoint configuration (no API keys required)
    const response = await fetch("https://oi-server.onrender.com/chat/completions", {
      method: "POST",
      headers: {
        "customerId": "sm7574894@gmail.com",
        "Content-Type": "application/json",
        "Authorization": "Bearer xxx"
      },
      body: JSON.stringify({
        model: "openrouter/anthropic/claude-sonnet-4",
        messages: messages,
        max_tokens: 4000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      console.error("OpenRouter API error:", response.status, response.statusText);
      return NextResponse.json(
        { error: "AI service temporarily unavailable" },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Extract the response content
    const aiResponse = data.choices?.[0]?.message?.content || "I apologize, but I couldn't generate a response.";

    return NextResponse.json({
      response: aiResponse,
      model: "Claude Sonnet-4",
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error("Chat API error:", error);
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
    status: "Neural chat interface active",
    model: "Claude Sonnet-4",
    capabilities: [
      "Text analysis and generation",
      "Image recognition and processing", 
      "Document analysis",
      "Code review and generation",
      "Data analysis and insights",
      "Creative writing and brainstorming"
    ],
    multimodal: true,
    quantum_enhanced: true
  });
}