import { createOpenAI } from "@ai-sdk/openai";
import { CoreMessage, streamText } from "ai";
import { NextRequest } from "next/server";

const groq = createOpenAI({
    baseURL: "https://api.groq.com/openai/v1",
    apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: NextRequest) {
    const { messages, tone } = await req.json();

    const apiMessages: CoreMessage[] = [
        {
            role: "system",
            content:
                "I will give you text and tone, you will paraphrase that text into that tone. The format of your response will be just a plain text without any double quotes or additional information in the minimum characters possible without changing the meaning of the original text.",
        },
        ...messages,
        {
            role: "user",
            content: `Tone: ${tone}`,
        },
    ];
    const result = await streamText({
        model: groq("llama3-8b-8192"),
        maxTokens: 1024,
        messages: apiMessages,
        temperature: 1.5,
    });

    return result.toDataStreamResponse();
}
