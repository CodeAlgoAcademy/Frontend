import React from 'react';

const App: React.FC = () => {
    console.log("Rendering App with Images");

    return (
        <div className="min-h-screen w-full bg-[url('/images/blackhistorybackground.png')] bg-cover bg-center bg-no-repeat">

            {/* --- NAVBAR --- */}
            <nav className="bg-stone-900 text-white py-4 px-6 flex items-center shadow-xl">
                <div className="flex items-center gap-3">
                    {}
                    <img src="../../public/assets/images/logo_white.png" alt="logo" className="h-10" />
                </div>

                <div className="hidden md:flex gap-8 text-sm font-medium text-gray-300 ml-10">
                    <a href="#" className="hover:text-white transition-colors">About</a>
                    <span className="text-gray-600">|</span>
                    <a href="#" className="hover:text-white transition-colors">Educators</a>
                    <span className="text-gray-600">|</span>
                    <a href="#" className="hover:text-white transition-colors">Parents</a>
                </div>

                <button className="ml-auto bg-white text-black px-6 py-2 font-bold text-sm rounded shadow hover:bg-gray-200 transition-colors cursor-pointer">
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
                        className="text-6xl md:text-8xl font-black text-red-800 tracking-wider drop-shadow-lg"
                        style={{ WebkitTextStroke: '2px brown' } as React.CSSProperties}
                    >
                        CODING
                    </h2>
                </div>

                <p className="max-w-3xl mt-8 text-1xl md:text-3xl font-bold text-gray-700 mb-16 font-mono leading-relaxed">
                    Engaging coding activities that support logical reasoning, creativity, and critical thinking - while honoring history
                </p>

                {/* --- MAIN CTA & IMAGES --- */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full mb-20">

                    {/* Main Button */}
                    <button className="bg-yellow-400 border-b-4 border-yellow-600 text-black text-2xl font-black py-4 px-10 rounded-xl shadow-2xl hover:translate-y-1 hover:border-b-0 hover:mt-1 transition-all z-10 cursor-pointer">
                        TRY GAME FOR FREE
                    </button>

                    {/* Character Images Group */}
                    <div className="flex items-end gap-4 mt-8 md:mt-0">
                        {/* 1. Banana */}
                        <img
                            src="../../public/assets/images/banana-character.png"
                            alt="Banana Character"
                            className="w-20 md:w-24 transform -rotate-12 hover:rotate-0 transition-transform duration-300"
                        />

                        {/* 2. Laptop (Center) */}
                        <img
                            src="../../public/assets/images/laptop-icon.png"
                            alt="Laptop Coding"
                            className="w-24 md:w-32 drop-shadow-xl"
                        />

                        {/* 3. Cookie */}
                        <img
                            src="../../public/assets/images/cookie-character.png"
                            alt="Cookie Character"
                            className="w-20 md:w-24 transform rotate-12 hover:rotate-0 transition-transform duration-300"
                        />
                    </div>
                </div>

                {/* --- BOTTOM GRID --- */}
                <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-12 items-end">

                    {/* LEFT: Donut + Pink Bubble */}
                    <div className="flex flex-col items-center relative group">
                        {/* Speech Bubble */}
                        <div className="bg-red-300 border-6 border-red-900 p-6 rounded-2xl shadow-xl relative mb-4 w-64 transform group-hover:-translate-y-2 transition-transform">
                            <p className="font-black text-black-800 text-lg">Sign up now for</p>
                            <p className="font-black text-2xl text-black">only 259$/Year!</p>
                            <div className="absolute -bottom-3 left-10 w-6 h-6 bg-red-300 border-r-4 border-b-2 border-red-900 transform rotate-45"></div>
                        </div>

                        {/* DONUT IMAGE */}
                        <img
                            src="../../public/assets/images/donut-character.png"
                            alt="Donut Character"
                            className="w-40 md:w-56 drop-shadow-2xl"
                        />
                    </div>

                    {/* CENTER: Action Buttons */}
                    <div className="flex flex-col gap-6 w-full px-4 mb-25">
                        <button className="w-full bg-green-500 border-b-4 border-green-700 text-black font-black text-2xl py-4 rounded-lg shadow-lg uppercase hover:brightness-110 active:border-b-0 active:translate-y-1 cursor-pointer">
                            Sign Up Now
                        </button>

                        <div className="flex flex-col gap-2">
                            <span className="font-bold text-gray-600">Already have an account?</span>
                            <button className="w-full bg-yellow-400 border-b-4 border-yellow-600 text-black font-black text-xl py-3 rounded-lg shadow uppercase hover:brightness-110 cursor-pointer">
                                Click here to sign in
                            </button>
                        </div>
                    </div>

                    {/* RIGHT: Quote Bubble */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="bg-red-300 border-6 border-red-900 p-11 rounded-2xl shadow-xl relative w-full transform hover:scale-105 transition-transform">
                            <p className="font-mono font-bold text-black text-2xl leading-tight">
                                "You lose your curiosity when you stop learning" <br/>
                                <span className="text-sm mt-2 block opacity-75">- Katherine Johnson</span>
                            </p>
                            <div className="absolute -bottom-3 right-10 w-6 h-6 bg-red-300 border-r-4 border-b-2 border-red-900 transform rotate-45"></div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;