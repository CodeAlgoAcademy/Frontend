export interface IArticle {
   title: string;
   body: string;
   image: string;
   date: string;
   detailPage?: string;
}

export const articles: IArticle[] = [
   {
      title: "LaunchKC awards $300K",
      body: "Six new startups enter the winners’ circle with KC investments",
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
   {
      title: "Pipeline has selected CodeAlgo Academy to join their Pathfinder ",
      body: "Pipeline has extended an exclusive invitation to CodeAlgo Academy to join their Pathfinder program, marking a significant milestone in our journey toward excellence!",
      image: "/assets/blog/article2.jpg",
      detailPage: "/pipeline-selected-codealgo",
      date: "January 2022",
   },
];
