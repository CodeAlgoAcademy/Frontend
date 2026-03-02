// import React from "react";
// import { useRouter } from "next/router";

// const BlackHistoryHero = () => {
//    const { push } = useRouter();

//    const toSignUp = () => push("/signup");
//    const toLogin = () => push("/login");

//    return (
//       <header className="relative isolate">
//          <section className="relative flex min-h-screen w-full flex-col overflow-hidden bg-white ">
//             <div className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden break-all p-2 font-bold text-[40px] leading-[3] tracking-[40px] text-black opacity-10">
//                {"1 0 1 1 0 0 1 0 1 1 0 1 0 1 0 0 1 1 1 0 1 0 1 0 1 0 1 1 1 0 ".repeat(600)}
//             </div>

//             <div className="pointer-events-none absolute left-0 top-0 z-20 hidden h-full w-12 md:block">
//                <div className="absolute top-0 left-0 h-[350px] w-10 rounded-b-full bg-[#a00000]" />
//                <div className="absolute top-0 left-10 h-[300px] w-10 rounded-b-full bg-[#2d7a2d]" />

//                <div className="absolute top-[180px] left-4 h-[150px] w-2 rounded-full bg-white p-1">
//                   <div className="h-full w-full rounded-full bg-white" />
//                </div>
//             </div>

//             <div className="pointer-events-none absolute right-0 top-0 z-20 hidden h-full w-12 md:block">
//                <div className="absolute top-0 right-0 h-[350px] w-10 rounded-b-full bg-[#027600]" />
//                <div className="absolute top-0 right-10 h-[300px] w-10 rounded-b-full bg-[#AC0D0D]" />

//                <div className="absolute top-[180px] right-4 h-[150px] w-2 rounded-full bg-white p-1">
//                   <div className="h-full w-full rounded-full bg-white" />
//                </div>
//             </div>

//             <div className="relative z-10 flex flex-1 flex-col px-6 pt-10 pb-10 sm:px-10 lg:px-20">
//                <div className="mb-20 text-center">
//                   <h1 className=" mb-4 font-bungee text-2xl font-bold md:leading-[3rem] text-black sm:text-3xl lg:text-5xl">
//                      {" "}
//                      Celebrating Black History Through{" "}
//                      <br />
//                      <span
//                         className="mt-2 inline-block font-bungee text-[1.2em] font-extrabold uppercase tracking-wider text-[#960d0d]"
//                         style={{ WebkitTextStroke: "2px #000", paintOrder: "stroke fill" }}
//                      >
//                         Coding
//                      </span>
//                   </h1>

//                   <p
//                      className="mx-auto w-full max-w-3xl 
//               font-bold text-[#444343] md:mt-[5rem] sm:text-[1.75rem] md:leading-[2.55rem] font-source"
//                   >
//                      {" "}
//                      Engaging coding activities that support logical reasoning, creativity, and critical thinking – while honoring history
//                   </p>
//                </div>

//                <div className="mb-14 flex flex-col items-center justify-center gap-8 lg:flex-row">
//                   <button
//                      onClick={toLogin}
//                      className="rounded-xl border-b-[6px] border-[#c8a000] bg-[#f2d64d] px-10 py-5 font-bungee 
//                      font-bold uppercase text-black shadow-xl transition-all hover:translate-y-1 
//                      hover:border-b-[3px] active:translate-y-2 active:border-b-0 sm:text-2xl"
//                   >
//                      TRY GAME FOR FREE
//                   </button>

//                   <div className="flex scale-75 items-end sm:scale-100">
//                      <img src="/assets/landing/revamp/donut1.png" alt="" className="relative z-10 h-auto w-[80px] sm:w-[110px]" />
//                      <img src="/assets/landing/revamp/removebg.png" alt="" className="relative z-20 -ml-3 mb-1 h-auto w-[100px] sm:w-[130px]" />
//                      <img src="/assets/landing/revamp/donut1.png" alt="" className="relative z-10 -ml-3 h-auto w-[80px] sm:w-[110px]" />
//                   </div>
//                </div>

