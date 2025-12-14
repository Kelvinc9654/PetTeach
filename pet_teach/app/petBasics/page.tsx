
"use client";

import { NavigationBar } from "../webpage/pageHeader";
import ChatBot from "../chatBot/chatbot";

import { useState, useEffect } from "react";

type Section = {
    id: string;
    title: string;
    content: string[];
};

type PetBasicsResponse = {
    title: string;
    description: string;
    sections: Section[];
}

function getPrompt(): string {
    const prompt = `
        You are a pet care educator. Create a general guidelines for taking care of household pets. The 
        information should apply boradly to animals such as dogs, cats, and small mammals, without giving species-specific 
        instructions.

        Return ONLY valid JSON using the structure below:

        {
            "title": string,
            "description": string,
            "sections": [
                {
                    "id": string,
                    "title": string,
                    "content": string[]
                }
            ]
        }

        Include the following sections:
        - Understanding Animal Needs
        - Daily Care
        - Feeding and Nutrition
        - Safe Living Spaces
        - Hygiene and Grooming
        - Bonding
        - Health and Wellness
        - Safety Tips
    `;

    return prompt;
}


export default function PetBasics() {
    const [data, setData] = useState<PetBasicsResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [displayChatBot, setDisplayChatBot] = useState<boolean>(false);

    useEffect(() => {
        async function fetchPetBasics() {
            const prompt = getPrompt();

            try {
                const response = await fetch("/api/geminiAPI", {
                    method: "POST",
                    headers: {
                        'Content-type': "application/json"
                    },
                    body: JSON.stringify({ prompt: prompt })
                })

                if (!response.ok) {
                    throw new Error("Problem getting information");
                }

                const data = await response.json();
                setData(data);
                console.log(data);
            } catch (err) {
                console.log(`Error getting information: ${err}`);
            } finally {
                setLoading(false);
            }
        }

        fetchPetBasics();
    }, [])


    return (
        <>
            <NavigationBar/>

            <div className={`space-y-10 flex flex-col justify-center mt-5 ${displayChatBot ? "mr-96" : ""}`}>
                <div className="mx-auto max-w-4xl px-6 py-12">
                    {loading && <p className="text-center font-bold text-3xl">Loading Pet Care Basics...</p>}

                    {data && (
                        <>
                            <div className="text-center space-y-4">
                                <h1 className="text-center text-3xl font-bold">
                                    {data.title}
                                </h1>
                                <p className="text-lg max-w-2xl mx-auto mb-10">
                                    {data.description}
                                </p>
                            </div>

                            <div className="space-y-10 ">
                                {data.sections.map(section => (
                                    <div key={section.id}
                                        className="border rounded-2xl shadow-md p-8 space-y-4"
                                    >
                                        <h2 className="text-2xl text-center font-bold border-b pb-2">
                                            {section.title}
                                        </h2>

                                        {
                                            section.content.map((text, idx) => (
                                                <p key={idx} >
                                                    {text}
                                                </p>
                                            ))
                                        }
                                    </div>
                                ))}
                            </div>
                        </>

                    )}
                </div>
                
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
            </div>
        </>
    );
}
