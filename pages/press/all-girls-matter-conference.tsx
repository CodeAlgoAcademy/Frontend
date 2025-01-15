import React from "react";
import Footer from "@/components/home/new-home/footer";
import Navbar from "@/components/navbar/home/Navbar";
import BlogTitle from "@/components/press/BlogTitle";
import DropCapsParagraph from "@/components/press/DropCapsParagraph";
import Header from "@/components/press/Header";
import ImagesContainer from "@/components/press/ImagesContainer";
import Link from "@/components/press/Link";

export default function AllGirlsMatterConference() {
   return (
      <section className="press-page min-h-screen w-full bg-[#f7f8ff] font-thabit">
         <Navbar />
         <div className="mx-auto mb-14 mt-8 max-w-[1100px] rounded-md bg-white p-3 px-6 shadow-md">
            <BlogTitle title="Triumfia fulks will be hosting a workshop at the All Girls Matter conference" date="October 7, 2023" />
            <ImagesContainer
               imageHeight={450}
               image="/assets/blog/all-girls-matter-conference.jpeg"
               imageDetail="Triumfia fulks will be hosting a workshop at the All Girls Matter conference"
               className="lg:!object-top"
            />

            <main className="mt-6">
               <section className="my-4">
                  <p className="mt-3">Hey CodeAlgo Fam! 🌟</p>
                  <p className="my-3">
                     Exciting news alert! 🚨 Our fearless leader, Triumfia Houmbie Fulks, will be taking the stage today at the "All Girls Matter"
                     conference, hosting a workshop that promises to be both insightful and empowering. Your presence and participation will add that
                     special touch to make it an unforgettable event.
                  </p>
                  <p>
                     <b>Date:</b> October 7, 2023
                  </p>
                  <p>
                     <b>Time:</b> 10am - 3pm CST
                  </p>
                  <p>
                     <b>Location:</b> UMKC Student Union, 5100 Cherry St, Kansas City, Mo 64110{" "}
                  </p>
               </section>
               <section className="my-4">
                  <p>
                     If you haven't yet explored the wonders of our coding gaming platform, there's no better time than now! 🚀{" "}
                     <Link text="Sign up today" link="https://www.codealgoacademy.com" /> to join the coding revolution
                  </p>
                  <p>Spread the word and let's make this workshop an inspiring space for all!</p>
                  <i className="cursor-pointer font-bold text-mainRed">🔗 #BetaLaunch #Parents #Teachers #Coding #KidsCoding #K8</i>
               </section>
            </main>
         </div>
         <Footer />
      </section>
   );
}
