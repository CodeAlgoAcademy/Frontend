import React, { ChangeEvent, useEffect, useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { addUserToOrganization, getAllInvitations, getAllRoles } from "services/organizersService";
import { RootState } from "store/store";
import { IRole } from "types/interfaces/organization.interface";
import ContentBox from "../parents/UI/ContentBox";

const AddUser = () => {
   const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
   const [email, setEmail] = useState<string>("");
   const [role, setRole] = useState<IRole | undefined>(undefined);
   const [message, setMessage] = useState<string>("");

   const dispatch = useDispatch();

   const roles = useSelector((state: RootState) => state.organizer?.roles);

   const submit = async (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();

      const data = await dispatch(addUserToOrganization({ email, role: role?.id }));
      if (!data?.error) {
         setMessage("Invite sent!");
         setEmail("");
         dispatch(getAllInvitations());
      }
   };

   useEffect(() => {
      setRole(roles?.[0]);
   }, [roles]);

   useEffect(() => {
      dispatch(getAllRoles());
   }, []);

   useEffect(() => {
      let timeout: NodeJS.Timeout;
      if (message) {
         timeout = setTimeout(() => {
            setMessage("");
         }, 2000);
      }

      return () => clearTimeout(timeout);
   }, [message]);

   return (
      <ContentBox title="Add User" size="large" padding="large">
         <form action="" onSubmit={submit}>
            <div className="flex justify-end">
               <header className="relative">
                  <div
                     onClick={() => {
                        setDropdownOpen((prev) => !prev);
                     }}
                     className="flex cursor-pointer items-center justify-between gap-[0.8rem] rounded-md border-2 border-[#2073fa] px-3 py-2"
                  >
                     <p>{role?.name}</p>
                     <i className="text-[1.5rem]">{dropdownOpen ? <BiChevronUp /> : <BiChevronDown />}</i>
                  </div>

                  {dropdownOpen && (
                     <div className="absolute top-[110%] right-0 z-[5] max-h-[150px] w-[200px] max-w-[90vw] overflow-y-scroll rounded-md bg-white shadow-md">
                        {roles?.map((role, index) => {
                           return (
                              <p className="w-full p-2 hover:bg-blue-50" key={index} onClick={() => setRole(role)}>
                                 {role?.name}
                              </p>
                           );
                        })}
                     </div>
                  )}
               </header>
            </div>
            <div className="mt-[8%]">
               <input
                  type="text"
                  className={`${style.input}`}
                  placeholder="Enter user email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               />
               <button className={style.button}>Send Request</button>

               {message && <p className="text-green-500">{message}</p>}
            </div>
         </form>
      </ContentBox>
   );
};

const style = {
   input: `px-3 py-[10px] border-b-[2px] outline-none w-full bg-transparent border-b-[#333] text-[#333] placeholder:text-[#333] focus:border-b-[#2073fa] transition-all duration-300`,
   button: "mt-8 ml-auto block min-w-[150px] max-w-[150px] rounded-md bg-[#2073fa] p-2 text-white",
   dropdownHeader: "",
};

export default AddUser;