//                <div className="mt-auto grid grid-cols-1 items-end gap-2 lg:grid-cols-3 lg:gap-2 md:px-36">
//                   <div className="flex w-full flex-col items-center justify-center font-bungee">
//                      <div
//                         style={{
//                            background: "#eb9b9b",
//                            borderRadius: "20px",
//                            padding: "14px 16px",
//                            maxWidth: "250px",
//                            position: "relative",
//                            marginBottom: "2px",
//                            boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
//                            height: "100%",
//                            maxHeight: "400px",
//                         }}
//                      >
//                         <p
//                            style={{
//                               fontWeight: 700,
//                               fontSize: "1.25rem",
//                               color: "#000",
//                               textAlign: "center",
//                               lineHeight: 1.5,
//                               margin: 0,
//                            }}
//                         >
//                            Sign up now for only 259$/Year!
//                         </p>
//                         <div
//                            style={{
//                               position: "absolute",
//                               left: "35px",
//                               bottom: "-10px",
//                               width: "20px",
//                               height: "20px",
//                               background: "#eb9b9b",
//                               borderLeft: "4px solid #a4445c",
//                               borderBottom: "4px solid #a4445c",
//                               transform: "rotate(-45deg)",
//                            }}
//                         />
//                      </div>
//                      <img src="/assets/landing/revamp/donut.png" alt="Donut" className="h-auto w-64 drop-shadow-2xl" />

//                   </div>

//                   {/* CENTER: Action Buttons */}
//                   <div className="flex w-full flex-col items-center gap-3 pb-6">
//                      {" "}
//                      <button
//                         className=" font-bungee md:text-2rem text-[1.5rem] transition-all hover:translate-y-1 hover:border-b-[3px] active:translate-y-1 active:border-b-0"
//                         onClick={toSignUp}
//                         style={{
//                            width: "100%",
//                            maxWidth: "300px",
//                            background: "#5fc25f",
//                            border: "none",
//                            borderBottom: "6px solid #0d7a0d",
//                            borderRadius: "10px",
//                            padding: "16px 20px",
//                            fontWeight: 900,
//                            color: "#000",
//                            cursor: "pointer",
//                            letterSpacing: "1px",
//                            textTransform: "uppercase",
//                            boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
//                         }}
//                      >
//                         SIGN UP NOW
//                      </button>
//                      <div className="" style={{ width: "100%", maxWidth: "300px", textAlign: "center" }}>
//                         <p className=" mb-5 font-[monospace] text-[1rem] font-bold text-[#4a4a4a] md:mt-5">Already have an account?</p>
//                         <button
//                            onClick={toLogin}
//                             className="rounded-xl border-b-[6px] border-[#c8a000] bg-[#f2d64d] px-8 py-5 font-bungee 
//                      font-bold uppercase text-black shadow-xl 
//                      sm:text-lg mt-3"
//                         >
//                            CLICK HERE TO SIGN IN
//                         </button>
//                      </div>
//                   </div>

//                   <div className="flex w-full justify-center pb-6">
//                      {" "}
//                      <div
//                         style={{
//                            background: "#eb9b9b",
//                            borderRadius: "20px",
//                            padding: "18px 20px",
//                            position: "relative",
//                            boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
//                            maxWidth: "500px",
//                            width: "100%",
//                            textAlign:"center"
//                         }}
//                      >
//                         <p
//                            className="md:text-[1.33rem] text-[1rem] md:p-8"
//                            style={{
//                               fontFamily: "monospace",
//                               fontStyle: "italic",
//                               fontWeight: 600,
//                               color: "#000",
//                               lineHeight: 1.5,
//                               margin: "auto",
//                               maxWidth: "300px",
//                            width: "100%",
                           
//                            }}
//                         >
//                            "You lose your curiosity when you stop learning"  <br />
//                            <span className="text-xs text-[#4a4a4a]">
                              
//                               - Katherine Johnson
//                               </span> 
//                         </p>
//                         {/* Triangle pointer right */}
//                         <div
//                            style={{
//                               position: "absolute",
//                               right: "35px",
//                               bottom: "-10px",
//                               width: "20px",
//                               height: "20px",
//                               background: "#eb9b9b",
//                               borderRight: "4px solid #a4445c",
//                               borderBottom: "4px solid #a4445c",
//                               transform: "rotate(45deg)",
//                            }}
//                         />
//                      </div>
//                   </div>
//                </div>
//             </div>

