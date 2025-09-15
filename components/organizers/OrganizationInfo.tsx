import React, { useState } from "react";
import { BiCopy, BiCheck } from "react-icons/bi";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import ContentBox from "../parents/UI/ContentBox";
import { OrganizationStats } from "types/interfaces/organization.interface";

interface Props {
   organizationStats: OrganizationStats | undefined;
   loading?: boolean;
}

const OrganizationInfo = (props: Props) => {
   const organization = useSelector((state: RootState) => state?.organizer?.selectedOrganization);
   const [isCopied, setIsCopied] = useState(false);

   const handleCopyCode = async () => {
      const codeToCopy = organization?.invite_code || '';
      
      try {
         await navigator.clipboard.writeText(codeToCopy);
         setIsCopied(true);
         setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
         const textArea = document.createElement('textarea');
         textArea.value = codeToCopy;
         document.body.appendChild(textArea);
         textArea.select();
         document.execCommand('copy');
         document.body.removeChild(textArea);
         
         setIsCopied(true);
         setTimeout(() => setIsCopied(false), 2000);
      }
   };

   if (props.loading) {
      return (
         <ContentBox 
            title="Organization Info" 
            size="large"
            padding="small"
            style={{
               minWidth: "100%",
               maxWidth: "100%",
               height: "400px",
               overflowY: "auto",
            }}
         >
            <div className="animate-pulse">
               <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
               <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mt-6"></div>
                  <div className="h-16 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mt-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
               </div>
            </div>
         </ContentBox>
      );
   }

   return (
      <ContentBox 
         title="Organization Info" 
         size="large"
         padding="small"
         style={{
            minWidth: "100%",
            maxWidth: "100%",
            height: "400px",
            overflowY: "auto",
         }}
      >
         <h3 className="text-[1.1rem] font-bold">{organization?.name}</h3>

         <div className="mt-3 max-h-[200px] overflow-y-scroll">
            <h5 className="font-bold text-[#333]">Organization Code</h5>
            <header className="mt-2 mb-4 flex justify-between items-center text-[0.9rem]">
               <p className="font-mono bg-gray-100 px-2 py-1 rounded">
                  {organization?.invite_code}
               </p>

               <button
                  onClick={handleCopyCode}
                  className="flex items-center text-mainColor cursor-pointer hover:opacity-80 transition-opacity"
                  title="Copy invite code"
               >
                  {isCopied ? 'Copied!' : 'Copy Code'}
                  <span className="ml-2 inline-block">
                     {isCopied ? (
                        <BiCheck className="w-4 h-4 text-green-500" />
                     ) : (
                        <BiCopy className="w-4 h-4" />
                     )}
                  </span>
               </button>
            </header>

            {isCopied && (
               <p className="text-sm text-green-600 mb-2">✓ Copied to clipboard!</p>
            )}

            <h5 className="font-bold text-[#333] mt-4">Description</h5>
            <p className="mt-2 text-[0.9rem] text-gray-700 bg-gray-50 p-2 rounded">
               {organization?.description || "No description provided"}
            </p>
            
            <div className="mt-4 space-y-2">
               <p className="font-bold text-[#333]">
                  Total Accounts: <span className="text-mainColor">{props.organizationStats?.total_accounts || 0}</span>
               </p>
               <p className="font-bold text-[#333]">
                  New Accounts Today: <span className="text-mainColor">{props.organizationStats?.new_accounts_today || 0}</span>
               </p>
            </div>
         </div>
      </ContentBox>
   );
};

export default OrganizationInfo;