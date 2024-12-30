import { useMediaQuery } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";
import { A11y, EffectFlip, Navigation, Pagination, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const data = [
   `
        <p>
        “CodeAlgo came to our middle school and made a tremendous impact on our future computer scientists. They were knowledgeable about their field and exhibited an enthusiasm for what they do that proved to be contagious. After the visit, I noticed a lot of students, who were not that interested in Computer Science, started to take the class more seriously. They also provided valuable insight on what it takes to enter the field, fresh out of high school. Their learning platform is inclusive to students from all backgrounds, and the game format allows students to learn at their own pace without feeling like they are doing work.”
        </p>

        <br />
        <br />
        <div>
        <p><b>Mikael Spears</b></p>
        <p>Middle School Computer Science Teacher</p></div>
    `,
   `
        <p>“As a parent, it is our responsibility to equip our children with the skills they need to succeed in the future. CodeAlgo provides an excellent platform for doing just that. The instructions were both easy to follow and challenging, making for an engaging learning experience. Watching my children proudly present the alarm system they built using the software was a joyous moment. I highly recommend CodeAlgo to other parents looking to give their children a competitive edge in today's world.”</p>
        <br />
        <br />
        <div>
        <p><b>Shapree’ Marshall</b></p>
        <p>Parent</p>
        </div>
    `,
   `
       <p> “He really enjoyed the freedom to build the obstacle course without hard time limits. I also enjoy the 4 top tables it allows for better social engagement for the kids. Great job. I wish his little brother could join. He is 6 years but he is very tech savvy with tablet and video game concepts.” </p>
       <br />
       <br />
     <div>  <p><b>Arlene Byrd</b></p>
       <p>Parent</p></div>
    `,
   `
        <p>“The teachers were great, Sedric and Triumfia are awesome teachers.”</p>
        <br />
        <br />
        <div>
        <p><b>Turner Collins</b></p>
        <p>Parent</p></div>
    `,
   `
        <p>“Great instruction, very well explained and instructors take the time to check in with kids that are falling behind and check their work.”</p>
        <br />
        <br />
        <div>
        <p><b>Elsa</b></p>
        <p>Parent</p></div>
    `,
   `
        <p>“It exposed my son to some concepts he is very interested in. Honestly, it was a perfect environment to get him started.”</p>
        <br />
        <br />
       <div>
        <p><b>Nick Poffinbarger</b></p>
        <p>Parent</p>
       </div>
    `,
   `
        <p>“The instructors were very helpful. They were very prompt in answering any questions.”</p>
        <br />
        <br />
        <div>
        <p><b>Solomon Maximillen</b></p>
        <p>Parent</p></div>
    `,
];

const VoiceOfOurCommunity = () => {
   const isMobile = useMediaQuery("(max-width: 768px)");

   return (
      <div className="mx-auto mt-16 max-w-[1200px] px-6 pb-12">
         <h1 className="text-center font-tiltWarp text-[2.1rem] max-md:text-[1.5rem]">THE VOICE OF OUR COMMUNITY</h1>

         <Swiper
            className="mt-12"
            modules={[Navigation, Pagination, Scrollbar, A11y, EffectFlip]}
            spaceBetween={50}
            slidesPerView={isMobile ? 1 : 3}
            navigation={true}
            pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
            fadeEffect={{
               crossFade: true,
            }}
            onSwiper={(swiper) => {}}
            onSlideChange={() => {}}
         >
            {data.map((voice, index) => (
               <SwiperSlide key={index}>
                  <div className="flex min-h-[450px] flex-col justify-between gap-6 rounded-xl border  bg-white p-8 !font-thabit text-[.85rem] shadow-lg max-md:min-h-fit max-md:p-4">
                     <div dangerouslySetInnerHTML={{ __html: voice }} className="flex flex-col justify-between"></div>
                  </div>
               </SwiperSlide>
            ))}
         </Swiper>
      </div>
   );
};

export default VoiceOfOurCommunity;
