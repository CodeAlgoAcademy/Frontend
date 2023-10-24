export interface IArticle {
   title: string;
   body: string;
   image: string;
   date: string;
   detailPage?: string;
}

export const articles = [
   {
      title: "Pipeline has selected CodeAlgo Academy to join their Pathfinder ",
      body: "Pipeline has extended an exclusive invitation to CodeAlgo Academy to join their Pathfinder program, marking a significant milestone in our journey toward excellence!",
      image: "/assets/blog/article2.jpg",
      detailPage: "/pipeline-selected-codealgo",
      date: "January 2022",
   },
   {
      title: "CodeAlgo Academy Selected to join Goodie Nation",
      body: "Goodie Nation has chosen CodeAlgo Academy as one of the eight founders to be a part of their community, recognizing their exceptional potential for growth and impact in the industry.",
      image: "/assets/blog/article4.png",
      detailPage: "/codealgo-joins-goodie-nation",
      date: "March 2022",
   },
   {
      title: "Co-design research program with LeanLab",
      body: "CodeAlgo Academy was selected to participate in a Co-design research program with LeanLab",
      image: "/assets/blog/article3.png",
      detailPage: "/codesign-research-program",
      date: "April 2022",
   },

   {
      title: "Visibile Hands Twitter Pitch Winner",
      body: "CodeAlgo Academy selected as 1 of the winners",
      image: "/assets/blog/article5.png",
      detailPage: "/twitter-pitch-winner",
      date: "April 2022",
   },
   {
      title: "Familiestogether: Together We Can Learn Conference",
      body: "CodeAlgo Academy invited to the Together We Can Learn Conference to discuss the importance of dream big, overcoming challenges and setting Goals",
      image: "/assets/blog/article6.png",
      detailPage: "/families-together-conference",
      date: "September 2022",
   },
];
