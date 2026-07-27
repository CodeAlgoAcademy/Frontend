export interface Post {
   id: string;
   image: string;
   detailPage?: string;
}

export const posts: Post[] = [
   { id: "howCodingHelpsKids", image: "/assets/blog/codinghelp2.png", detailPage: "/How-coding-helps-kids" },
   { id: "pythonVsScratch", image: "/assets/blog/python1.png", detailPage: "/Python-vs-Scratch" },
   { id: "startupsToWatch", image: "/assets/blog/2024-startups-to-watch.jpg", detailPage: "/2024-startups-to-watch" },
   { id: "codeAndPlay", image: "/assets/blog/codingfun.png", detailPage: "/code-and-play" },
   { id: "diversityInCoding", image: "/assets/blog/diversity-in-tech.png", detailPage: "/urgent-need-for-diversity-and-inclusion-in-coding" },
   { id: "vaccinationForKids", image: "/assets/blog/cdc-TDoPeUSOD1c-unsplash.jpg", detailPage: "/vaccination-for-kids" },
   { id: "guidanceInCoding", image: "/assets/blog/nutrition.png", detailPage: "/guidance-in-coding" },
];