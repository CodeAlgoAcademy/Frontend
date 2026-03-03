import React from "react";

const CodeToSuccess = () => {
   const steps = [
      {
         title: "Thinking",
         image: "/assets/landing/revamp/thinkingg.png",
         description:
            "Learning how to break down problems, ask the right questions, and make smart decisions, the same skills doctors, scientists, engineers, and architects use every day.",
      },
      {
         title: "Coding",
         image: "/assets/landing/revamp/coding.png",
         description:
            "Using that thinking to create real programs, build projects, and gain hands-on experience—the kind of skills that prepare students for high-demand, respected careers.",
      },
      {
         title: "Experience",
         image: "/assets/landing/revamp/experince.png",
         description:
            "Putting these skills to work through real internships with companies in the U.S. and around the world—giving students a head start toward becoming professionals they can be proud of.",
      },
   ];

   return (
      <section className="bg-[#040404] px-6 pb-28 pt-12 text-white md:pb-48">
         <div className="mx-auto max-w-[1200px]">
            <h1 className="mx-auto mt-6 max-w-fit rounded-md bg-mainRed py-3 px-5 text-center font-tiltWarp text-[1.9rem] font-bold shadow-md max-md:text-[1.3rem]">
               CODE YOUR WAY TO SUCCESS
            </h1>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
               {steps.map((step) => (
                  <div
                     key={step.title}
                     className="rounded-3xl bg-white  text-black shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
                  >
                     <img
                        src={step.image}
                        alt={step.title}
                     className="h-57 w-full rounded-2xl "
                     />
                     <div className="p-6">
                     <h3 className="mt-2 text-center text-xl font-bold font-tiltWarp">
                        {step.title}
                     </h3>

                     <p className="mt-4 text-center text-sm leading-relaxed">
                        {step.description}
                     </p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
};

export default CodeToSuccess;
