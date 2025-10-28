// components/organizers/AddUserModal.tsx
import React, { ChangeEvent, useEffect, useState } from "react";
import { BiChevronDown, BiChevronUp, BiX } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { addUserToOrganization, getAllInvitations, getAllRoles } from "services/organizersService";
import { RootState } from "store/store";
import { IRole } from "types/interfaces/organization.interface";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose }) => {
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
         setTimeout(() => {
            onClose();
         }, 1500);
      }
   };

   useEffect(() => {
      setRole(roles?.[0]);
   }, [roles]);

   useEffect(() => {
      if (isOpen) {
         dispatch(getAllRoles());
      }
   }, [isOpen]);

   useEffect(() => {
      let timeout: NodeJS.Timeout;
      if (message) {
         timeout = setTimeout(() => {
            setMessage("");
         }, 2000);
      }

      return () => clearTimeout(timeout);
   }, [message]);

   if (!isOpen) return null;

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
         <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between p-4 border-b">
               <h3 className="text-lg font-semibold">Add User</h3>
               <button
                  onClick={onClose}
                  className="p-1 text-gray-400 hover:text-gray-600"
               >
                  <BiX className="w-6 h-6" />
               </button>
            </div>

            <form onSubmit={submit} className="p-6">
               <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                     User Email
                  </label>
                  <input
                     type="email"
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mainColor"
                     placeholder="Enter user email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     required
                  />
               </div>

               <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                     Role
                  </label>
                  <div className="relative">
                     <div
                        onClick={() => setDropdownOpen((prev) => !prev)}
                        className="flex items-center justify-between w-full px-3 py-2 border border-gray-300 rounded-md cursor-pointer"
                     >
                        <p>{role?.name || "Select a role"}</p>
                        <i className="text-[1.2rem]">
                           {dropdownOpen ? <BiChevronUp /> : <BiChevronDown />}
                        </i>
                     </div>

                     {dropdownOpen && (
                        <div className="absolute top-full left-0 right-0 z-10 mt-1 max-h-48 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg">
                           {roles?.map((role, index) => (
                              <p
                                 key={index}
                                 className="w-full p-2 hover:bg-blue-50 cursor-pointer"
                                 onClick={() => {
                                    setRole(role);
                                    setDropdownOpen(false);
                                 }}
                              >
                                 {role?.name}
                              </p>
                           ))}
                        </div>
                     )}
                  </div>
               </div>

               <div className="flex justify-end space-x-3">
                  <button
                     type="button"
                     onClick={onClose}
                     className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                     Cancel
                  </button>
                  <button
                     type="submit"
                     className="px-4 py-2 text-white bg-mainColor rounded-md hover:opacity-90"
                  >
                     Send Invite
                  </button>
               </div>

               {message && (
                  <div className="mt-4 p-2 text-green-600 bg-green-100 rounded-md">
                     {message}
                  </div>
               )}
            </form>
         </div>
      </div>
   );
};

export default AddUserModal;