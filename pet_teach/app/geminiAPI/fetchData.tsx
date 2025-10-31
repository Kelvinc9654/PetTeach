
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";


export async function FetchData(contentQuestion: string) {

    const geminiAI = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY
    });

    const response = await geminiAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contentQuestion,
    });
}
