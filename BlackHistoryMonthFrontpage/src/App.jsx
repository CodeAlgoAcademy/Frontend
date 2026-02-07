import React from 'react';

const App = () => {
    console.log("Rendering App with Images");

    return (
        <div className="min-h-screen w-full bg-[url('/images/background_bluepink.png')] bg-contain bg-center bg-no-repeat">

            {/* --- NAVBAR --- */}
            <nav className="bg-stone-900 text-white py-4 px-6 flex items-center shadow-xl">
            <div className="flex items-center gap-3">
                <img src="public/images/logo_white.png" alt="logo" />
            </div>

            <div className="hidden md:flex gap-8 text-sm font-medium text-gray-300 ml-10">
                <a href="#" className="hover:text-white transition-colors">About</a>
                <span className="text-gray-600">|</span>
                <a href="#" className="hover:text-white transition-colors">Educators</a>
                <span className="text-gray-600">|</span>
                <a href="#" className="hover:text-white transition-colors">Parents</a>
            </div>

            <button className="ml-auto bg-white text-black px-6 py-2 font-bold text-sm rounded shadow hover:bg-gray-200 transition-colors">
                SIGN IN
            </button>
            </nav>

            {/* --- HERO SECTION --- */}
            <main className="container mx-auto px-4 py-12 flex flex-col items-center text-center">

                {/* HEADLINE */}
                <div className="mb-10 relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-black mb-2 tracking-tight">
                        Celebrating Black History Through
                    </h1>
                    <h2
                        className="text-6xl md:text-8xl font-black text-red-600 tracking-wider drop-shadow-lg"
                        style={{ WebkitTextStroke: '2px black' }}
                    >
                        CODING
                    </h2>
                              
            
                </div>

                

                <p className="max-w-2xl mt-8 text-1xl md:text-3xl font-bold text-gray-700 mb-16 font-mono leading-relaxed">
Engaging coding activities that support logical reasoning, creativity, and critical thinking - while honoring history
                </p>

                 {/* Main Button */}
                    <button className="bg-yellow-400 border-b-4 border-yellow-600 text-black text-2xl font-black py-4 px-10 rounded-xl shadow-2xl hover:translate-y-1 hover:border-b-0 hover:mt-1 transition-all z-10">
                        TRY GAME FOR FREE
                    </button>
                {/* --- MAIN CTA & IMAGES --- */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full mb-20">

                    {/* Character Images Group */}
                    {/* Used 'items-end' to align them at the bottom so they sit on the same invisible floor */}
                    <div className="flex items-end gap-4 mt-8 md:mt-0">

                        {/* 1. Banana */}
                        <img
                            src="/images/banana-character.png"
                            alt="Banana Character"
                            className="w-20 md:w-24 transform -rotate-12 hover:rotate-0 transition-transform duration-300"
                        />

                        {/* 2. Laptop (Center) */}
                        <img
                            src="/images/laptop-icon.png"
                            alt="Laptop Coding"
                            className="w-24 md:w-32 drop-shadow-xl"
                        />

                        {/* 3. Cookie */}
                        <img
                            src="/images/cookie-character.png"
                            alt="Cookie Character"
                            className="w-20 md:w-24 transform rotate-12 hover:rotate-0 transition-transform duration-300"
                        />

                        {/* 4. DONUT IMAGE - Increased size for impact */}
                        <img
                            src="public/images/donut-character.png"
                            alt="Donut Character"
                            className="w-40 md:w-56 drop-shadow-2xl"
                        />

                        {/* Pink Bubble */}
                    <div className="flex flex-col items-center relative group">
                        {/* Speech Bubble */}
                        <div className="mb-50 bg-green-300 border-2 border-white p-6 rounded-2xl shadow-xl relative mb-4 w-64 transform group-hover:-translate-y-2 transition-transform">
                            <p className="font-bold text-black-800 text-lg">Sign up now for</p>
                            <p className="font-black text-2xl text-black">only 259$/Year!</p>
                            <div className="absolute -bottom-3 left-10 w-6 h-6 bg-pink-300 border-r-2 border-b-2 border-white transform rotate-45"></div>
                        </div>

                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-6 w-full px-4 mb-8">
                        <button className="w-full bg-blue-500 border-b-4 border-blue-700 text-white font-bold text-2xl py-4 rounded-lg shadow-lg uppercase hover:brightness-110 active:border-b-0 active:translate-y-1">
                            Sign Up Now
                        </button>

                        <div className="flex flex-col gap-2">
                            <span className="font-bold text-gray-600">Already have an account?</span>
                            <button className="w-full bg-pink-400 border-b-4 border-pink-600 text-white font-bold text-xl py-3 rounded-lg shadow uppercase hover:brightness-110">
                                Click here to sign in
                            </button>

                    </div>
                </div>
                </div>

                </div>
            </main>
        </div>
    );
};


export default App;