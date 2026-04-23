export interface Post {
   title: string;
   body: string;
   image: string;
   date: string;
   detailPage?: string;
}

export const posts: Post[] = [
   {
      title: "How Coding Helps Kids with Math and Problem-Solving",
      body: "Many parents see coding as a technical skill, but it is actually one of the most effective ways to sharpen a child's brain for math and logic.",
      image: "/assets/blog/codinghelp2.png",
      date: "March 2026",
      detailPage: "/How-coding-helps-kids",
   },
        {
      title: "Python vs. Scratch: Which Should My Child Learn First?h",
      body: "Choosing the first programming language for your child is a big decision. While both Scratch and Python teach the fundamentals of logic, they offer very different experiences.",
      image: "/assets/blog/python1.png",
      date: "March 2026",
      detailPage: "/Python-vs-Scratch",
   },
   {
      title: "2024 Startups to Watch",
      body: "CodeAlgo Academy gamifies coding to build equity into new wave of software engineers",
      image: "/assets/blog/2024-startups-to-watch.jpg",
      date: "January 2024",
      detailPage: "/2024-startups-to-watch",
   },
   {
      title: "Code and Play",
      body: "The Power of Gamification at CodeAlgo Academy",
      date: "December 2023",
      image: "/assets/blog/codingfun.png",
      detailPage: "/code-and-play",
   },
   {
      title: "Diversity in Coding",
      body: "The Urgent Need for Diversity and Inclusion in Coding",
      date: "December 2023",
      image: "/assets/blog/diversity-in-tech.png",
      detailPage: "/urgent-need-for-diversity-and-inclusion-in-coding",
   },
   {
      title: "Coding Strong",
      body: "The Power of Vaccination for CodeAlgo Superstars and Their Families",
      date: "December 2023",
      image: "/assets/blog/cdc-TDoPeUSOD1c-unsplash.jpg",
      detailPage: "/vaccination-for-kids",
   },
   {
      title: "Nurturing Youngsters",
      body: "The Guardian’s Guide to Nurturing Coding Skills in Kids",
      date: "December 2023",
      image: "/assets/blog/nutrition.png",
      detailPage: "/guidance-in-coding",
   },
];
