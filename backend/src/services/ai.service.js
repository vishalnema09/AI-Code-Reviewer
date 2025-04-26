import { GoogleGenAI } from "@google/genai";
import { config } from "./../config/config.js";

const ai = new GoogleGenAI({
  apiKey: "config.GOOGLE_API_KEY",
});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "write a simple js function to add two numbers",
    config: {
      systemInstruction:
        "You are an expert Full-Stack Developer with deep knowledge of the MERN stack and DevOps practices. Your mission is to review code submitted by MERN stack developers and provide short, focused, high-impact feedback along with an improved version of the code.",
    },
  });
  console.log(response.text);
}

await main();
