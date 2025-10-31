

import { NavigationBar } from "../webpage/pageHeader";
import { FetchData } from "../geminiAPI/fetchData";


export default function PetBasics() {

    const content = `
        Write a detailed pet care guide for people who want to pet owners or for those who want
        to take better care of their pets. Include details on feeding, health, training, and bonding 
        with animals.
    `;

    const response = FetchData(content);
    console.log("Response:", response);

    return (
        <>
            <NavigationBar/>
            <div className="space-y-10 flex flex-col justify-center">
                <div id="understanding-animal-needs">
                    <h1 className="text-3xl font-bold text-center underline mb-5">Understanding Animal Needs</h1>
                    <p className="text-lg">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae modi saepe temporibus ullam aut tempore eligendi, commodi facilis excepturi aperiam, aliquid nesciunt maiores voluptatibus ipsum labore explicabo earum vitae inventore.</p>
                </div>

                <div id="feeding-and-nutrition">
                    <h1 className="text-3xl font-bold text-center underline mb-5">Feeding and Nutrition</h1>
                    <p className="text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque dolorem ratione tenetur ipsam suscipit quia aut vel assumenda repellat expedita necessitatibus harum, sit temporibus facere sapiente at rem magni soluta.</p>
                </div>

                <div id="safe-living-spaces">
                    <h1 className="text-3xl font-bold text-center underline mb-5">Safe Living Spaces</h1>
                    <p className="text-lg">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus, a distinctio tempora dolor ducimus, fugiat, vero eveniet eaque cum nesciunt inventore beatae officia repellendus sint asperiores! Ipsa temporibus quas error.</p>
                </div>

                <div id="bonding">
                    <h1 className="text-3xl font-bold text-center underline mb-5">Bonding</h1>
                    <p className="text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut mollitia excepturi sed ipsam, voluptates eaque ducimus laboriosam maxime similique nobis debitis, fuga eius odit aspernatur consectetur eum laborum ea nisi.</p>
                </div>
            </div>
        </>
    );
}
