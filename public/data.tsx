import { ReactNode } from "react";
import { GiConcentricCrescents, GiPsychicWaves, GiSoundWaves } from "react-icons/gi";
import { IoContrast, IoEyeOutline } from "react-icons/io5";
import { MdInvertColors, MdLink, MdOutlineInvertColors } from "react-icons/md";
import { RiCursorLine, RiFontSize, RiFontSize2, RiWheelchairFill } from "react-icons/ri";
import { CiImageOff, CiImageOn, CiLineHeight } from "react-icons/ci";
import { LuBrain } from "react-icons/lu";
import { TbPuzzle } from "react-icons/tb";
import { AccessibilityFeatures, AccessibilitySlice } from "types/interfaces/accessibility.interface";
import { BiSolidAdjust, BiSolidBook } from "react-icons/bi";
import { FaDotCircle, FaRegCircle } from "react-icons/fa";
import { FaRegCirclePause, FaRegCirclePlay } from "react-icons/fa6";
import { BsSoundwave } from "react-icons/bs";
import { SpacingIcon } from "@/components/UI/Icons";
import { GrScan } from "react-icons/gr";
import { FiAlignCenter, FiAlignJustify, FiAlignLeft, FiAlignRight } from "react-icons/fi";

export interface IArticle {
   title: string;
   body: string;
   image: string;
   date: string;
   detailPage?: string;
}

export const articles: IArticle[] = [
    {
      title: "Success code: LINC student create online games, spark future aspirations",
      body: "LINC students at King Elementary in the Kansas City Public Schools pose with teachers and suppoerters as they display certificates from the CodeAlgo Academy coding program.",
      date: "May 2025",
      image: "/assets/blog/press/linc.png",
      detailPage: "/linc-student",
      // gamification
   },
    {
      title: "Viruses vs. Bacteria—Made Fun for Kids!",
      body: "We’ve partnered with the Kansas Department of Health to teach kids the difference between viruses and bacteria in a fun, interactive way—empowering them to understand their bodies and health!",
      date: "Apirl 2025",
      image: "/assets/blog/press/save.PNG",
      detailPage: "/linkedin",
   },
   {
      title: "2024 Startups to Watch: CodeAlgo Academy Gamifies Coding for Equity",
      body: "Why aren’t more people entering this lucrative field—you can make six figures right out of high school. Are they just not pursuing it?” — Fulks",
      date: "January 03, 2024",
      image: "/assets/blog/press/triumfia.jpg",
      detailPage: "/gamification",
   },
   {
      title: "Pipeline's New Cohorts Highlight Power of Diversity",
      body: "More than two dozen founders have joined Pipeline’s 2024 Fellowship and Pathfinder Program, expanding the elite network of high-growth Midwest entrepreneurs.",
      date: "February 01, 2024",
      image: "/assets/blog/press/pipeline.jpg",
      detailPage: "/pipeline",
   },
   {
      title: "LaunchKC awards $300K",
      body: "Six new startups enter the winners' circle with KC investments",
      date: "November 2023",
      image: "/assets/blog/launch-kc-award.jpg",
      detailPage: "/launch-kc-awards",
   },
   {
      title: "Big winner at GEWKC",
      body: "AltCap Your Biz turns The Next Paige with $42K+ in prizes",
      date: "November 2023",
      image: "/assets/blog/altcap-your-biz6.jpg",
      detailPage: "/altcap-your-biz",
   },
   {
      title: "CodeAlgo Academy's Beta Platform is Live!",
      body: "Unlock the World of Coding Adventures: CodeAlgo Academy's Beta Platform is Now Live!",
      date: "November 2023",
      image: "/assets/blog/codealgo-beta-live.png",
      detailPage: "/codealgo-beta-live",
   },
   {
      title: "Triumfia fulks will be hosting a workshop at the All Girls Matter conference",
      body: "Workshop at the All Girls Matter Conference hosted by triumfia fulks",
      date: "October 7, 2023",
      image: "/assets/blog/all-girls-matter-conference.jpeg",
      detailPage: "/all-girls-matter-conference",
   },
   {
      title: "🌟 CodeAlgo Academy Wins the Rockstar Business Award! 🌟",
      body: "We are thrilled and deeply honored to announce that our team at CodeAlgo Academy have been awarded the prestigious Rockstar Business Award.",
      date: "August 2023",
      image: "/assets/blog/codealgo-wins-rockstar-business-award.jpeg",
      detailPage: "/codealgo-wins-rockstar-business-award",
   },
   {
      title: "CodeAlgo at ProX Hiring Fair – Connecting with Future Innovators!",
      body: "We're thrilled to announce our active participation in the ProX Hiring Fair, an exceptional event hosted by Pro X, where more than 90 employers converge to interview over 1,000 talented students, paving the way for transformative summer internships. At CodeAlgo, we recognize the importance of nurturing the next generation of tech enthusiasts, and this event provides an ideal platform to connect with bright minds.",
      image: "/assets/blog/codealgo-at-proX.jpeg",
      detailPage: "/codealgo-at-proX",
      date: "March 18, 2023",
   },
   {
      title: "CodeAlgo Academy wins $13,000 from the PurePitch Rally",
      body: "CodeAlgo Academy wins $13,000 from the PurePitch Rally",
      date: "October 2022",
      detailPage: "/pure-pitch-rally",
      image: "/assets/blog/article1.jpg",
   },
   {
      title: "Familiestogether: Together We Can Learn Conference",
      body: "CodeAlgo Academy invited to the Together We Can Learn Conference to discuss the importance of dream big, overcoming challenges and setting Goals",
      image: "/assets/blog/article6.png",
      detailPage: "/families-together-conference",
      date: "September 2022",
   },
   {
      title: "Visibile Hands Twitter Pitch Winner",
      body: "CodeAlgo Academy selected as 1 of the winners",
      image: "/assets/blog/article5.png",
      detailPage: "/twitter-pitch-winner",
      date: "April 2022",
   },
   {
      title: "Co-design research program with LeanLab",
      body: "CodeAlgo Academy was selected to participate in a Co-design research program with LeanLab",
      image: "/assets/blog/article3.png",
      detailPage: "/codesign-research-program",
      date: "April 2022",
   },

   {
      title: "CodeAlgo Academy Selected to join Goodie Nation",
      body: "Goodie Nation has chosen CodeAlgo Academy as one of the eight founders to be a part of their community, recognizing their exceptional potential for growth and impact in the industry.",
      image: "/assets/blog/article4.png",
      detailPage: "/codealgo-joins-goodie-nation",
      date: "March 2022",
   },
   // {
   //    title: "Pipeline has selected CodeAlgo Academy to join their Pathfinder ",
   //    body: "Pipeline has extended an exclusive invitation to CodeAlgo Academy to join their Pathfinder program, marking a significant milestone in our journey toward excellence!",
   //    image: "/assets/blog/article2.jpg",
   //    detailPage: "/pipeline-selected-codealgo",
   //    date: "January 2022",
   // },
];

