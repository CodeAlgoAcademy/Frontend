/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { A11y, EffectFlip, Navigation, Pagination, Scrollbar } from "swiper";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";

const testimonials = [
   {
      name: "Mikael Spears",
      position: "Middle School Computer Science Teacher ",
      review:
         "CodeAlgo came to our middle school and made a tremendous impact on our future computer scientists. They were knowledgeable about their field and exhibited an enthusiasm for what they do that proved to be contagious. After the visit, I noticed a lot of students, who were not that interested in Computer Science, started to take the class more seriously. They also provided valuable insight on what it takes to enter the field, fresh out of high school. Their learning platform is inclusive to students from all backgrounds, and the game format allows students to learn at their own pace without feeling like they are doing work.",
   },
   {
      name: "Shapree’ Marshall",
      position: "Parent",
      review:
         "As a parent, it is our responsibility to equip our children with the skills they need to succeed in the future. CodeAlgo provides an excellent platform for doing just that. The instructions were both easy to follow and challenging, making for an engaging learning experience. Watching my children proudly present the alarm system they built using the software was a joyous moment. I highly recommend CodeAlgo to other parents looking to give their children a competitive edge in today's world.",
   },
   {
      name: "Arlene Byrd",
      position: "Parent",
      review:
         "He really enjoyed the freedom to build the obstacle course without hard time limits. I also enjoy the  4 top tables it allows for better social engagement for the kids. Great job. I wish his little brother could join. He is 6 years but he is very tech savvy with tablet and video game concepts.",
   },
   {
      name: "Nick Poffinbarger",
      position: "Parent",
      review: "It exposed my son to some concepts he is very interested in. Honestly, it was a perfect environment to get him started.",
   },
   {
      name: "Turner Collins",
      position: "Parent",
      review: "The teachers were great, Sedric and Triumfia are awesome teachers",
   },
   {
      name: "Elsa",
      position: "Parent",
      review:
         "Great instruction, very well explained and instructors take the time to check in with kids that are falling behind and check their work",
   },
   {
      name: "Solomon Maximillen",
      position: "Parent",
      review: "The instructors were very helpful. They were very prompt in answering any questions.",
   },
];

const Testimonials = () => {
   return (
      <section className="relative mx-auto w-[92vw] max-w-6xl py-20">
         <h2 className="z-[5] mb-10 text-center text-4xl font-bold">What Our Customers Are Saying</h2>
         <img src="/assets/0021_1.png" alt="" className="absolute -left-20 top-0 z-[0] hidden h-[300px] w-[300px] object-contain md:block" />
         <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, EffectFlip]}
            spaceBetween={50}
            slidesPerView={1}
            navigation={true}
            pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
         >
            {testimonials.map((testimonial) => (
               <SwiperSlide key={testimonial.name}>
                  <div className="flex min-h-[250px] flex-col justify-between gap-6 rounded-lg bg-white p-8 shadow-lg md:min-h-[450px]">
                     <div className="mb-6 flex flex-col gap-4 text-gray-500">
                        <ImQuotesLeft className="mr-4 inline-block align-middle text-4xl text-orange-400" />
                        <p className="inline-block text-[1rem] font-bold leading-tight md:text-2xl">{testimonial.review}</p>
                        <ImQuotesRight className="ml-4 inline-block self-end align-middle text-4xl text-orange-400" />
                     </div>
                     <div className="flex items-center">
                        <div>
                           <h3 className=" text-[0.9rem] font-bold md:text-lg">{testimonial.name}</h3>
                           <p className="text-[0.85rem] text-gray-500 md:text-[1rem]">{testimonial.position}</p>
                        </div>
                     </div>
                  </div>
               </SwiperSlide>
            ))}
         </Swiper>
      </section>
   );
};

export default Testimonials;
