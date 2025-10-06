import React from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { closeSuccessModal } from "store/modalSlice";
import { RootState } from "store/store";
import pdf from "../../public/assets/teachers/pdf.png";
import Image from "next/image";
import { IClass, CurrentClassState } from "types/interfaces";
import { getAccessToken } from "utils/getTokens";

const SuccessModal = () => {
   const successModal = useSelector((state: RootState) => state.modal?.successModal);
   const dispatch = useDispatch();
   const closeModal = () => dispatch(closeSuccessModal());
   
   const currentClass = useSelector((state: RootState): CurrentClassState => state.currentClass);
   
   const isStudentAdded = successModal?.message?.includes("student's login credentials");
   const isPDFReady = successModal?.message?.includes("PDF is ready");

   // const handleViewPDF = () => {
   //    if (currentClass.id) {
   //       const accessToken = getAccessToken();
         
   //       if (!accessToken) {
   //          console.error('No access token available');
   //          return;
   //       }
         
   //       const pdfUrl = `/api/teachers/class/${currentClass.id}/print-student-logins?token=${accessToken}`;
   //       window.open(pdfUrl, '_blank');
   //       closeModal();
   //    }
   // };

   const handleViewPDF = async () => {
  if (currentClass.id) {
    const accessToken = getAccessToken();
    
    if (!accessToken) {
      console.error('No access token available');
      return;
    }
    
    try {
      const response = await fetch(`/api/teachers/class/${currentClass.id}/print-student-logins`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const blob = await response.blob();
      const pdfUrl = window.URL.createObjectURL(blob);
      
      const newWindow = window.open(pdfUrl, '_blank');
      if (!newWindow) {
        alert('Please allow popups for this site to view the PDF');
      }
      
      // Clean up the URL object after the window is closed
      setTimeout(() => window.URL.revokeObjectURL(pdfUrl), 1000);
      closeModal();
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  }
};

   if (!successModal.isOpen) {
      return <></>;
   }

   return (
      <main className={styles.modalOverlay}>
         <div className={styles.modal}>
            <header className="mb-6 flex items-center justify-between gap-3">
               <p className="flex-1 text-center text-[1.2rem] font-bold text-mainRed">Ready to view!</p>
               <i className="cursor-pointer text-[1.5rem] text-red-600" onClick={closeModal}>
                  <MdClose />
               </i>
            </header>
            <div>
               {(isStudentAdded || isPDFReady) && (
                  <div className="mb-6 text-center">
                     <p className="mb-3 text-sm text-gray-600">
                        {isStudentAdded 
                           ? "Get your students logged in quickly and easily by viewing and printing the login cards in the PDF below"
                           : "Your student login credentials PDF is ready to view and print"
                        }
                     </p>
                     <div className="m-auto h-[120px] w-[120px] p-3">
                        <Image src={pdf} alt="pdf" />
                     </div>
                     <div className="flex flex-col gap-4 m-3">
                        <button 
                           className={styles.pdfButton}
                           onClick={handleViewPDF}
                        >
                           {isStudentAdded ? "View Class PDF List" : "View PDF"}
                        </button>
                     </div>
                     <p className="mt-2 text-xs text-gray-500">
                        <strong>Note:</strong> The PDF will open in a new tab where you can view, print, or download it.
                     </p>
                  </div>
               )}
            </div>
         </div>
      </main>
   );
};

export default SuccessModal;

const styles = {
   modalOverlay: "fixed top-0 left-0 z-[999] flex h-screen w-full items-center justify-center bg-[rgba(0,0,0,0.2)]",
   modal: "z-[9] w-[90vw] max-w-[500px] rounded-md bg-white pt-4 pb-7 px-8 shadow-md min-h-fit",
   pdfButton: "bg-blue-600 hover:bg-blue-700 text-white py-2 px-2 rounded-md max-w-[300px] w-full m-auto inline-flex items-center justify-center",
};