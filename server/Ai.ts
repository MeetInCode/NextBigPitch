"use server";
import { google } from '@ai-sdk/google';
import { generateText } from "ai";

export async function generate(prompt: string): Promise<string> {
  const { text } = await generateText({
    model: google('gemini-1.5-pro-latest'),
    prompt: prompt,
  });
  return text;
}
