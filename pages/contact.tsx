import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import React, { ChangeEvent, useState } from "react";
import { BiEnvelope, BiPhone } from "react-icons/bi";
import http from "axios.config";
import { useDispatch } from "react-redux";
import { closePreloader, openErrorModal, openPreloader } from "store/fetchSlice";
import ContactModal from "@/components/modals/contactUsModal";

const Contact = () => {
   const [email, setEmail] = useState("");
   const [subject, setSubject] = useState("");
   const [message, setMessage] = useState("");
   const [name, setName] = useState("");
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
            name,
         });
         setModalOpened(true);
         dispatch(closePreloader());
      } catch (error: any) {
         console.log(error);
         dispatch(openErrorModal({ errorText: [error.message] }));
         dispatch(closePreloader());
      }
   };

   return (
      <section className="min-h-screen w-full bg-[#ffffff]">
         <Navbar />
         <div className="mx-auto w-full max-w-[1100px] px-6 pt-24">
            {modalOpened && <ContactModal />}
            <h1 className="text-[1.8rem] font-bold text-orange-400">Contact Us</h1>

            <div className="mt-6 flex flex-wrap items-center justify-start gap-4">
               <article className="w-full max-w-[300px] rounded-md bg-white p-4 shadow-md">
                  <header className="flex items-center gap-4">
                     <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-orange-400 text-white">
                        <BiEnvelope />
                     </span>
                     <a href="mailto:info@codealgoacademy.com" className="text-[0.9rem] font-bold hover:underline">
                        info@codealgoacademy.com
                     </a>
                  </header>
               </article>
            </div>

            <form action="" onSubmit={sendAMessage} className="my-8 w-full max-w-[600px] rounded-md border-2 bg-white p-6">
               <div className="mb-2">
                  <label htmlFor="" className="mb-1 block">
                     Name *
                  </label>
                  <input
                     required
                     value={name}
                     onChange={(e) => {
                        setName(e.target.value);
                     }}
                     type="text"
                     placeholder="What's your name?"
                     className="w-full rounded-md border-[1.5px] p-2 outline-none focus:border-orange-400"
                  />
               </div>
               <div className="mb-2">
                  <label htmlFor="" className="mb-1 block">
                     Email *
                  </label>
                  <input
                     required
                     value={email}
                     onChange={(e) => {
                        setEmail(e.target.value);
                     }}
                     type="text"
                     placeholder="What's your email?"
                     className="w-full rounded-md border-[1.5px] p-2 outline-none focus:border-orange-400"
                  />
               </div>
               <div className="mb-2">
                  <label htmlFor="" className="mb-1 block">
                     Subject *
                  </label>
                  <input
                     required
                     value={subject}
                     onChange={(e) => {
                        setSubject(e.target.value);
                     }}
                     type="text"
                     placeholder="How can we help you?"
                     className="w-full rounded-md border-[1.5px] p-2 outline-none focus:border-orange-400"
                  />
               </div>
               <div className="mb-2">
                  <label htmlFor="" className="mb-1 block">
                     Message *
                  </label>
                  <textarea
                     required
                     value={message}
                     onChange={(e) => {
                        setMessage(e.target.value);
                     }}
                     placeholder="Message..."
                     className="h-[150px] w-full resize-none rounded-md border-[1.5px] p-2 outline-none focus:border-orange-400"
                  />
               </div>

               <button type="submit" className="w-full rounded-[20px] bg-orange-400 p-2 text-center font-bold text-white">
                  Submit
               </button>
            </form>
         </div>
         <Footer />
      </section>
   );
};

export default Contact;
