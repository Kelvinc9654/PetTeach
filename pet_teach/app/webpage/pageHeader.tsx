
"use client";

import Link from "next/link"

function Banner() {
    return (
        <div className="relative w-full">
            {/* banner image */}
            <img src="/images/banner.png" alt="banner image"/>
            
            {/* Banner Text */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white font-bold space-y-3">
                <h1 className="text-4xl">Pet Teach</h1>
                <p className="text-lg mt-3">Best place to learn how to take care of your pets</p>
                <Link href="/animals">
                    <button className="bg-blue-600 hover:bg-blue-700 rounded-md px-8 py-3 mt-5 cursor-pointer">
                        Explore Now
                    </button>
                </Link>
            </div>

        </div>
    )
}

export function NavigationBar() {
    return (
        <header className="top-0 h-20 left-0 w-full max-h-48 shadow-md">
            <div className="flex flex-row items-center px-6 py-4 space-x-2">
                {/* logo */}
                <div>
                    <Link href="/">
                        <img src="/images/logo.png" className="h-12 scale-200 w-auto object-contain cursor-pointer"/>
                    </Link>
                </div>

                {/* navigation */}
                <ul className="hidden items-center space-x-8 font-medium md:flex md:flex-row mx-auto">
                    <li>
                        <a href="#home" className="hover:text-red-600 hover:underline">Home</a>
                    </li>
                    <li>
                        <a href="#about" className="hover:text-red-600 hover:underline">About</a>
                    </li>
                    <li>
                        <a href="#animals" className="hover:text-red-600 hover:underline">Animals</a>
                    </li>
                    <li>
                        <a href="#pet-basics" className="hover:text-red-600 hover:underline">Pet Basics</a>
                    </li>
                    <li>
                        <a href="#contact" className="hover:text-red-600 hover:underline">Contact</a>
                    </li>
                </ul>          
            </div>
        </header>
    )
}


export default function PageHeader() {
    return (
        <>
            <NavigationBar/>
            <Banner/>
        </>
    )
       
}