//             {/* BOTTOM DECORATIVE STRIP */}
//             <div className="relative z-30 flex h-4 w-full">
//                <div className="flex-1 bg-red-500" />
//                <div className="flex-1 bg-pink-500" />
//                <div className="flex-1 bg-pink-300" />
//                <div className="flex-1 bg-pink-100" />
//             </div>

            
//          </section>
//       </header>
//    );
// };

// export default BlackHistoryHero;



// import React from "react";
// import { useRouter } from "next/router";

// const BlackHistoryHero = () => {
//    const { push } = useRouter();

//    const toSignUp = () => push("/signup");
//    const toLogin = () => push("/login");
//    const toPricing = () => push("/pricing");

//    return (
//       <header className="relative isolate">
//          <section className="relative flex min-h-screen w-full flex-col overflow-hidden bg-white">
//             {/* Binary background */}
//             <div className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden break-all p-2 font-bold text-[40px] leading-[3] tracking-[40px] text-black opacity-10">
//                {"1 0 1 1 0 0 1 0 1 1 0 1 0 1 0 0 1 1 1 0 1 0 1 0 1 0 1 1 1 0 ".repeat(600)}
//             </div>

//             {/* Left decorative column */}
//             <div className="pointer-events-none absolute left-0 top-0 z-20 hidden h-full w-12 md:block">
//                <div className="absolute top-0 left-0 h-[350px] w-10 rounded-b-full bg-[#a00000]" />
//                <div className="absolute top-0 left-10 h-[300px] w-10 rounded-b-full bg-[#2d7a2d]" />
//                <div className="absolute top-[180px] left-4 h-[150px] w-2 rounded-full bg-white p-1">
//                   <div className="h-full w-full rounded-full bg-white" />
//                </div>
//             </div>

//             {/* Right decorative column */}
//             <div className="pointer-events-none absolute right-0 top-0 z-20 hidden h-full w-12 md:block">
//                <div className="absolute top-0 right-0 h-[350px] w-10 rounded-b-full bg-[#027600]" />
//                <div className="absolute top-0 right-10 h-[300px] w-10 rounded-b-full bg-[#AC0D0D]" />
//                <div className="absolute top-[180px] right-4 h-[150px] w-2 rounded-full bg-white p-1">
//                   <div className="h-full w-full rounded-full bg-white" />
//                </div>
//             </div>

//             {/* Main content */}
//             <div className="relative z-10 flex flex-1 flex-col px-6 pt-10 pb-10 sm:px-10 lg:px-20">
//                {/* Title section */}
//                <div className="mb-10 text-center">
//                   <h1 className="mb-4 font-bungee text-2xl font-bold md:leading-[3rem] text-black sm:text-3xl lg:text-5xl">
//                      Celebrating Black History Through{" "}
//                      <br />
//                      <span
//                         className="mt-2 inline-block font-bungee text-[1.2em] font-extrabold uppercase tracking-wider text-[#960d0d]"
//                         style={{ WebkitTextStroke: "2px #000", paintOrder: "stroke fill" }}
//                      >
//                         Coding
//                      </span>
//                   </h1>

//                   <p className="mx-auto w-full max-w-3xl font-bold text-[#444343] md:mt-[2rem] sm:text-[1.75rem] md:leading-[2.55rem] font-source">
//                      Engaging coding activities that support logical reasoning, creativity, and critical thinking – while honoring history
//                   </p>
//                </div>

