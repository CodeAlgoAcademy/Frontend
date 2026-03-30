import React from "react";
import Navigation from "components/navbar/home/Navbar.tsx"

const App: React.FC = () => {
   console.log("Rendering App with Images");

   return (
      <div className="min-h-screen w-full bg-[url('/assets/images/background2.png')] bg-cover bg-center bg-no-repeat">
         {/* --- NAVBAR --- */}
         <Navigation />

         {/* --- MAIN SECTION --- */}

         <main className="mx-auto flex flex-col min-h-screen items-center justify-center px-4 py-12 text-center">
            {/* MAIN BOX */}
            <div className="bg-[#4EAEB4] shadow-2xl w-full max-w-5xl mx-auto p-8">
               {/* Closing Button */}
               <div className="flex justify-end ">
                  <button>
                     <img src="/assets/images/white-x.png" alt="white-x" className="mt-0 h-10" />
                  </button>
               </div>
               {/* First Line */}
               <h1 className="ml-2 mr-2 font-mono text-4xl tracking-tight text-white md:text-7xl">Coding Adventures from </h1>
               {/* Second Line */}
               <div>
                  <h1 className="ml-2 mr-2 inline font-mono text-4xl tracking-tight text-white md:text-7xl">Kindergarten to 12th Grade</h1>
               </div>
                {/* Main Button */}
                <button className="z-10 m-8 cursor-pointer rounded-xl bg-[#7CCF3A] py-4 px-12 text-3xl font-black text-white shadow-2xl transition-all hover:translate-y-1 hover:shadow-md">
                    TRY GAME FOR FREE
                </button>
                <p className="font-mono text-2xl tracking-tight text-white md:text-4xl">Only $259/Year!</p>
               {/*Pic Box*/}
               <div className="justify-around flex w-full flex-col items-center gap-8 md:flex-row">
                  {/*Students*/}
                  <img src="/assets/images/students.png" alt="Students" className="w-40 drop-shadow-2xl md:w-56" />
                  {/*Teacher*/}
                  <img src="/assets/images/teacher.png" alt="Teacher" className="w-40 md:w-56" />
                  {/*Dots*/}
                  <img src="/assets/images/dots.png" alt="Dots" className="w-40 md:w-56 mt-auto" />
               </div>
            </div>
         </main>
      </div>
   );
};

export default App;