export const accessibility_profiles: {
   name: string;
   icon: ReactNode;
   features: Partial<AccessibilitySlice["features"]>;
}[] = [
   {
      name: "Motor impaired",
      icon: <RiWheelchairFill />,
      features: {
         "pause animations": 1,
      },
   },
   {
      name: "Blind",
      icon: <GiSoundWaves />,
      features: {
         "screen reader": 1,
      },
   },
   {
      name: "Color Blind",
      icon: <MdOutlineInvertColors />,
      features: {
         saturation: 2,
      },
   },
   {
      name: "Low Vision",
      icon: <IoEyeOutline />,
      features: {
         "bigger text": 1,
         "pause animations": 1,
         cursor: 1,
         saturation: 2,
      },
   },
   {
      name: "Cognitive & Learning",
      icon: <TbPuzzle />,
      features: {
         "bigger text": 1,
         "pause animations": 1,
         cursor: 2,
      },
   },
   {
      name: "Seizure & Epileptic",
      icon: <LuBrain />,
      features: {
         "pause animations": 1,
         saturation: 1,
      },
   },
   {
      name: "ADHD",
      icon: <GiConcentricCrescents />,
      features: {
         "screen reader": 2,
         saturation: 1,
      },
   },
];

export const accessibility_functions: Record<
   AccessibilityFeatures,
   {
      step: 0 | 1 | 2 | 3 | 4;
      name: string;
      icon: ReactNode;
   }[]