//                  <div className="w-full py-4 px-0 mb-8">
//                   <div className="container mx-auto">
//                      <div className="grid max-w-6xl grid-cols-1 items-center justify-center gap-5 sm:grid-cols-2 sm:gap-12 mx-auto">
//                         {/* Text */}
//                         <div className="pl-0 pt-0 text-black sm:pl-0">
//                            <h1 className="sm:mb-4 mb-2 max-w-xl text-lg font-extrabold leading-tight sm:text-xl md:text-4xl lg:text-5xl">
//                               Online Coding Classes <br />
//                               <span className="text-[#960d0d]">for Kids Ages 6–18</span> <br />
//                               Learn Programming Through Games
//                            </h1>
//                            <p className="sm:mb-5 mb-3 max-w-lg text-sm text-[#444343] sm:max-w-md sm:text-xl md:text-xl font-source font-bold">
//                               Fun, game-based coding courses for kids. Learn Python, algorithms & more — anywhere, anytime. Join thousands of young coders today.
//                            </p>
//                            {/* <div className="flex flex-col gap-4 xs:flex-row sm:flex-row">
//                               <button
//                                  onClick={toLogin}
//                                  className="rounded-lg bg-[#960d0d] px-8 py-4 text-sm font-bold text-white hover:bg-[#7a0a0a] lg:text-lg transition-colors font-bungee"
//                               >
//                                  Try For FREE
//                               </button>
//                               <button
//                                  onClick={toPricing}
//                                  className="rounded-lg border-2 border-black px-4 py-4 text-sm font-bold text-black hover:bg-black/5 sm:px-2 lg:px-8 lg:text-lg transition-colors font-bungee"
//                               >
//                                  See Pricing Plans
//                               </button>
//                            </div> */}
//                         </div>

//                         {/* Offer Card */}
//                         <div className="flex justify-center lg:justify-end">
//                            <div className="w-full max-w-sm rounded-2xl border border-black/10 bg-white/60 sm:p-5 p-3 text-black backdrop-blur-md shadow-xl">
//                               <div className="mb-3 text-center">
//                                  <span className="rounded-full bg-[#960d0d] px-3 py-1 text-sm font-bold uppercase text-white">
//                                     Annual Offer
//                                  </span>
//                               </div>
//                               <h3 className="sm:mb-3 mb-1 text-center text-xl font-bold text-[#960d0d] font-bungee">
//                                  GET UP TO <br />
//                                  <span className="text-2xl text-black md:text-3xl">20% OFF</span> <br />
//                                  MONTHLY PRICING
//                               </h3>
//                               <div className="sm:mb-6 mb-3 text-center">
//                                  <span className="text-2xl font-extrabold md:text-4xl">$21</span>
//                                  <span> / month</span>
//                                  <p className="mt-1 text-sm text-[#444343]">Billed annually. Cancel anytime.</p>
//                               </div>
//                               <button
//                                  onClick={toSignUp}
//                                  className="w-full rounded-lg bg-[#960d0d] py-3 font-bold text-white hover:bg-[#7a0a0a] transition-colors font-bungee"
//                               >
//                                  Learn More →
//                               </button>
//                            </div>
//                         </div>
//                      </div>
//                   </div>
//                </div>

//                {/* "TRY GAME FOR FREE" button + mascots */}
//                {/* <div className="mb-10 flex flex-col items-center justify-center gap-8 lg:flex-row">
//                   <button
//                      onClick={toLogin}
//                      className="rounded-xl border-b-[6px] border-[#c8a000] bg-[#f2d64d] px-10 py-5 font-bungee 
//                      font-bold uppercase text-black shadow-xl transition-all hover:translate-y-1 
//                      hover:border-b-[3px] active:translate-y-2 active:border-b-0 sm:text-2xl"
//                   >
//                      TRY GAME FOR FREE
//                   </button>

//                   <div className="flex scale-75 items-end sm:scale-100">
//                      <img src="/assets/landing/revamp/donut1.png" alt="" className="relative z-10 h-auto w-[80px] sm:w-[110px]" />
//                      <img src="/assets/landing/revamp/removebg.png" alt="" className="relative z-20 -ml-3 mb-1 h-auto w-[100px] sm:w-[130px]" />
//                      <img src="/assets/landing/revamp/donut1.png" alt="" className="relative z-10 -ml-3 h-auto w-[80px] sm:w-[110px]" />
//                   </div>
//                </div> */}

//                {/* === OVERLAY SECTION === */}
             
//                {/* === END OVERLAY SECTION === */}

