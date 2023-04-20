import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";
import BlogTitle from "@/components/press/BlogTitle";
import Header from "@/components/press/Header";
import ImagesContainer from "@/components/press/ImagesContainer";
import React from "react";

const FamiliesTogetherConference = () => {
   return (
      <section className="min-h-screen w-full bg-[#f7f8ff]">
         <Navbar />
         <Header
            body="CodeAlgo Academy invited to the Together We Can Learn Conference to discuss the importance of dream big, overcoming challenges and setting Goals"
            title={`Familiestogether: Together We Can Learn Conference`}
            image="/assets/blog/article6.png"
            date="September 2022"
         />
         <div className="mx-auto mb-14 mt-8 max-w-[1100px] rounded-md bg-white p-3 px-6 shadow-md">
            <BlogTitle title="CodeAlgo Academy invited to the Together We Can Learn Conference to discuss the importance of dream big, overcoming challenges and setting Goals" />
            <h2 className="mb-4 mt-2 font-bold">Keynote Sessions</h2>

            <section className="mt-3">
               <ImagesContainer
                  title="The Power of Disability Inclusion"
                  subtitle=" - Michael Murray, GT Independence Chief Relationship Officer"
                  image="/assets/blog/article6-2.jpg"
                  imageDetail={"Micheal Murray"}
                  imageHeight={400}
               />
               <p className="mt-3">
                  People with disabilities make valuable contributions to the world around us. To create a disability inclusive environment, we must
                  examine the subtle messages we send one another. These messages can cause us to feel connected or disconnected, engaged or
                  disengaged, included or excluded.
               </p>
               <p className="mt-3">
                  Michael manages business development, government relations, marketing, innovation and corporate social responsibility for the
                  self-directed services company. Michael’s lifelong drive for inclusion is fueled by his experience as a person with a learning
                  disability and ADHD.{" "}
               </p>
            </section>

            <section className="mt-3">
               <ImagesContainer
                  title="Family Matters: Beliefs Shape Learning"
                  subtitle=" - Jane Groff, Director, Kansas Parent Information Resource Center (KPIRC)"
                  image="/assets/blog/article6-3.jpg"
                  imageDetail={"Jane Groff"}
                  imageHeight={400}
               />
               <p className="mt-3">
                  There is something every child needs to believe. There is something every family member and caregiver needs to know. When they do,
                  all will thrive. There is a powerful way that we, as the adults in childrens’ lives, can nurture this belief and set our children up
                  to learn, grow and flourish. It sounds simple but the effects are huge!
               </p>
               <p className="mt-3">
                  Dr. Jane Groff has served as the Director of the Kansas Parent Information Resource Center (KPIRC) for fifteen years. While
                  supervising all KPIRC priorities, Dr. Groff provides professional development and technical assistance on family engagement in
                  education to Kansas districts and schools. She also provides trainings for families on parent leadership, parent advocacy and family
                  engagement in education. She taught for 25 years in both general and special education classrooms. Jane’s passion is to increase
                  meaningful family engagement in all schools. On a personal note, Jane has been married for 45 years to her husband Dave, raised
                  three children and has 8 grandbabies!{" "}
               </p>
            </section>

            <section className="mt-3">
               <ImagesContainer
                  title="Adding to Your Toolbox: Resources to Support Child/Youth & Caregiver Well-Being"
                  subtitle=" - Christin Sheldon, LMSW, State Trainer with KSDE TASN School Mental Health Initiative"
                  image="/assets/blog/article6-4.jpg"
                  imageDetail={"Christin Sheldon"}
                  imageHeight={400}
               />
               <p className="mt-3">
                  In this session, participants will learn about the role of co-regulation in relationships and identify individual well-being
                  practices that enable one to engage with children/youth and adults more effectively. Resources and tools to support individual
                  implementation of well-being practices will be shared.
               </p>
               <p className="mt-3">
                  Christin Sheldon, LMSW, State Trainer with KSDE TASN School Mental Health Initiative. Christin’s work within the Technical
                  Assistance System Network (TASN) has included co-presenting regional trainings on the topics of trauma, toxic stress, and well-being
                  to educators across the state of Kansas. She has also participated in the development of numerous resources that reflect
                  evidence-based practices and enhance mental health-related education and awareness for school communities. Christin currently serves
                  as a state trainer for the TASN School Mental Health Initiative, supporting the growth of partnerships between schools, students,
                  families, and community partners with the development of a systematic, coordinated tiered system of trauma-responsive school mental
                  health practices.
               </p>
            </section>

            <section className="mt-3">
               <ImagesContainer
                  title="Straight Talk with Siblings"
                  subtitle=" - Sydney Jenkins, Alexandria Mitchell, Dalton Mitchell, JP Holley, and Sydney Walls    "
                  image="/assets/blog/article6-5.png"
                  imageDetail={"Sydney Jenkins, Alexandria Mitchell, Dalton Mitchell, JP Holley, and Sydney Walls"}
                  imageHeight={600}
               />
               <p className="mt-3">
                  Listen to sibling experiences and perspectives from this diverse panel of siblings. Our sibling panel will share their perspectives
                  of growing up in a family where a sibling has a disability. During this panel discussion you will have an opportunity to hear from
                  siblings with and without disabilities. Sydney Walls and JP Holley will share their experiences growing up with a sibling who has a
                  disability. Sydney Jenkins and Alexandra Mitchell will talk about the importance of sibling relationships from the perspective of an
                  individual who has a disability. Our panelists will share the ups and downs of sibling life!
               </p>
            </section>

            <section className="mt-3">
               <ImagesContainer
                  title="Ugh…My Kid’s Been Suspended! Now What?"
                  subtitle=" - Darla Nelson-Metzger, Program Director, Families Together, Inc."
                  image="/assets/blog/article6-6.jpg"
                  imageDetail={"Darla Nelson-Metzger"}
                  imageHeight={450}
               />
               <p className="mt-3">
                  The discipline rules under the Individuals with Disabilities Education Act (IDEA) are complex and can be hard to understand. In this
                  session, Darla will help you understand these processes along with you and your child’s rights if you find yourself in this
                  situation. Strategies to prevent suspension and expulsion will also be shared.
               </p>
               <p className="mt-3">
                  Darla has worked for Families Together over 27 years. She is the mother of five children, two of whom receive special education
                  services. Darla is the Program Director for the Education Advocate Program and has great passion for children in the foster care
                  system. She has fostered many children throughout the years and currently sits on the Kansas Citizen Review Intake to Petition Panel
                  to promote positive outcomes for children in the custody of the State. Darla loves training and helping parents understand their
                  rights in the special education process. She particularly likes assisting parents and school teams in the development of behavioral
                  intervention plans and strategies for children with behavioral challenges.
               </p>
            </section>

            <section className="mt-3">
               <div className="flex flex-nowrap items-start justify-center gap-4">
                  <div className="flex-[0.7]">
                     <ImagesContainer imageHeight={900} imageDetail="" image="/assets/blog/article6-7.png" />
                  </div>
                  <div className="flex-1">
                     <h2 className="mt-5 mb-1 text-[1.4rem] font-bold text-orange-400">
                        {"From Opponent to Partners: A Parent & Teacher’s Journey"}
                     </h2>
                     <p className="mt-3">
                        What do you do when trust is lost, and adult issues have a negative impact on an IEP team’s ability to work together to meet
                        the needs of a student? Join Leia and Tierney as they share their journey of moving from opponents to partners. Leia and
                        Tierney will highlight the strategies and resources used to rebuild Sean’s team and facilitate his successful inclusive
                        education.
                     </p>
                     <p className="mt-3">
                        Leia has done training at the local, state, and national level. Her passion is working with transition age youth and their
                        parents. Leia has been with the organization for over two decades. She is also the proud parent of two amazing young men. Her
                        youngest son, Sean, has autism and complex mental health needs. Leia has been a strong advocate for Sean ensuring he receives
                        the educational and medical services he needs to be a part of his community.
                     </p>
                     <p className="mt-3">
                        Tierney Thompson is a special education teacher of 24 years working in the Bonner Springs School District in Kansas. She
                        received her undergraduate degree from New Mexico State University in 1997 in elementary education and special education (with
                        a focus on behavior disorders, intellectual disabilities and physical impairments) and in May of 2005 she received her
                        master’s degree from the University of Kansas with an emphasis on Autism. Her first 15 years of teaching she worked at the
                        elementary school where she worked with students with a variety of exceptionalities. She worked hard with staff to develop an
                        environment of belonging where all kids could be successful and created a culture of compassion and inclusiveness. In 2013 she
                        moved up to the high school where she continues to work with her previous students and their families, guiding them through
                        the process of transition into adulthood. In 2019, she created <i>Education and Wellness Services LLC</i> which includes 2
                        branches: Zen Friends Yoga which teaches kids and young adults with exceptionalities the basics of yoga as well as benefits to
                        the practice; and consultation services to individuals with exceptionalities and their families who need extra support outside
                        of the classroom and in different stages of life.
                     </p>
                  </div>
               </div>
            </section>

            <section className="mt-3">
               <ImagesContainer
                  title="Parent – School Relationships: How to Positively Support your Child"
                  subtitle=" - Lisa Howell, Gavin’s mom and Families Together Inc. Education Advocate and Family Resource Specialist"
                  image="/assets/blog/article6-9.jpg"
                  imageDetail={"Lisa Howell"}
                  imageHeight={450}
               />
               <p className="mt-3">
                  Lisa will share her personal story on building relationships within the school to effectively advocate for her child’s learning
                  disabilities and executive functioning needs. She will give suggestions and guidance on moving through the process of identifying a
                  possible need for general education interventions, evaluations, and eligibility for special education services. Lisa will also
                  review the Kansas State Department of Education Dyslexia Reading Initiative Timelines.
               </p>
               <p className="mt-3">
                  Through Families Together, Lisa provides individualized assistance and training to support the academic, behavioral, social,
                  emotional, and mental wellbeing of children, youth, and families. She has also found a passion in the Education Advocate program
                  where she trains, appoints, and oversees advocates to be special education decision makers for children in state custody.
                  Additionally, Lisa has been appointed as a board member for the Kansas/Missouri Branch of the International Dyslexia Association.
                  She has a high school aged son who has Dyslexia, Dysgraphia, Dyscalculia, and an auditory processing disorder. Learning about and
                  advocating for the challenges that he faces every day has led Lisa to empower and educate families across Kansas to effectively
                  advocate for their own children.
               </p>
            </section>

            <section className="mt-3">
               <ImagesContainer
                  title="It’s All About Who You Know: Mapping Community Services & Supports For Student Success"
                  subtitle=" - Jennifer Bumble, Assistant Professor University of Kansas and Kansas University Center on Developmental Disabilities"
                  image="/assets/blog/article6-10.jpg"
                  imageDetail={"Jennifa Bumble"}
                  imageHeight={450}
               />
               <p className="mt-3">
                  Social support networks help adults with and without disabilities navigate the challenges of community participation and enhance
                  their well-being and quality of life. During the session, Jennifer will <b>{"(a)"}</b> discuss the benefits of having a diverse
                  network of school-and-community-based services and supports; <b>{"(b)"}</b> identify strategies to build and sustain a network over
                  time; and engage in hands-on activities to {"“map”"} their local services and supports using digital resource mapping. Hands-on
                  activities will require participants to have a Gmail account and a laptop or tablet. The presenter will have a limited number of
                  iPads available.
               </p>
               <p className="mt-3">
                  Jennifer’s research and teaching focus on the transition from adolescence to adulthood, building social capital during the
                  transition process, and empowering communities to enable the full participation of young people with disabilities and their
                  families. Her efforts are informed by her diverse experiences supporting the transition process as a classroom teacher, job coach,
                  educational consultant, and community organizer.{" "}
               </p>
            </section>

            <section className="mt-3">
               <div className="flex flex-nowrap items-start justify-center gap-4">
                  <div className="flex-[0.7]">
                     <ImagesContainer imageDetail={""} imageHeight={900} image="/assets/blog/article6-11.png" />
                  </div>
                  <div className="flex-1">
                     <h2 className="mt-5 mb-1 text-[1.4rem] font-bold text-orange-400">{"Dream Big: Overcoming Challenges & Setting Goals"}</h2>
                     <p className="mt-3">
                        Sedric Hibler is a Data Analytics and Software Engineer at Oracle Cerner and CoFounder – CIO of CodeAlgo Academy. Triumfia
                        Houmbie Fulks is a Software Engineer at Oracle Cerner and Co-Founder – CEO of CodeAlgo Academy.
                     </p>
                     <p className="mt-3">
                        Join us for a conversation with Oracle-Cerner software engineers, Triumfia Fulks and Sedric Hibler – two budding entrepreneurs
                        who are currently developing their own coding academy for youth. Listen to their stories of overcoming barriers such as moving
                        to the United States, battling depression, and getting out of friend groups who were making poor decisions. We look forward to
                        learning about how Triumfia and Sedric have used creativity, problem solving, and mental health to <b>DREAM BIG!</b>
                     </p>
                     <p className="mt-3">
                        Sedric Hibler is a Data Analytics and Software Engineer at Oracle Cerner, and CoFounder – CIO of CodeAlgo Academy, a gaming
                        platform that aims to teach kids how to code.
                     </p>
                     <p className="mt-3">
                        Triumfia Houmbie Fulks is a Software Engineer at Oracle Cerner and Co-Founder – CEO of CodeAlgo Academy, a gaming platform
                        that aims to teach kids how to code.
                     </p>
                  </div>
               </div>
            </section>

            <section className="mt-3">
               <ImagesContainer
                  title="Step Ahead at Age Three"
                  subtitle=" - Shannon Ulrich, Family Health and Resource Specialist, Families Together, Inc."
                  image="/assets/blog/article6-12.jpg"
                  imageDetail={"Shannon Ulrich"}
                  imageHeight={450}
               />
               <p className="mt-3">
                  The transition from Infant-Toddler services to education services can be a scary and exciting process. This workshop will provide
                  parents with an understanding of the process so that the transition is as smooth as possible.
               </p>
               <p className="mt-3">
                  Shannon became involved with Families Together as a teenager, with her brother Skylar who has Cerebral Palsy. Her passion is helping
                  families navigate the early childhood services and find resources. She also enjoys reaching out to minority communities. Shannon is
                  married with five children, three daughter in loves, and one granddaughter. Her personal experience navigating the infant toddler
                  services drives her to help other families understand their child’s disability, find resources and work effectively with schools.
                  Shannon enjoys helping families learn to be the best advocates for their child
               </p>
            </section>
         </div>
         <Footer />
      </section>
   );
};

export default FamiliesTogetherConference;
