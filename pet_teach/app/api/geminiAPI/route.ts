
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { prompt } = await request.json();

        if(!prompt) {
            return NextResponse.json({ message: "A prompt is required"}, { status: 400 })
        };

        const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
        const model = gemini.getGenerativeModel({ model: "gemini-2.5-flash" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const cleanedText = text
            .replace(/^```json/, "")
            .replace(/```$/, "")
            .replace(/^```/, "")
            .trim();

        const json = JSON.parse(cleanedText);

        return NextResponse.json(json, { status: 200 });
    } catch(err) {
        console.error(`Error fetching api ${err}`);
        return NextResponse.json({ message: "internal server" }, { status: 500 });
    }
}
