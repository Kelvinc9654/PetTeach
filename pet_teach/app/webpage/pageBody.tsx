
"use client"

import Link from "next/link";

type CardObject = {
    image: string;
    name: string;
}

function PageInfo() {
    return (
        <div className="flex flex-col py-15 space-y-15">
            <div className="text-center mx-5" id="about">
                <h1 className="text-4xl font-bold mb-3">About</h1>
                <p className="text-lg text-gray-700">
                    Regardless of the type of animal, we at Pet Teach believe that each of them deserves
                    to be loved. Our goal is to help people be more confident about being future or a better 
                    pet owner by teaching the essentials of animal care. Pet Teach provides all the guides that 
                    are necessary to help ensure pet owners can build a happy and healthy relationship with their pets.
                    We provide guides on a variety of animals such as dogs, cats, reptiles and many more. Through our 
                    website, pet owners will learn the types of food that their pets will eat and their needs as well as how 
                    to train them.
                </p>
            </div>

            <div className="text-center">
                <h1 className="text-4xl font-bold">Mission</h1>
                <p className="text-lg text-gray-700">
                    Our mission is to make pet education free and reliable for everyone so that they make
                    better decisions on how best to take care of their pets
                </p>
            </div>
        </div>
    );
}


function Card({ image, name }: CardObject) { 
    return (
        <div className="flex flex-col justify-center items-center bg-white rounded-xl shadow-md ">
            <div className="flex items-center justify-center w-full h-48">
                <img src={image} alt="animal/educational image" 
                    className="h-24 w-auto border rounded-full bg-blue-50"
                />
            </div>

            <div className="w-full text-center mb-10">
                <p className="text-lg font-semibold">{name}</p>
            </div>
        </div>
    );
}

function AnimalCategories() {
    const animalTypes = [
        {image: "/images/animals/dog.png", name: "Dogs"},
        {image: "/images/animals/cat.png", name: "Cats"},
        {image: "/images/animals/bird.png", name: "Birds"},
        {image: "/images/animals/fish.png", name: "Fish"},
        {image: "/images/animals/reptile.png", name: "Reptiles"},
        {image: "/images/animals/rodent.png", name: "Rodents"}
    ]


    return (
        <div className="py-15" id="animals">
            <div>
                <div className="text-center mb-12 space-y-3">
                    <h1 className="text-3xl font-bold">Animal Categories</h1>
                    <h2 className="text-sm">Explore the types of animals that we could help you with</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mx-5">
                    {
                        animalTypes.map((animalType, idx) => ((
                            <Card key={idx} image={animalType.image} name={animalType.name}/>
                        )))
                    }
                </div>
            </div>
        </div>
    )
}


function LearningSection() {

    const petCareBasics = [
        {image: "/images/learning/animalNeeds.png", name: "Understanding Animal Needs"},
        {image: "/images/learning/nutrition.png", name: "Feeding and Nutrition"},
        {image: "/images/learning/livingSpace.png", name: "Safe Living Spaces"},
        {image: "/images/learning/bonding.png", name: "Bonding"}
    ]

    return (
        <div className="py-15 bg-gray-50" id="pet-basics">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold ">Pet Care Basics</h1>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {
                    petCareBasics.map((petCareBasic, idx) => (
                        <Card key={idx} image={petCareBasic.image} name={petCareBasic.name}/>
                    ))
                }
            </div>
            
            <div className="flex flex-col justify-center items-center mt-10">
                <Link href="./petBasics">
                    <button className="border rounded-md bg-blue-300 px-5 py-3 cursor-pointer hover:bg-blue-400">Learn More</button>
                </Link>
            </div>
        </div>
    );
}

export default function PageBody() {
    return (    
        <div className="bg-gray-100">
            <PageInfo/>
            <AnimalCategories/>
            <LearningSection/>
        </div>
    );
}