import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { createRole, getAllRoles } from "services/organizersService";
import ContentBox from "../parents/UI/ContentBox";

const CreateRoles = () => {
   const [name, setName] = useState<string>("");
   const [description, setDescription] = useState<string>("");

   const dispatch = useDispatch();

   const submit = async (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();

      const data = await dispatch(createRole({ name, description }));

      if (!data?.error) {
         setName("");
         setDescription("");
         dispatch(getAllRoles());
      }
   };

   return (
      <ContentBox title="Create Role" size="base" padding="small">
         <form action="">
            <div className="flex flex-col gap-[1rem]">
               <div>
                  <p className="font-500 text-[0.98rem]">Name</p>
                  <input
                     type="text"
                     placeholder="Enter Role Name"
                     className={style.input}
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     required
                  />
               </div>

               <div>
                  <p className="font-500 text-[0.98rem]">Description</p>
                  <input
                     type="text"
                     placeholder="Enter Role Description"
                     className={style.input}
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                     required
                  />
               </div>
            </div>

            <button className={style.button} type="submit">
               Create Role
            </button>
         </form>
      </ContentBox>
   );
};

const style = {
   input: `px-3 py-[10px] border-b-[2px] outline-none w-full bg-transparent border-b-[#333] text-[#333] placeholder:text-[#333] focus:border-b-[#2073fa] transition-all duration-300`,
   button: "mt-8 ml-auto block min-w-[150px] max-w-[150px] rounded-md bg-[#2073fa] p-2 text-white",
};

export default CreateRoles;
