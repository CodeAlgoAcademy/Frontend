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

         {/* --- MAIN SECTION --- */}

         <main className="container mx-auto flex flex-col items-center px-4 py-12 text-center">
            {/* BLACK BOX */}
            <div className="bg-black  shadow-2xl">
               {/* Closing Button */}
               <div className="flex justify-end ">
                  <button>
                     <img src="/assets/images/white-x.png" alt="white-x" className="mt-0 h-10" />
                  </button>
               </div>
               {/* First Line */}
               <h1 className="font-mono text-4xl tracking-tight text-white md:text-7xl">Turn Screen Time Into</h1>
               {/* Second Line */}
               <div>
                  <h1 className="inline font-mono text-4xl tracking-tight text-white md:text-7xl">Python Time.</h1>
               </div>
               {/*Main Box*/}
               <div className="justify-even mt-8 flex w-full flex-col items-center gap-8 md:flex-row">
                  {/*Blue Boy*/}
                  <img src="/assets/images/blueBoy.png" alt="Blue Boy" className="w-40 drop-shadow-2xl md:w-56" />
                  {/* Main Button */}
                  <button className="z-10 cursor-pointer rounded-xl border-b-4 border-[#E60909] bg-[#E60909] py-4 px-12 text-3xl font-black text-white shadow-2xl transition-all hover:mt-1 hover:translate-y-1 hover:border-b-0">
                     TRY GAME FOR FREE
                  </button>
                  {/*Snake */}
                  <img src="/assets/images/snake.png" alt="Snake" className="w-24 md:w-32" />
               </div>
               <img src="/assets/images/grass.png" alt="Grass" />
            </div>
         </main>
      </div>
   );
};

export default App;
