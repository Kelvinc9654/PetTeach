
"use client"

import { NavigationBar } from "@/app/webpage/pageHeader";
import { useState, useEffect } from "react";


function LogInOptions() {
    
    return (
        <div className="space-y-3 w-[80%]">
            <button className="flex justify-center items-center border border-black rounded-md w-full py-2 px-4 cursor-pointer hover:border-blue-500">
                <img src="/images/userAuthImages/googleLogo.png" className="h-7 mr-2"/>
                <p className="font-medium">Continue with Google</p>
            </button>

            <div className="flex flex-row justify-between">
                <button className="items-center border border-black rounded-md py-2 px-4 cursor-pointer hover:border-blue-500">
                    <img src="/images/userAuthImages/microsoftLogo.png" className="h-7"/>
                </button>
                <button className="items-center border border-black rounded-md py-2 px-4 cursor-pointer hover:border-blue-500">
                    <img src="/images/userAuthImages/appleLogo.png" className="h-7"/>
                </button>

                <button className="items-center border border-black rounded-md py-2 px-4 cursor-pointer hover:border-blue-500">
                    <img src="/images/userAuthImages/facebookLogo.png" className="h-7"/>
                </button>
            </div>
        </div>
    );
}

function Form() {
    const [isInfoFilled, setIsInfoFilled] = useState(false);

    const [data, setData] = useState({
        email: "",
        password: ""
    });

    function handleInputChange(e: any) {

        setData(prevData => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    }

    useEffect(() => {
        if (data.email.length > 0 && data.password.length > 0) {
            setIsInfoFilled(true);
        } else {
            setIsInfoFilled(false);
        }
    }, [data])

    return (
        <form className="flex flex-col space-y-5 w-full">
            <div>
                <label className="block font-medium mb-3">Email</label>
                <input 
                    type="email" 
                    name="email" 
                    placeholder="email@example.com" 
                    value={data.email}
                    required 
                    className="w-full border border-black rounded-sm px-3 py-2"
                    onChange={handleInputChange}
                    
                />
            </div>

            <div>
                <label className="block font-medium mb-3">Password</label>
                <input 
                    type="password" 
                    name="password"
                    value={data.password} 
                    required 
                    className="w-full border border-black rounded-sm px-3 py-2"
                    onChange={handleInputChange}
                    
                />
            </div>

            <div>
                <a href="#" className="text-sm text-blue-600 underline">
                    Forgot password?
                </a>
            </div>

            <button 
                type="submit" 
                className={`border rounded-md  text-white font-bold py-2 w-full ${
                    isInfoFilled ? "cursor-pointer bg-blue-500" : "bg-gray-400 cursor-not-allowed"
                    }`}
                disabled={!isInfoFilled}
                >
                Log in
            </button>
        </form>
    )
}

function LogInForm() {
    return (
        <div className="bg-gray-100 flex flex-col justify-center items-center min-h-screen">
            <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-xl p-8 min-w-md">
                <h2 className="text-2xl text-center font-bold mb-5">Log in now!</h2>

                <LogInOptions/>

                <div className="flex flex-row justify-center items-center my-5 w-full">
                    <div className="w-[30%] border-t border-gray-300"/>
                    <p className="w-[40%] mx-2 text-sm text-center">Or login in with email</p>
                    <div className="w-[30%] border-t border-gray-300"/>
                </div> 

                <Form/>

                <p className="text-center text-sm mt-6">
                    Need a StudyUp account? <a className="text-blue-600 font-bold cursor-pointer hover:underline">Sign Up today</a>
                </p>
            </div>
        </div>
    );
}



export default function LogIn() {
    return (
        <div>
            <NavigationBar/>
            <LogInForm/>
        </div>
    );
}