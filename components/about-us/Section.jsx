import Image from "next/image";
import React, { useState } from "react";
import { BsDot } from "react-icons/bs";
import Link from "next/link";
import { CopyBlock, dracula } from "react-code-blocks";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-python";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-c";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-css";
import "prismjs/components/prism-go";
import "prismjs/themes/prism.css";
import { BiChevronDown } from "react-icons/bi";
import { Fade, Zoom } from "react-awesome-reveal";

const availableLang = ["python", "javascript", "c", "csharp", "css", "go"];

const Section = ({ title, detail, image, order, hasButton, codeEditor, extraImage, extraImagePosition }) => {
   const [code, setCode] = useState(`def sum(a,b):\n    return a+b`);
   const [currentLanguage, setCurrentLanguage] = useState("python");
   const [langModalOpen, setLangModalOpen] = useState(false);
   return (
      <section className="mt-12 w-full py-8 px-6">
         <div
            className={`mx-auto flex max-w-[1100px] flex-col items-center gap-x-[3rem] gap-y-[5rem]  ${
               order === 1 ? " md:flex-row" : "md:flex-row-reverse"
            }`}
         >
            <div className=" flex w-full flex-1 flex-col items-start gap-[14px]">
               <Fade triggerOnce={true} direction={order === 1 ? "left" : "right"} duration={1000}>
                  <h1 className="text-[1.5rem] font-bold leading-[1.1] text-slate-600 md:text-[2.2rem]">{title}</h1>
                  {typeof detail === "string" && <p className="text-[1.1rem]  text-slate-500">{detail}</p>}
                  {typeof detail !== "string" && (
                     <ul className=" list flex flex-col gap-4 px-6 text-slate-500">
                        {detail.map((item) => {
                           return (
                              <li className="text-[1.1rem]" key={item}>
                                 {item}
                              </li>
                           );
                        })}
                     </ul>
                  )}
                  {hasButton && (
                     <Link href={"/join-waitlist"}>
                        <button className="mt-2 min-w-fit rounded-lg bg-orange-400 p-3 text-[15px] font-bold text-white shadow-md">
                           Join Our Waiting List
                        </button>
                     </Link>
                  )}
               </Fade>
            </div>
            <div className="w-full flex-1">
               <Zoom direction={order === 1 ? "right" : "left"} fraction={0.2} triggerOnce={true} duration={1000}>
                  {/* if code editor is true, display the compiler-like item else display the image */}
                  {codeEditor && (
                     <div className="relative z-[2] h-[300px] overflow-hidden overflow-x-scroll rounded-md border-2 bg-[#222]">
                        <Editor
                           className="h-[300px] overflow-y-scroll border-none outline-none focus:border-none focus:outline-none"
                           value={code}
                           onValueChange={(code) => {
                              return setCode(code);
                           }}
                           highlight={(code) => {
                              console.log(code);
                              return highlight(code, languages[currentLanguage]);
                           }}
                           padding={10}
                           style={{ fontSize: 17, color: "white" }}
                        />
                     </div>
                  )}
                  {!codeEditor && (
                     <div className="relative z-[3] h-[450px]">
                        <div className="z-1 relative mx-auto h-full w-fit">
                           <img src={image} alt={title} className="z-[3] h-full rounded-[10px] object-contain object-center " />

                           {extraImage && <img src={extraImage} alt={title} className={`absolute w-[150px] object-contain ${extraImagePosition}`} />}
                        </div>
                     </div>
                  )}
               </Zoom>
            </div>
         </div>
      </section>
   );
};

export default Section;
