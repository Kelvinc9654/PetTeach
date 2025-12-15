
"use client";

import { NavigationBar } from "../webpage/pageHeader";
import Species from "./species.json"

import { useState } from "react";
import Link from "next/link";

interface CardProp {
    name: string,
    category: string,
    image: string
}

function Card({name, category, image}: CardProp) {

    return (
        <div className="shadow hover:shadow-lg rounded-lg overflow-hidden">
            <img src={image} alt={name} className="object-cover h-64 w-full"/>

            <div className="flex flex-col justify-center items-center p-4">
                <h2 className="font-bold text-lg">{name}</h2>

                <Link href={`/guide?name=${encodeURIComponent(name)}&category=${encodeURIComponent(category)}`}>
                    <button 
                        className="border rounded-2xl py-4 px-2 bg-blue-600 hover:bg-blue-700 
                                    cursor-pointer mt-3 text-white font-bold"
                    >
                        View Guide
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default function Animals() {
    const [selectedCategory, setSelectecCategory] = useState<string>("All Species");

    const species = 
        (selectedCategory === "All Species") 
            ? Species
            : Species.filter((breed) => breed.category === selectedCategory);


    return (
        <div>
            <NavigationBar/>

            <div className="px-6 py-10">
                <div className="mb-10">
                    <select 
                        onChange={(e) => setSelectecCategory(e.target.value)}
                        value={selectedCategory}
                        className="border rounded-lg px-5 py-2"
                    >
                        <option value="All Species" defaultValue="All Species">All Species</option>
                        <option value="Dogs">Dogs</option>
                        <option value="Cats">Cats</option>
                        <option value="Birds">Birds</option>
                        <option value="Fish">Fish</option>
                        <option value="Reptiles">Reptiles</option>
                        <option value="Rodents">Rodents</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {
                        species.map((breed, idx) => (
                            <Card 
                                key={idx} 
                                name={breed.name} 
                                category={breed.category} 
                                image={breed.image}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}