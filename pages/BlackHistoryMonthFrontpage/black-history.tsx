import React from "react";

const App: React.FC = () => {
   console.log("Rendering App with Images");

   return (
      <div className="min-h-screen w-full bg-[url('/assets/images/background2.png')] bg-cover bg-center bg-no-repeat">
         {/* --- NAVBAR --- */}
         <nav className="flex items-center bg-stone-900 py-4 px-6 text-white shadow-xl">
            <div className="flex items-center gap-3">
               {}
               <img src="/assets/images/logo_white.png" alt="logo" className="h-10" />
            </div>

            <div className="ml-10 hidden gap-8 text-sm font-medium text-gray-300 md:flex">
               <a href="#" className="transition-colors hover:text-white">
                  About
               </a>
               <span className="text-gray-600">|</span>
               <a href="#" className="transition-colors hover:text-white">
                  Educators
               </a>
               <span className="text-gray-600">|</span>
               <a href="#" className="transition-colors hover:text-white">
                  Parents
               </a>
            </div>

            <button className="ml-auto cursor-pointer rounded bg-white px-6 py-2 text-sm font-bold text-black shadow transition-colors hover:bg-gray-200">
               SIGN IN
            </button>
         </nav>

         {/* --- HERO SECTION --- */}

         <main className="container mx-auto flex flex-col items-center px-4 py-12 text-center">
            {/* HEADLINE */}
            <div className="relative z-10"></div>
            {/* First Line */}
            <h1 className="text-4xl font-bold tracking-tight text-black md:text-7xl">Celebrating Black History</h1>
            {/* Second Line */}
            <div>
               <h1 className="inline text-4xl font-bold tracking-tight text-black md:text-7xl">Through </h1>
               <h2
                  className="inline text-6xl font-bold tracking-wider text-red-800 drop-shadow-lg md:text-9xl"
                  style={{ WebkitTextStroke: "2px brown" } as React.CSSProperties}
               >
                  CODING
               </h2>
            </div>

            <p className="m-10 max-w-6xl font-mono text-xl font-bold leading-relaxed text-gray-700 md:text-3xl">
               Engaging coding activities that support logical reasoning, creativity, and critical thinking - while honoring history
            </p>

            {/* --- MAIN CTA & IMAGES --- */}
            <div className="flex w-full flex-col items-center justify-center gap-8 md:flex-row">
               {/* Main Button */}
               <button className="z-10 cursor-pointer rounded-xl border-b-4 border-yellow-600 bg-yellow-400 py-4 px-10 text-2xl font-black text-black shadow-2xl transition-all hover:mt-1 hover:translate-y-1 hover:border-b-0">
                  TRY GAME FOR FREE
               </button>

               {/* Character Images Group */}
               <div className="mt-6 flex items-end gap-4 md:mt-0">
                  {/* 1. Banana */}
                  <img
                     src="/assets/images/banana-character.png"
                     alt="Banana Character"
                     className="w-20 -rotate-12 transform transition-transform duration-300 hover:rotate-0 md:w-24"
                  />

                  {/* 2. Laptop (Center) */}
                  <img src="/assets/images/laptop-icon.png" alt="Laptop Coding" className="w-24 drop-shadow-xl md:w-32" />

                  {/* 3. Cookie */}
                  <img
                     src="/assets/images/cookie-character.png"
                     alt="Cookie Character"
                     className="w-20 rotate-12 transform transition-transform duration-300 hover:rotate-0 md:w-24"
                  />
               </div>
            </div>

            {/* --- BOTTOM GRID --- */}
            <div className="max-w-10xl grid w-full grid-cols-1 items-end gap-2 md:grid-cols-3">
               {/* LEFT: Donut + Pink Bubble */}
               <div className="group relative flex flex-row items-center">
                  {/* DONUT IMAGE */}
                  <img src="/assets/images/donut-character.png" alt="Donut Character" className="w-40 drop-shadow-2xl md:w-56" />

                  {/* Speech Bubble */}
                  <div className="relative ml-4 w-[22rem] rounded-2xl border-4 border-red-900 bg-red-300 pt-6 pb-6 shadow-xl transition-transform group-hover:-translate-y-2 md:w-[24rem]">
                     <p className="whitespace-normal break-words text-center text-lg font-semibold leading-snug">Sign up now for only 259$/Year!</p>

                     {/* Bubble Tail */}
                     <div className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 -rotate-45 transform border-l-4 border-t-4 border-red-900 bg-red-300"></div>
                  </div>
               </div>

               {/* CENTER: Action Buttons */}
               <div className="flex w-full flex-col gap-6 px-4">
                  <button className="ml-14 w-64 cursor-pointer rounded-lg border-b-4 border-green-700 bg-green-500 py-4 text-2xl font-black uppercase text-black shadow-lg hover:brightness-110 active:translate-y-1 active:border-b-0">
                     Sign Up Now
                  </button>

                  <div className="flex flex-col gap-2">
                     <span className="text-black-600 font-bold">Already have an account?</span>
                     <button className="ml-14 w-64 cursor-pointer rounded-lg border-b-4 border-yellow-600 bg-yellow-400 py-3 text-xl font-black uppercase text-black shadow hover:brightness-110">
                        Click here to <br /> sign in
                     </button>
                  </div>
               </div>

               {/* RIGHT: Quote Bubble */}
               <div className="flex flex-col items-center">
                  <div className="relative w-80 max-w-lg rounded-2xl border-4 border-red-900 bg-red-300 p-4 shadow-xl transition-transform hover:scale-105">
                     <p className="font-lightbold text-left font-mono text-2xl leading-tight text-black">
                        "You lose your curiosity when you stop learning" <br />- Katherine Johnson (Mathematician at NASA)
                     </p>
                     {/* Bubble Tail */}
                     <div className="absolute -bottom-3 left-1/2 h-6 w-6 translate-x-[-50%] -rotate-45 border-b-4 border-l-4 border-red-900 bg-red-300"></div>{" "}
                  </div>
               </div>
            </div>
         </main>
      </div>
   );
};

export default App;
