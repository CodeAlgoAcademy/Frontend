import React from "react";
import ContentBox from "../parents/UI/ContentBox";

const CreateRoles = () => {
   return (
      <ContentBox title="Create Role" size="base" padding="small">
         <form action="">
            <div className="flex flex-col gap-[1rem]">
               <div>
                  <p className="font-500 text-[0.98rem]">Name</p>
                  <input type="text" placeholder="Enter Role Name" className={style.input} />
               </div>

               <div>
                  <p className="font-500 text-[0.98rem]">Description</p>
                  <input type="text" placeholder="Enter Role Description" className={style.input} />
               </div>
            </div>

            <button className="mt-8 ml-auto block min-w-[150px] max-w-[150px] rounded-md bg-[#2073fa] p-2 text-white">Create Role</button>
         </form>
      </ContentBox>
   );
};

const style = {
   input: `px-3 py-[10px] border-b-[2px] outline-none w-full bg-transparent border-b-[#333] text-[#333] placeholder:text-[#333] focus:border-b-[#2073fa] transition-all duration-300`,
};

export default CreateRoles;
