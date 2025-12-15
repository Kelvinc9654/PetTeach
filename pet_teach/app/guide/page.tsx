
"use client";

import { NavigationBar } from "../webpage/pageHeader";
import ChatBot from "../chatBot/chatbot";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";


interface Diet {
    food: string;
    feedSchedule: string;
    notes: string;
}

interface Housing {
    spaceRequirements: string;
    beeding: string;
    temperature: string;
}

interface Health {
    commonIssues: string;
    vetCheckups: string;
}

interface Behavior {
    socialNeeds: string;
    play: string;
}

interface AdviceSchema {
    species: string;
    category: string;
    overview: string;
    firstDays?: string;
    diet?: Diet;
    housing?: Housing;
    health?: Health;
    behavior?: Behavior;
    bonding?: string;
    training?: string;
    warnings?: string[];
}

function getPrompt(name: string, category: string): string {
    const prompt = `
        You are a veterinary and a animal care expert giving advice on animal welfare. You are
        providing information/education on how to take care of certain types of pets. Your task
        is to provide accurate, responsible, and detailed pet care information. Generate a comprehensive
        pet care guide for the following species:

        Species: ${name}
        Category: ${category}

        Requirements:
        - Be extremely detailed 
        - Assume the user is a first-time pet owner who does not know how to take care of the pet
        - Include warnings and common beginner mistakes
        - Include other fields if applicable to the animal: "firstDays", "diet", "housing", "health", 
            "behavior", "bonding, "training", "warnings" 
        - If a field is not applicable, omit it instead of leaving it blank

        Output:
        - Return only a valid JSON
        - ALl fields must be present

        Return the response using this JSON schema:
        {
            "species": "string",
            "category": "string",
            "overview": "string",
            "firstDays": "string (optional)",
            "diet": {
                "food": "string",
                "feedingSchedule": "string",
                "notes": "string"
            } (optional),
            "housing": { 
                "spaceRequirements": "string", 
                "bedding": "string", 
                "temperature": "string" 
            } (optional),
            "health": { 
                "commonIssues": "string", 
                "vetCheckups": "string" 
            } (optional),
            "behavior": { 
                "socialNeeds": "string", 
                "play": "string" 
            } (optional),
            "bonding": "string (optional)",
            "training": "string (optional)",
            "warnings": ["string", ...] (optional)
        }
    `;

    return prompt
}

interface BorderProp {
    sectionHeader: string,
    children: React.ReactNode,
}

function Border({sectionHeader, children}: BorderProp) {
    return (
        <div className="border rounded-lg shadow-md p-5">
            <h2 className="font-bold text-2xl mb-5 border-b">
                {sectionHeader}
            </h2>
            <div className="space-y-5">
                {children}
            </div>
        </div>
    );
}

export default function AnimalGuide() {
    const [data, setData] = useState<AdviceSchema | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [displayChatBot, setDisplayChatBot] = useState<boolean>(false);

    const searchParms = useSearchParams();
 
    const name = searchParms.get("name");
    const category = searchParms.get("category");

    useEffect(() => {
        async function fetchAdvice() {
            const prompt = getPrompt(name!, category!);

            try {
                const response = await fetch("/api/geminiAPI", {
                    method: "POST",
                    headers: {
                        'Content-type': "application/json"
                    },
                    body: JSON.stringify({ prompt: prompt })
                })

                if (!response.ok) {
                    throw new Error("Problem getting advice");
                }

                const data = await response.json();
                setData(data);
                console.log(data);
            } catch (err) {
                console.log(`Error getting advice: ${err}`);
            } finally {
                setLoading(false);
            }
        }

        fetchAdvice();
    }, []);
    

    return (
        <>
            <NavigationBar/>
            {loading ? 
                <p>Loading Information. Please be patient.</p> 
                : ""
            } 

            {data && (
                <div className={`max-w-4xl px-6 py-10 space-y-10 mx-auto ${displayChatBot ? "mr-96" : ""}`}>
                    <h1 className="font-bold text-4xl underline text-center mb-6">
                        {data.species}
                    </h1>

                    <Border sectionHeader="Overview">
                        <p>{data.overview}</p>
                    </Border>

                    {data.firstDays && (
                        <Border sectionHeader="FirstDays">
                            <p><b>First Days: </b>{data.firstDays}</p>
                        </Border>
                    )}

                    {data.diet && (
                        <Border sectionHeader="Diet">
                            <p><b>Food: </b>{data.diet.food}</p>
                            <p><b>Feed Schedule: </b>{data.diet.feedSchedule}</p>
                            <p><b>Notes: </b>{data.diet.notes}</p>
                        </Border>
                    )}

                    {data.housing && (
                        <Border sectionHeader="Housing">
                            <p><b>Space Requirements: </b>{data.housing.spaceRequirements}</p>
                            <p><b>Bedding: </b>{data.housing.beeding}</p>
                            <p><b>Temperature: </b>{data.housing.temperature}</p>
                        </Border>
                    )}

                    {data.health && (
                        <Border sectionHeader="Health">
                            <p><b>Common Issues: </b>{data.health.commonIssues}</p>
                            <p><b>Vet Checkups: </b>{data.health.vetCheckups}</p>
                        </Border>
                    )}

                    {data.behavior && (
                        <Border sectionHeader="Behavior">
                            <p><b>Social Needs: </b>{data.behavior.socialNeeds}</p>
                            <p><b>Play: </b>{data.behavior.play}</p>
                        </Border>
                    )}

                    {data.bonding && (
                        <Border sectionHeader="Bonding">
                            <p>{data.bonding}</p>
                        </Border>
                    )}

                    {data.training && (
                        <Border sectionHeader="Training">
                            <p>{data.training}</p>
                        </Border>
                    )}

                    {data.warnings && (
                        <Border sectionHeader="Warnings">
                            <p>{data.warnings}</p>
                        </Border>
                    )}
                </div>
            )}

            <button className="border rounded-full bg-blue-600 hover:bg-blue-700 cursor-pointer text-white
                                    font-bold px-4 py-2 fixed bottom-6 right-6"
                        onClick={() => setDisplayChatBot(true)}
            >
                Ask Chat For Questions
            </button>

            {displayChatBot &&
                <div className="flex flex-col h-full w-96 fixed top-0 right-0 bg-white">
                    <button className="cursor-pointer"
                            onClick={() => setDisplayChatBot(false)}  
                    >
                        x
                    </button>

                    <ChatBot/>
                </div>
            }
        </>
    );
}