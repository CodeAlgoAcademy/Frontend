import React from "react";
import { useRouter } from "next/router";

const BlackHistoryHero = () => {
   const { push } = useRouter();

   const toSignUp = () => push("/signup");
   const toLogin = () => push("/login");
   const toPricing = () => push("/pricing");

   return (
      <header className="relative isolate">
         <section className="relative flex min-h-screen w-full flex-col overflow-hidden bg-white">

            <div className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden break-all p-2 font-bold text-[40px] leading-[3] tracking-[40px] text-black opacity-10">
               {"1 0 1 1 0 0 1 0 1 1 0 1 0 1 0 0 1 1 1 0 1 0 1 0 1 0 1 1 1 0 ".repeat(600)}
            </div>

            {/* ── Left decorative column ── */}
            <div className="pointer-events-none absolute left-0 top-0 z-20 hidden h-full w-12 md:block">
               <div className="absolute top-0 left-0 h-[350px] w-10 rounded-b-full bg-[#a00000]" />
               <div className="absolute top-0 left-10 h-[300px] w-10 rounded-b-full bg-[#2d7a2d]" />
               <div className="absolute top-[180px] left-4 h-[150px] w-2 rounded-full bg-white p-1">
                  <div className="h-full w-full rounded-full bg-white" />
               </div>
            </div>

            {/* ── Right decorative column ── */}
            <div className="pointer-events-none absolute right-0 top-0 z-20 hidden h-full w-12 md:block">
               <div className="absolute top-0 right-0 h-[350px] w-10 rounded-b-full bg-[#027600]" />
               <div className="absolute top-0 right-10 h-[300px] w-10 rounded-b-full bg-[#AC0D0D]" />
               <div className="absolute top-[180px] right-4 h-[150px] w-2 rounded-full bg-white p-1">
                  <div className="h-full w-full rounded-full bg-white" />
               </div>
            </div>

            {/* ── Main flow content ── */}
            <div className="relative z-10 flex flex-1 flex-col px-6 pt-10 pb-10 sm:px-10 lg:px-20">

               {/* TOP: Black History title */}
               <div className="mb-8 text-center">
                  <h1 className="mb-4 font-bungee text-2xl font-bold md:leading-[3rem] text-black sm:text-3xl lg:text-5xl">
                     Celebrating Black History Through{" "}
                     <br />
                     <span
                        className="mt-2 inline-block font-bungee text-[1.2em] font-extrabold uppercase tracking-wider text-[#960d0d]"
                        style={{ WebkitTextStroke: "2px #000", paintOrder: "stroke fill" }}
                     >
                        Coding
                     </span>
                  </h1>
               </div>

               {/* MIDDLE: Gray-tinted overlay panel with coding classes info + pricing card */}
               <div className="relative mb-8 overflow-hidden rounded-2xl">
                  {/* Tint — separate layer so opacity doesn't bleed into children */}
                  <div className="absolute inset-0 bg-gray-400 opacity-10 pointer-events-none rounded-2xl" />

                  <div className="relative z-10 container mx-auto px-4 py-8 sm:px-8 sm:py-10">
                     <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-2 sm:gap-12">

                        {/* Left: text + CTA buttons */}
                        <div>
                           <h2 className="mb-2 sm:mb-4 max-w-xl text-lg font-extrabold leading-tight text-black sm:text-xl md:text-4xl lg:text-5xl">
                              Online Coding Classes <br />
                              <span className="text-[#960d0d]">for Kids Ages 6–14</span> <br />
                              Learn Programming Through Games
                           </h2>
                           <p className="mb-4 sm:mb-5 max-w-lg text-sm font-bold text-[#444343] sm:text-lg md:text-xl font-source">
                              Fun, game-based coding courses for kids. Learn Python, algorithms & more anywhere, anytime. Join thousands of young coders today.
                           </p>
                           <div className="flex flex-col gap-4 xs:flex-row sm:flex-row">
                              <button
                                 onClick={toLogin}
                                 className="rounded-lg bg-[#960d0d] px-8 py-4 text-sm font-bold text-white hover:bg-[#7a0a0a] lg:text-lg transition-colors font-bungee"
                              >
                                 Try For FREE
                              </button>
                              <button
                                 onClick={toPricing}
                                 className="rounded-lg border-2 border-black px-4 py-4 text-sm font-bold text-black hover:bg-black/5 sm:px-6 lg:px-8 lg:text-lg transition-colors font-bungee"
                              >
                                 See Pricing Plans
                              </button>
                           </div>
                        </div>

                        {/* Right: offer card */}
                        <div className="flex justify-center lg:justify-end">
                           <div className="w-full max-w-sm rounded-2xl border border-black/10 bg-white/70 p-3 sm:p-5 text-black backdrop-blur-md shadow-xl">
                              <div className="mb-3 text-center">
                                 <span className="rounded-full bg-[#960d0d] px-3 py-1 text-sm font-bold uppercase text-white">
                                    Annual Offer
                                 </span>
                              </div>
                              <h3 className="mb-1 sm:mb-3 text-center text-xl font-bold text-[#960d0d] font-bungee">
                                 GET UP TO <br />
                                 <span className="text-2xl text-black md:text-3xl">20% OFF</span> <br />
                                 MONTHLY PRICING
                              </h3>
                              <div className="mb-3 sm:mb-6 text-center">
                                 <span className="text-2xl font-extrabold md:text-4xl">$21</span>
                                 <span> / month</span>
                                 <p className="mt-1 text-sm text-[#444343]">Billed annually. Cancel anytime.</p>
                              </div>
                              <button
                                 onClick={toSignUp}
                                 className="w-full rounded-lg bg-[#960d0d] py-3 font-bold text-white hover:bg-[#7a0a0a] transition-colors font-bungee"
                              >
                                 Learn More →
                              </button>
                           </div>
                        </div>

                     </div>
                  </div>
               </div>

            </div>

            {/* ── Bottom decorative strip ── */}
            <div className="relative z-30 flex h-4 w-full">
               <div className="flex-1 bg-red-500" />
               <div className="flex-1 bg-pink-500" />
               <div className="flex-1 bg-pink-300" />
               <div className="flex-1 bg-pink-100" />
            </div>

         </section>
      </header>
   );
};

export default BlackHistoryHero;