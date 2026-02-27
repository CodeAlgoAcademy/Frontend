import React from "react";

const App: React.FC = () => {
   console.log("Rendering App with Images");

   return (
      <div className="min-h-screen w-full bg-[url('/assets/images/blackhistorybackground.png')] bg-cover bg-center bg-no-repeat">
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
            <div className="relative z-10">
               {/* First Line */}
               <h1 className="text-4xl font-bold tracking-tight text-black md:text-5xl">Celebrating Black History</h1>

               {/* Second Line */}
               <div>
                  <h1 className="inline text-4xl font-bold tracking-tight text-black md:text-5xl">Through </h1>
                  <h2
                     className="inline text-6xl font-black tracking-wider text-red-800 drop-shadow-lg md:text-8xl"
                     style={{ WebkitTextStroke: "2px brown" } as React.CSSProperties}
                  >
                     CODING
                  </h2>
               </div>
            </div>

            <p className="mt-4 max-w-5xl font-mono text-xl font-bold leading-relaxed text-gray-700 md:text-3xl">
               Engaging coding activities that support logical reasoning, creativity, and critical thinking - while honoring history
            </p>

            {/* --- MAIN CTA & IMAGES --- */}
            <div className="flex w-full flex-col items-center justify-center gap-8 md:flex-row">
               {/* Main Button */}
               <button className="z-10 cursor-pointer rounded-xl border-b-4 border-yellow-600 bg-yellow-400 py-4 px-10 text-2xl font-black text-black shadow-2xl transition-all hover:mt-1 hover:translate-y-1 hover:border-b-0">
                  TRY GAME FOR FREE
               </button>

               {/* Character Images Group */}
               <div className="mt-8 flex items-end gap-4 md:mt-0">
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
            <div className="grid w-full max-w-6xl grid-cols-1 items-end gap-12 md:grid-cols-3">
               {/* LEFT: Donut + Pink Bubble */}
               <div className="group relative flex flex-row items-center">
                  {/* DONUT IMAGE */}
                  <img src="/assets/images/donut-character.png" alt="Donut Character" className="w-40 drop-shadow-2xl md:w-56" />
                  {/* Speech Bubble */}
                  <div className="border-6 relative w-64 transform rounded-2xl border-red-900 bg-red-300 p-6 shadow-xl transition-transform group-hover:-translate-y-2">
                     <p className="text-black-800 text-lg font-black">Sign up now for</p>
                     <p className="text-2xl font-black text-black">only 259$/Year!</p>
                     <div className="absolute -bottom-3 left-10 h-6 w-6 rotate-45 transform border-r-4 border-b-2 border-red-900 bg-red-300"></div>
                  </div>
               </div>

               {/* CENTER: Action Buttons */}
               <div className="flex w-full flex-col gap-6 px-4">
                  <button className="w-full cursor-pointer rounded-lg border-b-4 border-green-700 bg-green-500 py-4 text-2xl font-black uppercase text-black shadow-lg hover:brightness-110 active:translate-y-1 active:border-b-0">
                     Sign Up Now
                  </button>

                  <div className="flex flex-col gap-2">
                     <span className="font-bold text-gray-600">Already have an account?</span>
                     <button className="w-full cursor-pointer rounded-lg border-b-4 border-yellow-600 bg-yellow-400 py-3 text-xl font-black uppercase text-black shadow hover:brightness-110">
                        Click here to sign in
                     </button>
                  </div>
               </div>

               {/* RIGHT: Quote Bubble */}
               <div className="flex flex-col items-center">
                  <div className="border-6 relative w-full transform rounded-2xl border-red-900 bg-red-300 p-11 shadow-xl transition-transform hover:scale-105">
                     <p className="font-mono text-2xl font-bold leading-tight text-black">
                        "You lose your curiosity when you stop learning" <br />
                        <span className="mt-2 block text-sm opacity-75">- Katherine Johnson</span>
                     </p>
                     <div className="absolute -bottom-3 right-10 h-6 w-6 rotate-45 transform border-r-4 border-b-2 border-red-900 bg-red-300"></div>
                  </div>
               </div>
            </div>
         </main>
      </div>
   );
};

export default App;
