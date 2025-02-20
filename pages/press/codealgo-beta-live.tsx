import Footer from "@/components/home/new-home/footer";
import Navbar from "@/components/navbar/home/Navbar";
import BlogTitle from "@/components/press/BlogTitle";
import DropCapsParagraph from "@/components/press/DropCapsParagraph";
import Header from "@/components/press/Header";
import ImagesContainer from "@/components/press/ImagesContainer";
import Link from "@/components/press/Link";
import React from "react";

export default function CodeAlgoBetaLive() {
   return (
      <section className="press-page min-h-screen w-full bg-[#f7f8ff] font-thabit">
         <Navbar />
         <div className="mx-auto mb-14 mt-8 max-w-[1100px] rounded-md bg-white p-3 px-6 shadow-md">
            <BlogTitle title="Unlock the World of Coding Adventures: CodeAlgo Academy's Beta Platform is Now Live!" date="November, 2023" />
            <ImagesContainer
               imageHeight={450}
               image="/assets/blog/codealgo-beta-live.png"
               imageDetail="CodeAlgo Academy Beta Homepage"
               className="lg:!object-cover"
            />

            <main className="mt-6">
               <section className="my-4">
                  <DropCapsParagraph text="We are thrilled to share some exciting news with parents and young minds across the digital realm - CodeAlgo Academy has officially launched its Beta Platform! After operating in stealth mode and making waves in the tech education scene for kids across Kansas, we're now ready to open our doors wider and invite more users to experience the magic of coding with us." />
               </section>

               <section className="mt-3">
                  <BlogTitle title="Welcome to the Future of Learning" className="!text-[1.2rem]" />
                  <p>
                     Parents, if you've been on the lookout for a fun and engaging way to introduce your kids to the world of coding, look no further.
                     CodeAlgo Academy is here to revolutionize the learning experience for junior and middle schoolers. Our gamified approach takes
                     the complexity out of coding, making it not just educational but downright enjoyable.
                  </p>
               </section>

               <section className="mt-3">
                  <BlogTitle title="Welcome to the Future of Learning" className="!text-[1.2rem]" />
                  <p>
                     Parents, if you've been on the lookout for a fun and engaging way to introduce your kids to the world of coding, look no further.
                     CodeAlgo Academy is here to revolutionize the learning experience for junior and middle schoolers. Our gamified approach takes
                     the complexity out of coding, making it not just educational but downright enjoyable.
                  </p>
               </section>

               <section className="mt-3">
                  <BlogTitle title="Why Choose CodeAlgo Academy?" className="!text-[1.2rem]" />
                  <div>
                     <BlogTitle title="1️⃣ Fun and Engaging Learning" className="!text-[1.1rem]" />
                     <p>
                        At CodeAlgo Academy, we believe in learning through play. Our gamified approach transforms the fundamentals of coding into
                        exciting adventures that your kids will love.
                     </p>
                  </div>

                  <div>
                     <BlogTitle title="2️⃣ User-Friendly Interface" className="!text-[1.1rem]" />
                     <p>
                        No prior coding experience? No problem! Our intuitive interface ensures that kids can dive right into the world of coding
                        without any hurdles.
                     </p>
                  </div>

                  <div>
                     <BlogTitle title="3️⃣ Comprehensive Curriculum" className="!text-[1.1rem]" />
                     <p>
                        We've got the basics covered. Our curriculum takes young minds through the essentials of coding, setting a strong foundation
                        for their tech journey.
                     </p>
                  </div>
               </section>

               <section className="mt-3">
                  <BlogTitle title="How to Get Started in 3 Simple Steps" className="!text-[1.2rem]" />
                  <p className="mt-1">Ready to embark on this coding journey with us? Here's how you can get started:</p>
                  <div>
                     <BlogTitle title="1. 🦄 Create a Parent Account" className="!text-[1.1rem]" />
                     <p>
                        Head to our <Link text="Beta Platform" link="https://www.codealgoacademy.com/" /> and kick things off by creating your parent
                        account. Don't forget to verify your email address for seamless access.
                     </p>
                     <ImagesContainer
                        imageHeight={450}
                        image="/assets/blog/codealgo-beta-live3.png"
                        imageDetail="CodeAlgo Academy Beta Parent Sign Up"
                        className="lg:!object-cover"
                     />
                  </div>

                  <div>
                     <BlogTitle title="2. 🦄 Set Up Your Kid's Profile" className="!text-[1.1rem]" />
                     <p>Create a gaming profile for your kid and watch as they dive into a world of coding adventures.</p>
                     <ImagesContainer
                        imageHeight={450}
                        image="/assets/blog/codealgo-beta-live2.png"
                        imageDetail="CodeAlgo Academy Beta Kid's Profile Setup"
                        className="lg:!object-cover"
                     />
                  </div>

                  <div>
                     <BlogTitle title="3. 🦄 Parental Control" className="!text-[1.1rem]" />
                     <p>
                        Worried about screen time? We've got you covered. Set restrictions on your child's profile, giving you peace of mind while
                        they explore and learn.
                     </p>
                     <ImagesContainer
                        imageHeight={450}
                        image="/assets/blog/codealgo-beta-live1.png"
                        imageDetail="CodeAlgo Academy Beta Kid's Screentime Setup"
                        className="lg:!object-cover"
                     />
                  </div>
               </section>

               <section className="mt-3">
                  <BlogTitle title="Unleash the Coding Prodigy in Every Child" className="!text-[1.2rem]" />
                  <p className="mt-1">
                     Our platform goes beyond just coding - it's about unleashing the genius in every child. As they play, learn, and conquer
                     missions, they'll be acquiring fundamental coding practices, earning skins, and discovering the joy of problem-solving.
                  </p>
                  <p className="mt-1">
                     We're confident that your kids will love learning to code with CodeAlgo Academy because, at CodeAlgo Academy, every child is a
                     genius.
                  </p>
                  <p className="mt-1">
                     Ready to embark on this coding adventure with us? <Link text="Get started now!" link="https://www.codealgoacademy.com" />
                  </p>
               </section>
            </main>
         </div>
         <Footer />
      </section>
   );
}
