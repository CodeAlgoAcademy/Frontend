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
            {/* MAIN BOX */}
            <div className="bg-[#FFFF73]  shadow-2xl">
               {/* Closing Button */}
               <div className="flex justify-end ">
                  <button>
                     <img src="/assets/images/black-x.png" alt="black-x" className="mt-0 h-10" />
                  </button>
               </div>
               {/* First Line */}
               <h1 className="ml-20 mr-20 font-mono text-4xl tracking-tight text-black md:text-7xl">Building Kansas City </h1>
               {/* Second Line */}
               <div>
                  <h1 className="ml-2 mr-2 inline font-mono text-4xl tracking-tight text-black md:text-7xl">Future Coders</h1>
               </div>
               {/*Line */}
                  <img src="/assets/images/pink line.png" alt="Pink Line" className="w-full md:w-[750px] mt-8 mx-auto"/>
                <p className="mt-6 font-mono text-2xl tracking-tight text-black md:text-4xl">Only $259/Year!</p>
                
               {/*Pic Box*/}
               <div className="justify-around flex w-full flex-col items-center gap-8 md:flex-row">
                  {/*Buildings*/}
                  <img src="/assets/images/buildings.png" alt="Buildings" className="w-40 drop-shadow-2xl md:w-56" />
                  <div className="justify-around flex w-full flex-col items-center gap-2 md:flex-col">
                    {/* Main Button */}
                    <button className="z-10 mt-6 cursor-pointer rounded-xl bg-[#FF776D] py-4 px-12 text-3xl font-black text-white shadow-2xl transition-all hover:translate-y-1 hover:shadow-md">
                    TRY GAME FOR FREE
                    </button>
                    {/*City*/}
                    <img src="/assets/images/city.png" alt="City" className="w-40 md:w-56" />
                  </div>
                  {/*Fountain*/}
                  <img src="/assets/images/fountain.png" alt="Fountain" className="w-40 md:w-56 mt-auto" />
               </div>
            </div>
         </main>
      </div>
   );
};

export default App;