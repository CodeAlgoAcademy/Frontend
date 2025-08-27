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
            title={`Success code: LINC student create online games, spark future aspirations`}
            image= "/assets/blog/press/linc.png"
            date="May 2025"
            detailPage="/press/linc-student"
         />

       <section className="mx-auto mt-12 mb-12 w-full max-w-[1100px] px-4 sm:px-6">
    <div className="mt-8 grid grid-cols-1 items-start justify-center gap-4 md:grid-cols-2 md:gap-[1rem] xl:grid-cols-3">
        {articles.map((article, index: number) => (
            <article
                key={index}
                className="mx-auto flex h-full w-full max-w-[350px] flex-col overflow-hidden rounded-[10px] border-[1.5px] bg-white p-4 shadow-sm transition-all hover:shadow-md"
            >
                <div className="aspect-video w-full overflow-hidden rounded-[10px]">
                    <img 
                        src={article.image} 
                        alt={article.title} 
                        className="h-full w-full object-cover object-center" 
                    />
                </div>
                
                <div className="mt-3 flex flex-1 flex-col justify-between">
                    <div className="space-y-2">
                        <h2 className="text-base font-bold text-[#222] line-clamp-2">
                            {article.title}
                        </h2>
                        <p className="text-sm text-[#444] line-clamp-3">
                            {article.body}
                        </p>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                        <p className="text-xs text-[#444] sm:text-[14px]">
                            {article.date}
                        </p>
                        <Link href={`/press${article.detailPage}`}>
                            <button className="min-w-[100px] rounded-[20px] bg-mainRed py-1 px-4 text-sm text-white">
                                Press
                            </button>
                        </Link>
                    </div>
                </div>
            </article>
        ))}
    </div>
</section>
         <Footer />
      </section>
   );
};

export default Press;
