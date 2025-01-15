import Footer from "@/components/home/new-home/footer";
import Navbar from "@/components/navbar/home/Navbar";
import Header from "@/components/press/Header";
import Link from "next/link";
import { articles } from "public/data";
import React from "react";

const Press = () => {
   return (
      <section className="min-h-screen w-full bg-[#ffffff] font-thabit">
         <Navbar />
         <Header
            body=""
            title={`LaunchKC awards $300K: Six new startups enter the winners’ circle with KC investments`}
            image="/assets/blog/launch-kc-award.jpg"
            date="November 2023"
            detailPage="/press/launch-kc-awards"
         />

         <section className="mx-auto mt-12 mb-12 w-full max-w-[1100px] px-6">
            <div className="mt-8 grid grid-cols-1 items-center justify-center gap-[1rem] md:grid-cols-2 xl:grid-cols-3">
               {articles.map((article, index: number) => {
                  return (
                     <article
                        key={index}
                        className="mx-auto h-[400px] w-full max-w-[350px] rounded-[10px] border-[1.5px] bg-white p-4 shadow-sm transition-all hover:shadow-md md:h-[450px]"
                     >
                        {/* image container */}
                        <div className="h-[50%] w-full">
                           <img src={article.image} alt={article.title} className="h-full w-full rounded-[10px] object-cover object-center" />
                        </div>
                        <div className="mt-2 flex h-[50%] w-full flex-col justify-between py-2">
                           <div>
                              <h2 className="text-[1rem] font-bold text-[#222]">{article.title}</h2>
                              <p className="mt-2 text-[0.9rem] text-[#444]">
                                 {article.body.length > 120 ? `${article.body.slice(0, 121)}...` : article.body}
                              </p>
                           </div>
                           <div className="flex items-center justify-between">
                              <p className="text-[14px] text-[#444]">{article.date}</p>
                              <Link href={`/press${article.detailPage}`}>
                                 <button className="min-w-[100px] rounded-[20px] bg-mainRed py-1 px-4 text-white">Press</button>
                              </Link>
                           </div>
                        </div>
                     </article>
                  );
               })}
            </div>
         </section>
         <Footer />
      </section>
   );
};

export default Press;