//                {/* Bottom row: speech bubbles + sign up */}
//                <div className="mt-auto grid grid-cols-1 items-end gap-2 lg:grid-cols-3 lg:gap-2 md:px-36">
//                   <div className="flex w-full flex-col items-center justify-center font-bungee">
//                      <div
//                         style={{
//                            background: "#eb9b9b",
//                            borderRadius: "20px",
//                            padding: "14px 16px",
//                            maxWidth: "250px",
//                            position: "relative",
//                            marginBottom: "2px",
//                            boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
//                            height: "100%",
//                            maxHeight: "400px",
//                         }}
//                      >
//                         <p
//                            style={{
//                               fontWeight: 700,
//                               fontSize: "1.25rem",
//                               color: "#000",
//                               textAlign: "center",
//                               lineHeight: 1.5,
//                               margin: 0,
//                            }}
//                         >
//                            Sign up now for only 259$/Year!
//                         </p>
//                         <div
//                            style={{
//                               position: "absolute",
//                               left: "35px",
//                               bottom: "-10px",
//                               width: "20px",
//                               height: "20px",
//                               background: "#eb9b9b",
//                               borderLeft: "4px solid #a4445c",
//                               borderBottom: "4px solid #a4445c",
//                               transform: "rotate(-45deg)",
//                            }}
//                         />
//                      </div>
//                      <img src="/assets/landing/revamp/donut.png" alt="Donut" className="h-auto w-64 drop-shadow-2xl" />
//                   </div>

//                   {/* CENTER: Action Buttons */}
//                   <div className="flex w-full flex-col items-center gap-3 pb-6">
//                      <button
//                         className="font-bungee md:text-2rem text-[1.5rem] transition-all hover:translate-y-1 hover:border-b-[3px] active:translate-y-1 active:border-b-0"
//                         onClick={toSignUp}
//                         style={{
//                            width: "100%",
//                            maxWidth: "300px",
//                            background: "#5fc25f",
//                            border: "none",
//                            borderBottom: "6px solid #0d7a0d",
//                            borderRadius: "10px",
//                            padding: "16px 20px",
//                            fontWeight: 900,
//                            color: "#000",
//                            cursor: "pointer",
//                            letterSpacing: "1px",
//                            textTransform: "uppercase",
//                            boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
//                         }}
//                      >
//                         SIGN UP NOW
//                      </button>
//                      <div style={{ width: "100%", maxWidth: "300px", textAlign: "center" }}>
//                         <p className="mb-5 font-[monospace] text-[1rem] font-bold text-[#4a4a4a] md:mt-5">Already have an account?</p>
//                         <button
//                            onClick={toLogin}
//                            className="rounded-xl border-b-[6px] border-[#c8a000] bg-[#f2d64d] px-8 py-5 font-bungee 
//                            font-bold uppercase text-black shadow-xl sm:text-lg mt-3"
//                         >
//                            CLICK HERE TO SIGN IN
//                         </button>
//                      </div>
//                   </div>

//                   <div className="flex w-full justify-center pb-6">
//                      <div
//                         style={{
//                            background: "#eb9b9b",
//                            borderRadius: "20px",
//                            padding: "18px 20px",
//                            position: "relative",
//                            boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
//                            maxWidth: "500px",
//                            width: "100%",
//                            textAlign: "center",
//                         }}
//                      >
//                         <p
//                            className="md:text-[1.33rem] text-[1rem] md:p-8"
//                            style={{
//                               fontFamily: "monospace",
//                               fontStyle: "italic",
//                               fontWeight: 600,
//                               color: "#000",
//                               lineHeight: 1.5,
//                               margin: "auto",
//                               maxWidth: "300px",
//                               width: "100%",
//                            }}
//                         >
//                            "You lose your curiosity when you stop learning" <br />
//                            <span className="text-xs text-[#4a4a4a]">- Katherine Johnson</span>
//                         </p>
//                         <div
//                            style={{
//                               position: "absolute",
//                               right: "35px",
//                               bottom: "-10px",
//                               width: "20px",
//                               height: "20px",
//                               background: "#eb9b9b",
//                               borderRight: "4px solid #a4445c",
//                               borderBottom: "4px solid #a4445c",
//                               transform: "rotate(45deg)",
//                            }}
//                         />
//                      </div>
//                   </div>
//                </div>
//             </div>

//             {/* BOTTOM DECORATIVE STRIP */}
//             <div className="relative z-30 flex h-4 w-full">
//                <div className="flex-1 bg-red-500" />
//                <div className="flex-1 bg-pink-500" />
//                <div className="flex-1 bg-pink-300" />
//                <div className="flex-1 bg-pink-100" />
//             </div>
//          </section>
//       </header>
//    );
// };

