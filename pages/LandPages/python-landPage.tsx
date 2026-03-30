import React from "react";
import Navigation from "components/navbar/home/Navbar";

const App: React.FC = () => {
   console.log("Rendering App with Images");

   return (
      <div className="min-h-screen w-full bg-[url('/assets/images/background2.png')] bg-cover bg-center bg-no-repeat">
         {/* --- NAVBAR --- */}
         <Navigation />

         {/* --- MAIN SECTION --- */}

         <main className="mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-12 text-center">
            {/* BLACK BOX */}
            <div className="relative mx-auto w-full max-w-5xl bg-black p-8 shadow-2xl">
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
                  {/*Python Logo */}
                  <img src="/assets/images/pythonlogo.png" alt="Python Logo" className="w-24 md:w-64" />
               </div>
               <p className="mb-8 font-mono text-2xl tracking-tight text-white md:text-4xl">Only $259/Year!</p>
               <img src="/assets/images/grass.png" alt="Grass" className="absolute bottom-0 left-0 w-full" />
            </div>
         </main>
      </div>
   );
};

export default App;
