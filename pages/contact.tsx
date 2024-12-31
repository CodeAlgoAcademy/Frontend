import Banner from "@/components/home/new-home/banner";
import Footer, { socials } from "@/components/home/new-home/footer";
import Navbar from "@/components/navbar/home/Navbar";
import { CustomButton } from "@/components/UI/Button";
import Image from "next/image";
import { BiEnvelopeOpen, BiMapPin } from "react-icons/bi";
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter, BsYoutube } from "react-icons/bs";
import { TbThumbUp } from "react-icons/tb";

const Contact = () => {
   return (
      <>
         <Navbar />

         <div className="relative overflow-x-hidden bg-white font-thabit">
            <Banner />

            <div className="mx-auto max-w-[1200px] p-6">
               <h1 className="text-center text-[2.1rem] max-md:text-[1.5rem]">We are here to help!</h1>

               <div className="mt-28 flex items-start gap-8 max-md:flex-col">
                  <div className="flex-1">
                     <ul className="space-y-8">
                        <li className="flex items-center gap-3">
                           <span>
                              <BiMapPin className="text-mainBlack" size={30} />
                           </span>
                           Kansas City, MO, USA
                        </li>

                        <li className="flex items-center gap-3">
                           <span>
                              <BiEnvelopeOpen className="text-mainBlack" size={30} />
                           </span>
                           <a className="underline" href="mailto:info@codealgoacademy.com">
                              info@codealgoacademy.com
                           </a>
                        </li>

                        <li className="flex items-center gap-5">
                           <span>
                              <TbThumbUp className="text-mainBlack" size={30} />
                           </span>
                           <div className="flex items-end gap-2">
                              {socials.map((social, index) => {
                                 return (
                                    <a href={social.link} target="_blank" rel="noopener noreferrer" key={index} className="text-[15px]">
                                       {social.icon}
                                    </a>
                                 );
                              })}
                           </div>
                        </li>
                     </ul>
                  </div>

                  <div className="relative flex-1">
                     <img src={"/assets/0013_1.png"} className="absolute -top-[100px] left-[30px] z-[-1] w-[150px] max-md:hidden" />

                     <form className="z-[2]">
                        <div className="flex items-center gap-2">
                           <div className="mb-2 flex-1">
                              <label htmlFor="" className="mb-1 block text-[.85rem]">
                                 First Name
                              </label>
                              <input required type="text" className="w-full rounded-md border-[1.5px] p-2 outline-none focus:border-mainPink" />
                           </div>

                           <div className="mb-2 flex-1">
                              <label htmlFor="" className="mb-1 block text-[.85rem]">
                                 Last Name
                              </label>
                              <input required type="text" className="w-full rounded-md border-[1.5px] p-2 outline-none focus:border-mainPink" />
                           </div>
                        </div>

                        <div className="mb-2">
                           <label htmlFor="" className="mb-1 block text-[.85rem]">
                              Email
                           </label>
                           <input required type="email" className="w-full rounded-md border-[1.5px] p-2 outline-none focus:border-mainPink" />
                        </div>

                        <div className="mb-2">
                           <label htmlFor="" className="mb-1 block text-[.85rem]">
                              Message
                           </label>
                           <textarea
                              required
                              className="h-[150px] w-full resize-none rounded-md border-[1.5px] p-2 outline-none focus:border-mainPink"
                           />{" "}
                        </div>
                        <CustomButton variant="filled" className="ml-auto min-w-[120px] justify-center text-center">
                           Send
                        </CustomButton>
                     </form>
                  </div>
               </div>
            </div>

            <Footer />
         </div>
      </>
   );
};

export default Contact;
