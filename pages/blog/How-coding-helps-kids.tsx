import Footer from "@/components/home/new-home/footer";
import Navbar from "@/components/navbar/home/Navbar";
import BlogTitle from "@/components/press/BlogTitle";
import DropCapsParagraph from "@/components/press/DropCapsParagraph";
import ImagesContainer from "@/components/press/ImagesContainer";
import React from "react";

export default function HowCodingHelpsKids() {
   return (
      <section className="press-page min-h-screen w-full bg-[#f7f8ff] font-thabit">
         <Navbar />

         <div className="mx-auto mb-14 mt-8 max-w-[1100px] rounded-md bg-white p-3 px-6 shadow-md">
            <BlogTitle
               title="How Coding Helps Kids with Math and Problem-Solving"
               date="March 2026"
            />
            <ImagesContainer
               imageHeight={450}
               image="/assets/blog/codinghelpkids1.png"
               imageDetail="Coding as a pathway to stronger math skills and logical thinking"
            />

            <main className="mt-6">
               {/* Intro */}
               <section className="my-4">
                  <DropCapsParagraph text="Many parents see coding as a technical skill, but it is actually one of the most effective ways to sharpen a child's brain for math and logic. By moving math off the chalkboard and into a digital world, coding makes 'difficult' concepts feel like natural tools for creation." />
               </section>

               {/* Section 1 */}
               <section className="my-6">
                  <h2 className="mb-2 text-xl font-bold text-gray-800">
                     Breaking Down Big Problems (Decomposition)
                  </h2>
                  <p>
                     In coding, a large goal—like building a video game—is too complex to tackle all at once. Kids learn the art of
                     decomposition, which means breaking a big problem into tiny, manageable steps. This is exactly how high-level math
                     and science problems are solved; by learning to focus on one "sub-problem" at a time, children develop a structured
                     approach to thinking that removes the "math anxiety" often felt in the classroom.
                  </p>
               </section>

               {/* Section 2 */}
               <section className="my-6">
                  <h2 className="mb-2 text-xl font-bold text-gray-800">
                     Making Variables and Algebra Tangible
                  </h2>
                  <p>
                     Algebra can feel abstract and confusing when it's just letters on a page, but in Python, variables are essential
                     tools for keeping track of a player's score or health. When a child writes{" "}
                     <code className="rounded bg-gray-100 px-1 py-0.5 text-sm font-mono text-purple-700">
                        score = score + 10
                     </code>
                     , they aren't just doing a math exercise—they are seeing algebra in action. This hands-on experience transforms
                     "X" from a scary mystery into a useful container, making the transition to middle and high school math much smoother.
                  </p>
               </section>

               {/* Image break */}
               <ImagesContainer
                  imageHeight={380}
                  image="/assets/blog/codingkids3.png"
                  imageDetail="Children using Turtle Graphics to explore geometry and coordinates"
               />

               {/* Section 3 */}
               <section className="my-6">
                  <h2 className="mb-2 text-xl font-bold text-gray-800">
                     Visualizing Geometry and Coordinates
                  </h2>
                  <p>
                     Coding provides a playground for spatial reasoning. Through tools like Turtle Graphics, kids use angles, degrees,
                     and X/Y coordinates to draw shapes and patterns on the screen. Instead of just memorizing that a square has
                     90-degree corners, they have to instruct the computer to turn exactly 90 degrees to complete their drawing. This
                     visual feedback loop solidifies their understanding of geometry far more effectively than any textbook.
                  </p>
               </section>

               {/* Section 4 */}
               <section className="my-6">
                  <h2 className="mb-2 text-xl font-bold text-gray-800">
                     The Logic of Trial and Error (Debugging)
                  </h2>
                  <p>
                     Perhaps the greatest gift coding gives a child is a healthy relationship with failure. In math, an "X" on a test
                     feels like a defeat; in coding, a "bug" is just a puzzle waiting to be solved. The process of debugging teaches
                     kids to look at their logic critically, re-trace their steps, and try again. This builds incredible resilience and
                     a "growth mindset," turning them into persistent problem-solvers who aren't afraid of a challenge.
                  </p>
               </section>

               <hr className="my-6 border-[1.5px]" />

               <p className="text-sm italic text-gray-500">
                  Interested in getting your child started? Explore CodeAlgo Academy's gamified coding platform designed for K–8
                  students at{" "}
                  <a
                     href="https://codealgoacademy.com/"
                     className="text-purple-600 underline hover:text-purple-800"
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     codealgoacademy.com
                  </a>
                  .
               </p>
            </main>
         </div>

         <Footer />
      </section>
   );
}