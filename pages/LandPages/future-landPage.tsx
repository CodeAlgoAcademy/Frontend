import React from "react";
import Navigation from "components/navbar/home/Navbar.tsx"

const App: React.FC = () => {
   console.log("Rendering App with Images");

   return (
      <div className="min-h-screen w-full bg-[url('/assets/images/background2.png')] bg-cover bg-center bg-no-repeat">
         {/* --- NAVBAR --- */}
         <Navigation />

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
               <img src="/assets/images/pink line.png" alt="Pink Line" className="mx-auto mt-8 w-full md:w-[750px]" />
               <p className="mt-6 font-mono text-2xl tracking-tight text-black md:text-4xl">Only $259/Year!</p>

               {/*Pic Box*/}
               <div className="flex w-full flex-col items-center justify-around gap-8 md:flex-row">
                  {/*Buildings*/}
                  <img src="/assets/images/buildings.png" alt="Buildings" className="mt-auto w-40 drop-shadow-2xl md:w-56" />
                  <div className="flex w-full flex-col items-center justify-around md:flex-col">
                     {/* Main Button */}
                     <button className="z-10 mt-6 cursor-pointer rounded-xl bg-[#FF776D] py-4 px-12 text-3xl font-black text-white shadow-2xl transition-all hover:translate-y-1 hover:shadow-md">
                        TRY GAME FOR FREE
                     </button>
                     {/*City*/}
                     <img src="/assets/images/city.png" alt="City" className="w-40 md:w-56" />
                  </div>
                  {/*Fountain*/}
                  <img src="/assets/images/fountain.png" alt="Fountain" className="mt-auto w-40 md:w-56" />
               </div>
            </div>
         </main>
      </div>
   );
};

export default App;
