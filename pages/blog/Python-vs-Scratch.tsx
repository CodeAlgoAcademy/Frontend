import Footer from "@/components/home/new-home/footer";
import Navbar from "@/components/navbar/home/Navbar";
import BlogTitle from "@/components/press/BlogTitle";
import DropCapsParagraph from "@/components/press/DropCapsParagraph";
import ImagesContainer from "@/components/press/ImagesContainer";
import React from "react";

export default function PythonVsScratch() {
   return (
      <section className="press-page min-h-screen w-full bg-[#f7f8ff] font-thabit">
         <Navbar />

         <div className="mx-auto mb-14 mt-8 max-w-[1100px] rounded-md bg-white p-3 px-6 shadow-md">
            <BlogTitle
               title="Python vs. Scratch: Which Should My Child Learn First?"
               date="March 2026"
            />
            <ImagesContainer
               imageHeight={450}
               image="/assets/blog/python1.png"
               imageDetail="Choosing the right first programming language for your child"
            />

            <main className="mt-6">
               {/* Intro */}
               <section className="my-4">
                  <DropCapsParagraph text="Choosing the first programming language for your child is a big decision. While both Scratch and Python teach the fundamentals of logic, they offer very different experiences. Here is why Python might be the perfect 'next-level' choice for your young coder." />
               </section>

               {/* Section 1 */}
               <section className="my-6">
                  <h2 className="mb-2 text-xl font-bold text-gray-800">
                     Visual Blocks vs. Real-World Syntax
                  </h2>
                  <p>
                     Scratch uses a block-based interface where kids drag and drop colorful pieces to create animations. It's a
                     fantastic introduction to logic without the frustration of typing errors. However, Python introduces children to
                     the world of professional coding through a text-based syntax that is surprisingly easy to read. Since Python looks
                     like plain English, kids quickly learn how to write "real" code, giving them a massive boost in confidence as
                     they see their typed instructions come to life.
                  </p>
               </section>

               {/* Section 2 */}
               <section className="my-6">
                  <h2 className="mb-2 text-xl font-bold text-gray-800">
                     From Playing Games to Building Tools
                  </h2>
                  <p>
                     Scratch is primarily designed for storytelling and simple games, which is great for younger children. Python, on
                     the other hand, is a multi-purpose powerhouse used by NASA, Google, and Netflix. By starting with Python, your
                     child isn't just "playing" with code; they are learning a tool used in Data Science, Artificial Intelligence, and
                     Web Development. This shift from a closed ecosystem to an open-ended professional language makes the learning
                     process feel more meaningful and exciting.
                  </p>
               </section>

               {/* Image break */}
               <ImagesContainer
                  imageHeight={380}
                  image="/assets/blog/python2.png"
                  imageDetail="Young learners exploring text-based coding with Python"
               />

               {/* Section 3 */}
               <section className="my-6">
                  <h2 className="mb-2 text-xl font-bold text-gray-800">
                     Overcoming the "Syntax" Fear Early
                  </h2>
                  <p>
                     Many worry that typing code is too hard for kids, but Python's clean and minimalist structure is specifically
                     designed for clarity. Learning Python first (or shortly after Scratch) helps children develop attention to detail
                     and keyboard fluency. Mastering the "rules" of a text-based language early on prevents the "fear of the keyboard"
                     that some students face later in school, making them more adaptable to other languages like Java or C++.
                  </p>
               </section>

               {/* Section 4 */}
               <section className="my-6">
                  <h2 className="mb-2 text-xl font-bold text-gray-800">
                     A Bridge to Infinite Creativity
                  </h2>
                  <p>
                     While Scratch has its limits, Python is virtually infinite. Once a child understands the basics of Python, they
                     can explore thousands of external libraries to do anything from controlling a robot to analyzing sports statistics
                     or creating digital art. Python grows with your child, providing a lifelong skill that evolves from simple{" "}
                     <code className="rounded bg-gray-100 px-1 py-0.5 text-sm font-mono text-purple-700">
                        "Hello World"
                     </code>{" "}
                     scripts into complex, professional-grade projects.
                  </p>
               </section>

               <hr className="my-6 border-[1.5px]" />

               <p className="text-sm italic text-gray-500">
                  Ready to give your child a head start? CodeAlgo Academy teaches Python and more through a fun, gamified experience
                  built for K–8 learners. Visit us at{" "}
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