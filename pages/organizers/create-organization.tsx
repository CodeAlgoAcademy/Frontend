import OrganizerLayout from "@/components/layouts/OrganizerLayout";
import Button from "@/components/UI/Button";
import styles from "@/styles/styles";
import React from "react";

const CreateOrganization = () => {
   return (
      <OrganizerLayout>
         <div className="mt-8">
            <h2 className="text-[1.6rem] font-bold text-[#2073fa]">Create Organization</h2>

            <div className="mt-8 grid grid-cols-2 gap-x-[1rem] gap-y-[1.5rem]">
               <div>
                  <p className="font-500 text-[0.98rem]">Name</p>
                  <input type="text" placeholder="Enter Organization Name" className={style.input} />
               </div>

               <div>
                  <p className="font-500 text-[0.98rem]">Code</p>
                  <input type="text" placeholder="Enter Organization Code" className={style.input} />
               </div>

               <div className="col-span-2">
                  <p className="font-500 text-[0.98rem]">Description</p>
                  <textarea placeholder="Enter Organization Name" className={style.input + " h-[150px] resize-none"} />
               </div>
            </div>
         </div>

         <div className="mt-8">
            <button className="ml-auto block w-full max-w-[170px] rounded-md bg-[#2073fa] py-2 text-white active:scale-95">Submit</button>
         </div>
      </OrganizerLayout>
   );
};

const style = {
   input: `px-3 py-[10px] border-b-[2px] outline-none w-full bg-transparent border-b-[#333] text-[#333] placeholder:text-[#333] focus:border-b-[#2073fa] transition-all duration-300`,
};

export default CreateOrganization;
