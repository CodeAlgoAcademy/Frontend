import React from "react";
import Navigation from "components/navbar/home/Navbar";
const App: React.FC = () => {
   console.log("Rendering App with Images");

   return (
      <div className="min-h-screen w-full bg-[url('/assets/images/background2.png')] bg-cover bg-center bg-no-repeat">
         {/* --- NAVBAR --- */}
         <Navigation />

         {/* --- MAIN SECTION --- */}

         <main className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-12 text-center">
            {/* MAIN BOX */}
            <div className="mx-auto  w-full max-w-5xl bg-[#2F5E6A] p-8 shadow-2xl">
               {/* Closing Button */}
               <div className="flex justify-end ">
                  <button>
                     <img src="/assets/images/white-x.png" alt="white-x" className="mt-0 h-10" />
                  </button>
               </div>
               {/* First Line */}
               <h1 className="ml-4 mr-4 font-mono text-4xl tracking-tight text-white md:text-7xl">Turn Ideas into Games </h1>
               {/* Second Line */}
               <div>
                  <h1 className="ml-2 mr-2 inline font-mono text-4xl tracking-tight text-white md:text-7xl">and Develop Skills </h1>
               </div>
               {/* Third Line */}
               <div>
                  <h1 className="ml-2 mr-2 inline font-mono text-4xl tracking-tight text-white md:text-7xl">Through Code</h1>
               </div>
               {/* Main Button */}
               <button className="z-10 m-8 cursor-pointer rounded-xl bg-[#759CE6] py-4 px-12 text-3xl font-black text-white shadow-2xl transition-all hover:translate-y-1 hover:shadow-md">
                  TRY GAME FOR FREE
               </button>
               <p className="font-mono text-2xl tracking-tight text-white md:text-4xl">Only $259/Year!</p>
               {/*Button Box*/}
               <div className="flex w-full flex-col items-center justify-around gap-8 md:flex-row">
                  {/*Button1*/}
                  <button className="z-10 m-8 cursor-pointer bg-[#00FF3C] py-4 px-8 font-mono text-2xl text-black shadow-xl transition-all hover:translate-y-1 hover:shadow-md">
                     Web Design
                  </button>
                  {/*Button2*/}
                  <button className="z-10 m-8 cursor-pointer bg-[#FB0004] py-4 px-8 font-mono text-2xl text-white shadow-xl transition-all hover:translate-y-1 hover:shadow-md">
                     Game Development
                  </button>
                  {/*Button3*/}
                  <button className="z-10 m-8 cursor-pointer bg-[#FFFB00] py-4 px-8 font-mono text-2xl text-black shadow-xl transition-all hover:translate-y-1 hover:shadow-md">
                     App Creation
                  </button>
               </div>
            </div>
         </main>
      </div>
   );
};

export default App;
