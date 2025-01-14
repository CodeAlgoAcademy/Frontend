import Banner from "@/components/home/new-home/banner";
import Footer, { socials } from "@/components/home/new-home/footer";
import ContactModal from "@/components/modals/contactUsModal";
import Navbar from "@/components/navbar/home/Navbar";
import { CustomButton } from "@/components/UI/Button";
import http from "axios.config";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { BiEnvelopeOpen, BiMapPin } from "react-icons/bi";
import { TbThumbUp } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { closePreloader, openErrorModal, openPreloader } from "store/fetchSlice";

const Contact = () => {
   const [email, setEmail] = useState("");
   const [subject, setSubject] = useState("");
   const [message, setMessage] = useState("");
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [modalOpened, setModalOpened] = useState(false);
   const dispatch = useDispatch();

   const sendAMessage = async (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(openPreloader({ loadingText: "Sending message" }));
      try {
         const { data } = await http.post("/contact/message/", {
            email,
            subject,
            message,
            name: `${firstName} ${lastName}`,
         });
         setModalOpened(true);
         alert(data?.email + data?.subject + data?.message + data?.name);
         dispatch(closePreloader());
      } catch (error: any) {
         console.log(error);
         dispatch(openErrorModal({ errorText: [error.message] }));
         dispatch(closePreloader());
      }
   };
   return (
      <>
         <Navbar />

         <div className="relative overflow-x-hidden bg-white font-thabit">
            <Banner />

            <div className="mx-auto max-w-[1200px] p-6">
               {modalOpened && <ContactModal />}

               <h1 className="mt-20 text-center font-thabit text-[2.1rem] font-bold max-md:text-[1.5rem]">We are here to help!</h1>

               <div className="mt-40 mb-12 flex items-start gap-8 max-md:flex-col">
                  <div className="flex-1">
                     <ul className="space-y-8">
                        <li className="flex items-center gap-3 font-thabit">
                           <span>
                              <BiMapPin className="text-mainBlack" size={30} />
                           </span>
                           Kansas City, MO, USA
                        </li>

                        <li className="flex items-center gap-3 font-thabit">
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
                     <img src={"/assets/0013_1.png"} className="absolute -top-[112px] -left-[60px] z-[1] w-[150px] max-md:hidden" />

                     <form onSubmit={sendAMessage} className="relative z-[2] bg-white">
                        <div className="flex items-center gap-2">
                           <div className="mb-2 flex-1">
                              <label htmlFor="" className="mb-1 block font-thabit text-[.85rem]">
                                 First Name
                              </label>
                              <input
                                 type="text"
                                 value={firstName}
                                 onChange={(e) => {
                                    setFirstName(e.target.value);
                                 }}
                                 className="w-full rounded-md border-[1.5px] p-2 outline-none focus:border-mainPink"
                              />
                           </div>

                           <div className="mb-2 flex-1">
                              <label htmlFor="" className="mb-1 block font-thabit text-[.85rem]">
                                 Last Name
                              </label>
                              <input
                                 type="text"
                                 value={lastName}
                                 onChange={(e) => {
                                    setLastName(e.target.value);
                                 }}
                                 className="w-full rounded-md border-[1.5px] p-2 outline-none focus:border-mainPink"
                              />
                           </div>
                        </div>

                        <div className="mb-2">
                           <label htmlFor="" className="mb-1 block font-thabit text-[.85rem]">
                              Email<sup>*</sup>
                           </label>
                           <input
                              required
                              type="email"
                              value={email}
                              onChange={(e) => {
                                 setEmail(e.target.value);
                              }}
                              className="w-full rounded-md border-[1.5px] p-2 outline-none focus:border-mainPink"
                           />
                        </div>

                        <div className="mb-2">
                           <label htmlFor="" className="mb-1 block font-thabit text-[.85rem]">
                              Message<sup>*</sup>
                           </label>
                           <textarea
                              required
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              className="h-[150px] w-full resize-none rounded-md border-[1.5px] p-2 outline-none focus:border-mainPink"
                           />{" "}
                        </div>
                        <CustomButton
                           type="submit"
                           variant="filled"
                           className="ml-auto min-w-[120px] justify-center text-center font-thabit font-bold"
                        >
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
