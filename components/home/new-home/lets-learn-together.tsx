import { useMediaQuery } from "@mui/material";
import React, { useMemo } from "react";
import Marquee from "react-marquee-slider";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

const images = [
  { src: "subset1.webp",  alt: "Kids coding class - student project 1" },
  { src: "subset9.jpg",   alt: "Kids coding class - student project 9" },
  { src: "subset2.jpg",   alt: "Kids coding class - student project 2" },
  { src: "subset13.jpg",  alt: "Kids coding class - student project 13" },
  { src: "subset3.jpg",   alt: "Kids coding class - student project 3" },
  { src: "subset4.jpg",   alt: "Kids coding class - student project 4" },
  { src: "subset12.jpg",  alt: "Kids coding class - student project 12" },
  { src: "subset5.jpg",   alt: "Kids coding class - student project 5" },
  { src: "subset11.jpg",  alt: "Kids coding class - student project 11" },
  { src: "subset6.jpg",   alt: "Kids coding class - student project 6" },
  { src: "subset10.jpg",  alt: "Kids coding class - student project 10" },
  { src: "subset7.jpg",   alt: "Kids coding class - student project 7" },
  { src: "subset8.jpg",   alt: "Kids coding class - student project 8" },
];

const LetsLearnTogether = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const features = useSelector((state: RootState) => state.accessibility.features);
  const animationsPaused = useMemo(() => features["pause animations"], [features]);

  return (
    <div className="mt-20">
      <div className="relative mt-12 w-full">

        <div className="h-[200px] overflow-hidden max-md:h-[150px]">
          <Marquee
            scatterRandomly={false}
            onFinish={() => {}}
            onInit={() => {}}
            resetAfterTries={3}
            velocity={animationsPaused ? 0 : isMobile ? 2 : 8}
            direction="ltr"
          >
            {images.map((image) => (
              <img
                key={`ltr-${image.src}`}
                src={`/assets/landing/revamp/${image.src}`}
                alt={image.alt}
                loading="lazy"
                width={240}
                height={200}
                className="mx-1 h-[200px] w-[240px] rounded-md object-cover max-md:h-[150px]"
              />
            ))}
          </Marquee>
        </div>

        <div className="mt-5 h-[200px] overflow-hidden max-md:h-[150px]">
          <Marquee
            scatterRandomly={false}
            onFinish={() => {}}
            onInit={() => {}}
            resetAfterTries={3}
            velocity={animationsPaused ? 0 : isMobile ? 2 : 8}
            direction="rtl"
          >
            {images.map((image) => (
              <img
                key={`rtl-${image.src}`}
                src={`/assets/landing/revamp/${image.src}`}
                alt={image.alt}
                loading="lazy"
                width={240}
                height={200}
                className="mx-1 h-[200px] w-[240px] rounded-md object-cover max-md:h-[150px]"
              />
            ))}
          </Marquee>
        </div>

      </div>
    </div>
  );
};

export default LetsLearnTogether;