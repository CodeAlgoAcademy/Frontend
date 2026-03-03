import Footer from "@/components/home/new-home/footer";
import Navbar from "@/components/navbar/home/Navbar";
import BlogTitle from "@/components/press/BlogTitle";
import DropCapsParagraph from "@/components/press/DropCapsParagraph";
import ImagesContainer from "@/components/press/ImagesContainer";
import React from "react";



export default function CodeAlgoStudentsPage() {
   return (
      <section className="press-page min-h-screen w-full bg-[#f7f8ff] font-thabit">
         <Navbar />
         <div className="mx-auto mb-14 mt-8 max-w-[1100px] rounded-md bg-white p-3 px-6 shadow-md">
            <BlogTitle title="‘Real, live astronaut’ preaches courage for unlimited imagination to LINC, CodeAlgo students" date=" January 13, 2026" />
            <ImagesContainer
               imageHeight={450}
               image="/assets/blog/press/demarris.webp"
               imageDetail="Maybe Demarris should have seen it coming."
               className="lg:!object-cover"
            />
            <main className="mt-6">
               <section className="my-4 flex flex-col flex-wrap gap-[1rem] md:flex-row">
                  <DropCapsParagraph text="The 11 -year-old LINC student knew that he and his King Elementary classmates were special invitees because they were in an after-school coding program." />
                  <p className="mt-5">
                     He knew the bus had delivered them to an engineering firm — Burns & McDonnell. He saw that the featured speaker getting ready to meet them was wearing a blue NASA-like jumpsuit.
But it wasn’t until one of the dramatic slides on the big screen showed the selfie — the woman in blue, smiling with her hair afloat, and a giant, shimmering earth curving behind her — that he realized what was happening.
                     
                  </p>
                  <p>
                    “We got to meet a real astronaut,” he said. The speaker was Aisha Bowe, an aerospace engineer and entrepreneur who had a tale to tell of once being a timid and struggling student, advised to be a hairdresser by her counselor, who today has created tech and education companies worth millions of dollars and who, in 2025, served on a suborbital mission collaborating with NASA scientists on a Blue Origin rocket.
                  </p>

                  <div className="my-4 flex flex-col flex-wrap gap-[1rem] md:flex-row">
                     <div className="flex-[.9]">
                        <p className="mt-5">
                          It was all “quite surprising,” 11-year LINC student Cherrish said.
                        She was one of a dozen classmates from King at the event who were from the coding program created by the CodeAlgo Academy in Kansas City. The idea that the possibilities in STEM careers — championed by CodeAlgo’s program — could take Cherrish as far as space was actually a bit frightening.
                        </p>
                        <p className="mt-5">
                          I fear if I went, I could get stuck in space,” she said.
                        But Cherrish remembered part of Bowe’s message about what you do when you see something you want to try, but you feel the fear.
                        </p>
                        <p className="mt-5">
                           “You do it anyway,” Cherrish said.
                        That courage for unlimited imagination is why Marian Nguyen, a member of the board of the Kansas City Public Schools Education Foundation and a Burns & McDonnell employee, arranged for Bowe to come to Kansas City to speak to students.
                        It’s why CodeAlgo Academy co-founder Triumfia Fulks was excited that the King students in their program at LINC got to come.
                        </p>
                        <p className="mt-5">
                          “Oh my, this is a once-in-a-lifetime thing to be able to see a real, live astronaut,” Fulks said. “It’s great to put a face toward what you are teaching all the time. I’m glad to be able to connect the dots. This will empower them even more.”
                        </p>
                     </div>
                     <div className="flex-1">
                        <ImagesContainer
                           imageHeight={300}
                           image="/assets/blog/press/mcdonnell.webp"
                           imageDetail={"Aisha Bowe included this picture with the slides that accompanied her presentation to Kansas City students at Burns McDonnell.No doubt the setup worked."}
                        />
                     </div>
                  </div>
               </section>
               <section className="mt-3">
                  <p>
                    Bowe told the students how she grew up in Michigan, the daughter of a cab-driving father and a house-cleaning mother. At school she was afraid of getting things wrong. When unsure, she stopped trying. She was ashamed of her 2.3 grade point average, “depressed,” she said, “lost, going through a lot of challenges at home . . .” 
                  </p>
                  <p>
                    She attended a small community college where she found the right people to help her set her course to where she saw herself rising — “in an environment of smart, successful people.” She wanted to work for NASA.
                  </p>
                  <p>
                    “You have to tell the right people your dreams,” she said. Don’t listen to the advisor who suggests a low-achieving path. Don’t put your trust in people who don’t know you.

At the college she found “accountability partners,” she said. She found reliable friends who committed to helping each other persist toward the greatness they all believed they held inside. They gave her the courage “to show the world what anyone like me could do. I was not going to be under-estimated again.”
                  </p>
                  </section>

                  <section className="mt-3">
                  <ImagesContainer
                     image="/assets/blog/press/anything.webp"
                     imageDetail="Anything is possible,” he said, “if you put your mind to it."
                     imageHeight={450}
                  />
                  <p className="mt-5">
                     And today, Bowe said, “we’re all aerospace engineers.”

By the end, Bowe had the students engaged in exercises in the process of thinking. Their questions began to show they were thinking bigger — not just in the possibilities of STEM and frontiers in space, but in the management of money when you’re making big salaries, or even owning companies.
                  </p>
                  <p className="mt-5">
                    When you’re earning millions, she told them, success can be measured in endowments, scholarships — what you give back. “Metrics,” she said, “of impact.”
                  </p>

                  <p className="mt-5">
                    No reason to be thinking small, Demarris agreed as he and his classmates were heading back to the bus.
                  </p>

               </section>
            </main>
         </div>
         <Footer />
      </section>
   );
}