// export default BlackHistoryHero;




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
                              <span className="text-[#960d0d]">for Kids Ages 6–18</span> <br />
                              Learn Programming Through Games
                           </h2>
                           <p className="mb-4 sm:mb-5 max-w-lg text-sm font-bold text-[#444343] sm:text-lg md:text-xl font-source">
                              Fun, game-based coding courses for kids. Learn Python, algorithms & more — anywhere, anytime. Join thousands of young coders today.
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

               {/* BOTTOM: speech bubbles + sign up */}
               <div className="mt-auto grid grid-cols-1 items-end gap-2 lg:grid-cols-3 lg:gap-2 md:px-36">

                  {/* Left speech bubble */}
                  <div className="flex w-full flex-col items-center justify-center font-bungee">
                     <div
                        style={{
                           background: "#eb9b9b", borderRadius: "20px", padding: "14px 16px",
                           maxWidth: "250px", position: "relative", marginBottom: "2px",
                           boxShadow: "0 4px 12px rgba(0,0,0,0.12)", height: "100%", maxHeight: "400px",
                        }}
                     >
                        <p style={{ fontWeight: 700, fontSize: "1.25rem", color: "#000", textAlign: "center", lineHeight: 1.5, margin: 0 }}>
                           Sign up now for only 259$/Year!
                        </p>
                        <div style={{ position: "absolute", left: "35px", bottom: "-10px", width: "20px", height: "20px", background: "#eb9b9b", borderLeft: "4px solid #a4445c", borderBottom: "4px solid #a4445c", transform: "rotate(-45deg)" }} />
                     </div>
                     <img src="/assets/landing/revamp/donut.png" alt="Donut" className="h-auto w-64 drop-shadow-2xl" />
                  </div>

                  {/* Center: sign up buttons */}
                  <div className="flex w-full flex-col items-center gap-3 pb-6">
                     <button
                        className="font-bungee text-[1.5rem] transition-all hover:translate-y-1 hover:border-b-[3px] active:translate-y-1 active:border-b-0"
                        onClick={toSignUp}
                        style={{ width: "100%", maxWidth: "300px", background: "#5fc25f", border: "none", borderBottom: "6px solid #0d7a0d", borderRadius: "10px", padding: "16px 20px", fontWeight: 900, color: "#000", cursor: "pointer", letterSpacing: "1px", textTransform: "uppercase", boxShadow: "0 4px 16px rgba(0,0,0,0.18)" }}
                     >
                        SIGN UP NOW
                     </button>
                     <div style={{ width: "100%", maxWidth: "300px", textAlign: "center" }}>
                        <p className="mb-5 font-[monospace] text-[1rem] font-bold text-[#4a4a4a] md:mt-5">Already have an account?</p>
                        <button onClick={toLogin} className="rounded-xl border-b-[6px] border-[#c8a000] bg-[#f2d64d] px-8 py-5 font-bungee font-bold uppercase text-black shadow-xl sm:text-lg mt-3">
                           CLICK HERE TO SIGN IN
                        </button>
                     </div>
                  </div>

                  {/* Right speech bubble */}
                  <div className="flex w-full justify-center pb-6">
                     <div style={{ background: "#eb9b9b", borderRadius: "20px", padding: "18px 20px", position: "relative", boxShadow: "0 4px 12px rgba(0,0,0,0.12)", maxWidth: "500px", width: "100%", textAlign: "center" }}>
                        <p className="md:text-[1.33rem] text-[1rem] md:p-8" style={{ fontFamily: "monospace", fontStyle: "italic", fontWeight: 600, color: "#000", lineHeight: 1.5, margin: "auto", maxWidth: "300px", width: "100%" }}>
                           "You lose your curiosity when you stop learning" <br />
                           <span className="text-xs text-[#4a4a4a]">- Katherine Johnson</span>
                        </p>
                        <div style={{ position: "absolute", right: "35px", bottom: "-10px", width: "20px", height: "20px", background: "#eb9b9b", borderRight: "4px solid #a4445c", borderBottom: "4px solid #a4445c", transform: "rotate(45deg)" }} />
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