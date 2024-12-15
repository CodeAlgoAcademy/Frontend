import Image from "next/image";
import React from "react";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";
import { A11y, EffectFlip, Navigation, Pagination, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const images = ["learn1.png", "learn2.png", "learn3.png", "learn4.png", "learn5.png", "learn6.png"];

const LetsLearnTogether = () => {
   return (
      <div className="lets-learn-together-bg mt-12  p-20">
         <h1 className="text-center font-tiltWarp text-[2.1rem] text-white">LET’S HAVE FUN TOGETHER!</h1>

         <Swiper
            className="mt-12"
            modules={[Navigation, Pagination, Scrollbar, A11y, EffectFlip]}
            spaceBetween={50}
            slidesPerView={1}
            navigation={true}
            pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
            fadeEffect={{
               crossFade: true,
            }}
            onSwiper={(swiper) => {}}
            onSlideChange={() => {}}
         >
            {images.map((image, index) => (
               <SwiperSlide key={index}>
                  <div className="flex flex-col justify-between gap-6 rounded-lg  p-8 shadow-lg md:min-h-[550px]">
                     <Image src={`/assets/landing/${image}`} width={1000} height={600} className="rounded-xl object-contain" />
                  </div>
               </SwiperSlide>
            ))}
         </Swiper>
      </div>
   );
};

export default LetsLearnTogether;