> = {
   "contrast +": [
      {
         step: 0,
         name: "Contrast +",
         icon: <BiSolidAdjust />,
      },
      {
         step: 1,
         name: "Invert Colors",
         icon: <BiSolidAdjust />,
      },
      {
         step: 2,
         name: "Dark Colors",
         icon: <FaDotCircle />,
      },
      {
         step: 3,
         name: "Light Colors",
         icon: <FaRegCircle />,
      },
   ],
   "screen reader": [
      {
         step: 0,
         name: "Screen Reader",
         icon: <BsSoundwave />,
      },
      {
         step: 1,
         name: "Read Normal",
         icon: <BsSoundwave />,
      },
      {
         step: 2,
         name: "Read Fast",
         icon: <GiSoundWaves />,
      },
      {
         step: 3,
         name: "Read Slow",
         icon: <BsSoundwave />,
      },
   ],
   "highlight links": [
      {
         step: 0,
         name: "Highlight Links",
         icon: <MdLink />,
      },
      {
         step: 1,
         name: "Highlight Links",
         icon: <MdLink />,
      },
   ],
   "bigger text": [
      {
         step: 0,
         name: "Bigger Text",
         icon: <RiFontSize2 />,
      },
      {
         step: 1,
         name: "Bigger Text",
         icon: <RiFontSize2 className="text-[2rem]" />,
      },
      {
         step: 2,
         name: "Bigger Text",
         icon: <RiFontSize2 className="text-[2.1rem]" />,
      },
      {
         step: 3,
         name: "Bigger Text",
         icon: <RiFontSize2 className="!text-[2.3rem]" />,
      },
      {
         step: 4,
         name: "Bigger Text",
         icon: <RiFontSize2 className="text-[2.5rem]" />,
      },
   ],
   "text spacing": [
      {
         step: 0,
         name: "Text Spacing",
         icon: <SpacingIcon count={3} />,
      },
      {
         step: 1,
         name: "Light Spacing",
         icon: <SpacingIcon count={1} />,
      },

      {
         step: 2,
         name: "Moderate Spacing",
         icon: <SpacingIcon count={3} />,
      },
      {
         step: 3,
         name: "Heavy Spacing",
         icon: <SpacingIcon count={4} />,
      },
   ],
   "pause animations": [
      {
         step: 0,
         name: "Pause Animations",
         icon: <FaRegCirclePause />,
      },
      {
         step: 1,
         name: "Pause Animations",
         icon: <FaRegCirclePlay />,
      },
   ],
   "hide images": [
      {
         step: 0,
         name: "Hide Images",
         icon: <CiImageOff />,
      },
      {
         step: 1,
         name: "Hide Images",
         icon: <CiImageOff />,
      },
   ],
   "legible fonts": [
      {
         step: 0,
         name: "Legible Fonts",
         icon: <RiFontSize />,
      },
      {
         step: 1,
         name: "Legible Fonts",
         icon: <RiFontSize />,
      },
   ],
   cursor: [
      {
         step: 0,
         name: "Cursor",
         icon: <RiCursorLine />,
      },
      {
         step: 1,
         name: "Big Cursor",
         icon: <RiCursorLine />,
      },
      {
         step: 2,
         name: "Reading Mask",
         icon: <GrScan />,
      },
      {
         step: 3,
         name: "Reading Guide",
         icon: <GrScan />,
      },
   ],
   "line height": [
      {
         step: 0,
         name: "Line Height",
         icon: <CiLineHeight />,
      },
      {
         step: 1,
         name: "Line Height (1.5x)",
         icon: <CiLineHeight />,
      },
      {
         step: 2,
         name: "Line Height (1.75x)",
         icon: <CiLineHeight />,
      },
      {
         step: 3,
         name: "Line Height (2x)",
         icon: <CiLineHeight />,
      },
   ],
   "text align": [
      {
         step: 0,
         name: "Text Align",
         icon: <FiAlignCenter />,
      },
      {
         step: 1,
         name: "Align Left",
         icon: <FiAlignLeft />,
      },
      {
         step: 2,
         name: "Align Right",
         icon: <FiAlignRight />,
      },
      {
         step: 3,
         name: "Align Center",
         icon: <FiAlignCenter />,
      },
      {
         step: 4,
         name: "Justify",
         icon: <FiAlignJustify />,
      },
   ],
   saturation: [
      {
         step: 0,
         name: "Saturation",
         icon: <MdInvertColors />,
      },
      {
         step: 1,
         name: "Low Saturation",
         icon: <MdInvertColors />,
      },
      {
         step: 2,
         name: "High Saturation",
         icon: <MdInvertColors />,
      },
      {
         step: 3,
         name: "Desaturate",
         icon: <MdInvertColors />,
      },
   ],
   dictionary: [
      {
         step: 0,
         name: "Dictionary",
         icon: <BiSolidBook />,
      },
      {
         step: 1,
         name: "Dictionary",
         icon: <BiSolidBook />,
      },
   ],
};
