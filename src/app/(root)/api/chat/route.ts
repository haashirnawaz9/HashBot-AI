import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const systemPrompt = `You are HashBot, an AI assistant helping users with any questions they may have.`;

export async function POST(req: NextRequest) {
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY!,
  });

  
  const data = await req.json();

  const completion = await groq.chat.completions.create({
    model: "meta-llama/llama-4-maverick-17b-128e-instruct",
    messages: [{ role: "system", content: systemPrompt }, ...data],
    stream: true,
  });

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        for await (const chunk of completion) {
          const content = chunk.choices?.[0]?.delta?.content;
          if (content) {
            controller.enqueue(encoder.encode(content));
          }
        }
      } catch (err) {
        console.error(err);
        controller.error(err);
      } finally {
        controller.close();
      }
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
    },
  });
}
