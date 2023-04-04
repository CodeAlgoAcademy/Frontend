import type { NextPage } from "next";
import Navbar from "@/components/Navbar/Navbar";
import Link from "next/link";
const Home: NextPage = () => {
   return (
      <div className="">
         <div className="h-screen w-screen overflow-hidden">
            <Navbar />
            <div className={styles.container} style={{ textShadow: "0px 2px 2px rgba(0,0,0,0.3)" }}>
               <div className={styles.gradientContainer}></div>
               <div className={styles.textContainer}>
                  <p className={styles.containerText}>Coding for kids and Teens made easy</p>
                  <p className="text-sm md:w-[550px]">
                     3D games from CodeAlgo academy will bring students to compiter sciences where they can teach themselves as they play.
                  </p>
                  <Link href="/selectUserType">
                     <button className="w-[120px] rounded-md bg-blue-400 p-3 font-bold text-white">Sign up</button>
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Home;

const styles = {
   container: "relative bg-home bg-center h-full md:bg-right bg-cover bg-no-repeat",
   gradientContainer: "absolute top-0 right-0 bottom-0 left-0 *bg-gradient-to-tl md:bg-gradient-to-r from-orange-400*",
   textContainer: "py-20 md:py-32 relative px-2 md:px-20 text-gray-800 space-y-5",
   containerText: "capitalize text-5xl font-extrabold leading-[60px] md:w-[600px]",
};
