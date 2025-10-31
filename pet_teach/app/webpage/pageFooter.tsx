
"use client"


function Footer() {
    return (
        <div className="flex flex-row bg-gray-900 justify-around items-center text-white py-10" id="contact">
            <div className="flex flex-col">
                <h2 className="text-xl font-bold mb-3 underline">Contact/FeedBack</h2>
                <p>Contact us if you have any questions, concerns, or feedback</p>
                <p>FakeEmail@gmail.com</p>
            </div>

            <div className="flex flex-col justify-center items-center">
                <h2 className="text-xl font-bold mb-3 underline">Follow Us</h2>
                <a href="https://www.instagram.com/" className="cursor-pointer hover:underline">
                    Instagram
                </a>
                <a href="https://www.facebook.com/" className="cursor-pointer hover:underline">
                    Facebook
                </a>
                <a href="https://www.x.com/" className="cursor-pointer hover:underline">
                    Twitter
                </a>
            </div>
        </div>
    );
}

export default function PageFooter() {
    return (
        <Footer/>
    );
}