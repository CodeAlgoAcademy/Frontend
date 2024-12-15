import Footer from "@/components/home/new-home/footer";
import Navbar from "@/components/navbar/home/Navbar";
import Image from "next/image";
import React, { FC, MutableRefObject, useEffect, useRef, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { cn } from "utils";

const FAQ = () => {
   return (
      <div className="relative overflow-x-hidden font-thabit">
         <Navbar />
         <Image src={"/assets/home-banner.png"} width={1500} height={400} />

         <div className="mx-auto mt-5 max-w-[1200px] p-6">
            <h1 className="text-center  text-[2.1rem]">CodeAlgo FAQ</h1>

            <section className="mx-auto mt-10 max-w-[700px] space-y-3">
               <h1 className="!mb-6 text-[1.5rem] font-bold">Account</h1>

               <SingleAccordion question="How do I create an account?" />
               <SingleAccordion question="What information is required to create an account?" />
               <SingleAccordion question="Can I create an account for my child?" />
               <SingleAccordion question="How do I log in to my account?" />
               <SingleAccordion question="What should I do if I forget my password?" />
            </section>

            <section className="mx-auto mt-10 max-w-[700px] space-y-3">
               <h1 className="!mb-6 text-[1.5rem] font-bold">Features</h1>

               <SingleAccordion question="How do I get started?" />
               <SingleAccordion question="What devices can I use to play?" />
               <SingleAccordion question="How long does it take to learn coding concepts?" />
               <SingleAccordion question="Can I save my progress and resume later?" />
               <SingleAccordion question="Are there different difficulty levels?" />
               <SingleAccordion question="What kind of feedback and support is available?" />
               <SingleAccordion question="How do I track my child's progress?   " />
            </section>

            <section className="mx-auto mt-10 max-w-[700px] space-y-3">
               <h1 className="!mb-6 text-[1.5rem] font-bold">General Pricing</h1>

               <SingleAccordion question="How much does a subscription cost?" />
               <SingleAccordion question="What are the different subscription plans available?" />
               <SingleAccordion question="Is there a free trial?" />
               <SingleAccordion question="Can I cancel my subscription at any time?" />
            </section>

            <section className="mx-auto mt-10 max-w-[700px] space-y-3">
               <h1 className="!mb-6 text-[1.5rem] font-bold">Feedback</h1>

               <SingleAccordion question="How can I provide feedback or report a bug?" />
               <SingleAccordion question="How does the platform use user feedback?" />
            </section>

            <section className="mx-auto mt-10 max-w-[700px] space-y-3">
               <h1 className="!mb-6 text-[1.5rem] font-bold">Legal & Compliance:</h1>

               <SingleAccordion question="What is your privacy policy?" />
               <SingleAccordion question="What are your terms of service?" />
               <SingleAccordion question="How do you comply with child safety regulations?" />
            </section>
         </div>

         <Footer />
      </div>
   );
};

interface AccordionProps {
   question: string;
   answer?: string;
}

const SingleAccordion: FC<AccordionProps> = ({ question, answer }) => {
   const [isOpen, setIsOpen] = useState(false);
   const [height, setHeight] = useState(0);
   const ref = useRef<HTMLParagraphElement>();

   useEffect(() => {
      if (ref) {
         setHeight(ref?.current?.getBoundingClientRect().height ?? 0);
      }
   }, [ref]);
   return (
      <article>
         <header className="mb-5 flex items-center justify-between gap-3">
            <h1 className="font-bold">{question}</h1>
            <span
               onClick={() => setIsOpen(!isOpen)}
               className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full bg-mainPink text-white"
            >
               {isOpen ? <BiMinus size={25} /> : <BiPlus size={25} />}
            </span>
         </header>

         <div className={cn("overflow-hidden transition-all duration-300")} style={{ height: isOpen ? height : 0 }}>
            <p ref={ref as MutableRefObject<HTMLParagraphElement>} className="p-3 text-[.8rem]">
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem mollitia sit, maxime a explicabo aperiam rem commodi reiciendis
               accusamus! Soluta magni placeat voluptates nemo porro explicabo nesciunt autem praesentium possimus fugiat, numquam ut, eaque
               recusandae alias quis obcaecati debitis qui rem, unde odio eius. Veniam quas fugit culpa dicta autem, voluptatem pariatur repudiandae,
               aliquid beatae qui possimus id vel laudantium architecto labore, incidunt obcaecati facere excepturi quis cumque ipsa! Atque iure
               optio, fuga molestias eaque consequatur, sapiente commodi, omnis architecto itaque ipsum. Nemo voluptates blanditiis error qui cum
               molestias illum! Numquam eos unde cumque est quisquam! Maxime blanditiis recusandae sit?
            </p>
         </div>
      </article>
   );
};

export default FAQ;
