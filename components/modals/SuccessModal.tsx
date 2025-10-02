// components/Teachers/addClass/SuccessModal.tsx
// import React from "react";
// import { MdClose } from "react-icons/md";
// import { useDispatch, useSelector } from "react-redux";
// import { closeSuccessModal } from "store/modalSlice";
// import { RootState } from "store/store";
// import pdf from "../../public/assets/teachers/pdf.png";
// import Image from "next/image";
// import { IClass, CurrentClassState } from "types/interfaces";
// import { getAccessToken } from "utils/getTokens";

// const SuccessModal = () => {
//    const successModal = useSelector((state: RootState) => state.modal?.successModal);
//    const dispatch = useDispatch();
//    const closeModal = () => dispatch(closeSuccessModal());
   
//    const students = useSelector((state: RootState) => state.students?.students || []);
//    const classes = useSelector((state: RootState): IClass[] => state.allClasses.classes);
//    const currentClass = useSelector((state: RootState): CurrentClassState => state.currentClass);
   
//    const isStudentAdded = successModal?.message?.includes("student's login credentials");

//    const handleViewPDF = async () => {
//       if (currentClass.id) {
//          try {
//             const accessToken = getAccessToken();
            
//             if (!accessToken) {
//                console.error('No access token available');
//                return;
//             }
            
//             // Use fetch with Authorization header instead of query parameter
//             const response = await fetch(`/api/teachers/class/${currentClass.id}/print-student-logins`, {
//                method: 'GET',
//                headers: {
//                   'Authorization': `Bearer ${accessToken}`,
//                   'Content-Type': 'application/json',
//                },
//             });
            
//             if (!response.ok) {
//                throw new Error('Failed to generate PDF');
//             }
            
//             // Create blob from response and open in new tab
//             const pdfBlob = await response.blob();
//             const pdfUrl = URL.createObjectURL(pdfBlob);
            
//             window.open(pdfUrl, '_blank');
            
//             // Clean up
//             setTimeout(() => {
//                URL.revokeObjectURL(pdfUrl);
//             }, 1000);
            
//          } catch (error) {
//             console.error('Error fetching PDF:', error);
//          }
//       }
//    };

//    if (!successModal.isOpen) {
//       return <></>;
//    }

//    return (
//       <main className={styles.modalOverlay}>
//          <div className={styles.modal}>
//             <header className="mb-6 flex items-center justify-between gap-3">
//                <p className="flex-1 text-center text-[1.2rem] font-bold text-mainRed">Ready to view!</p>
//                <i className="cursor-pointer text-[1.5rem] text-red-600" onClick={closeModal}>
//                   <MdClose />
//                </i>
//             </header>
//             <div>
//                {isStudentAdded && (
//                   <div className="mb-6 text-center">
//                      <p className="mb-3 text-sm text-gray-600">
//                         Get your students logged in quickly and easily by viewing and printing the login cards in the PDF below
//                      </p>
//                      <div className="m-auto h-[120px] w-[120px] p-3">
//                         <Image src={pdf} alt="pdf" />
//                      </div>
//                      <div className="flex flex-col gap-4 m-3">
//                         <button 
//                            className={styles.pdfButton}
//                            onClick={handleViewPDF}
//                         >
//                            View Class PDF List
//                         </button>
//                      </div>
//                      <p className="mt-2 text-xs text-gray-500">
//                         <strong>Note:</strong> The PDF will open in a new tab where you can view, print, or download it.
//                      </p>
//                   </div>
//                )}
//             </div>
//          </div>
//       </main>
//    );
// };

// const styles = {
//    modalOverlay: "fixed top-0 left-0 z-[999] flex h-screen w-full items-center justify-center bg-[rgba(0,0,0,0.2)]",
//    modal: "z-[9] w-[90vw] max-w-[500px] rounded-md bg-white pt-4 pb-7 px-8 shadow-md min-h-fit",
//    pdfButton: "bg-blue-600 hover:bg-blue-700 text-white py-2 px-2 rounded-md max-w-[300px] w-full m-auto inline-flex items-center justify-center",
// };

// export default SuccessModal;

// third comments

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
   
   // Get all the necessary data from Redux state
   const students = useSelector((state: RootState) => state.students?.students || []);
   const classes = useSelector((state: RootState): IClass[] => state.allClasses.classes);
   const currentClass = useSelector((state: RootState): CurrentClassState => state.currentClass);
   
   const isStudentAdded = successModal?.message?.includes("student's login credentials");

   const handleViewPDF = () => {
      if (currentClass.id) {
         // Get the access token
         const accessToken = getAccessToken();
         
         if (!accessToken) {
            console.error('No access token available');
            // You might want to show an error message to the user
            return;
         }
         
         // Create the PDF URL - we'll pass the token as a query parameter
         const pdfUrl = `/api/teachers/class/${currentClass.id}/print-student-logins?token=${accessToken}`;
         
         // Open in new tab - this will display the PDF in the browser
         window.open(pdfUrl, '_blank');
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
               {/* PDF Download Section */}
               {isStudentAdded && (
                  <div className="mb-6 text-center">
                     <p className="mb-3 text-sm text-gray-600">
                        Get your students logged in quickly and easily by viewing and printing the login cards in the PDF below
                     </p>
                     <div className="m-auto h-[120px] w-[120px] p-3">
                        <Image src={pdf} alt="pdf" />
                     </div>
                     <div className="flex flex-col gap-4 m-3">
                        <button 
                           className={styles.pdfButton}
                           onClick={handleViewPDF}
                        >
                           View Class PDF List
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
   button: "bg-mainRed text-white py-2 px-2 rounded-md max-w-[300px] w-full text-center",
   pdfButton: "bg-blue-600 hover:bg-blue-700 text-white py-2 px-2 rounded-md max-w-[300px] w-full m-auto inline-flex items-center justify-center",
};


// second comments

// import React from "react";
// import { MdClose } from "react-icons/md";
// import { useDispatch, useSelector } from "react-redux";
// import { closeSuccessModal } from "store/modalSlice";
// import { RootState } from "store/store";
// import pdf from "../../public/assets/teachers/pdf.png";
// import Image from "next/image";

// const SuccessModal = () => {
//    const successModal = useSelector((state: RootState) => state.modal?.successModal);
//    const dispatch = useDispatch();
//    const closeModal = () => dispatch(closeSuccessModal());
//    const { id: classId } = useSelector((state: RootState) => state.currentClass);
//    const isStudentAdded = successModal?.message?.includes("student's login credentials");

//    if (!successModal.isOpen) {
//       return <></>;
//    }

//    return (
//       <main className={styles.modalOverlay}>
//          <div className={styles.modal}>
//             <header className="mb-6 flex items-center justify-between gap-3">
//                <p className="flex-1 text-center text-[1.2rem] font-bold text-mainRed">Ready to download!</p>
//                <i className="cursor-pointer text-[1.5rem] text-red-600" onClick={closeModal}>
//                   <MdClose />
//                </i>
//             </header>
//             <div>
//                {/* <p className="mx-auto mb-3 flex max-w-[400px] items-center justify-center text-center text-[1rem] font-bold text-gray-900">
//                   {successModal?.message}
//                </p> */}

//                {/* PDF Download Section */}
//                {isStudentAdded && (
//                   <div className="mb-6 text-center">
//                      <p className="mb-3 text-sm text-gray-600">
//                         Get your student loged in quick and easy by downloading and printing the QR log-in cards in the pdf below
//                      </p>
//                      <div className="m-auto h-[120px] w-[120px] p-3">
//                         <Image src={pdf} alt="pdf" />
//                      </div>
//                      <div className="flex flex-col gap-4 m-3">
//                         <button className={styles.pdfButton}>
//                            <a 
//                            href={`/api/teachers/class/${classId}/print-student-logins?print_qr_codes=true`}
//                            target="_blank" 
//                            rel="noopener noreferrer"
//                            >
//                            Show  Class pdf List
//                            </a>
//                         </button>
//                      </div>
//                      <p className="mt-2 text-xs text-gray-500">
//                         <strong>Note:</strong> QR codes can still be used to sign in, even if student log-in info changes.
//                      </p>
//                   </div>
//                )}
//             </div>
//          </div>
//       </main>
//    );
// };

// export default SuccessModal;

// const styles = {
//    modalOverlay: "fixed top-0 left-0 z-[999] flex h-screen w-full items-center justify-center bg-[rgba(0,0,0,0.2)]",
//    modal: "z-[9] w-[90vw] max-w-[500px] rounded-md bg-white pt-4 pb-7 px-8 shadow-md min-h-fit",
//    button: "bg-mainRed text-white py-2 px-2 rounded-md max-w-[300px] w-full text-center",
//    pdfButton: "bg-blue-600 hover:bg-blue-700 text-white py-2 px-2 rounded-md max-w-[300px] w-full m-auto inline-flex items-center justify-center",
//    pdfButtonSecondary: "bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md inline-flex items-center justify-center",
// };




// first comments

   {/* // href={`/teachers/class/${classId}/print-student-logins?print_qr_codes=true`}
   //                   className={styles.pdfButton}
   //                   onClick={closeModal} // Close modal when navigating
   //                >
   //                   Download Student List
   //  const { id: classId } = useSelector((state: RootState) => state.currentClass); */}

// import Link from "next/link";
// import React from "react";
// import { MdClose } from "react-icons/md";
// import { useDispatch, useSelector } from "react-redux";
// import { closeSuccessModal } from "store/modalSlice";
// import { RootState } from "store/store";

// const SuccessModal = () => {
//    const successModal = useSelector((state: RootState) => state.modal?.successModal);
//    const dispatch = useDispatch();

//    const closeModal = () => dispatch(closeSuccessModal());

//    if (!successModal.isOpen) {
//       return <></>;
//    }

//    return (
//       <main className={styles.modalOverlay}>
//          <div className={styles.modal}>
//             <header className="mb-6 flex items-center justify-between gap-3">
//                <p className="cursor-pointer text-[1.2rem] font-bold text-mainRed">Success!</p>
//                <i className="cursor-pointer text-[1.5rem] text-red-600" onClick={closeModal}>
//                   <MdClose />
//                </i>
//             </header>
//             <div>
//                <p className="mx-auto mb-8 flex h-[64px] max-w-[400px] items-center justify-center text-center text-[1rem] font-bold text-gray-900">
//                   {successModal?.message}
//                </p>
//                <div className="flex justify-center">
//                   <button className={styles.button} onClick={closeModal}>
//                      Got it
//                   </button>
//                </div>
//             </div>
//          </div>
//       </main>
//    );
// };

// export default SuccessModal;

// const styles = {
//    modalOverlay: "fixed top-0 left-0 z-[999] flex h-screen w-full items-center justify-center bg-[rgba(0,0,0,0.2)]",
//    modal: "z-[9] w-[90vw] max-w-[500px] rounded-md bg-white pt-4 pb-7 px-8 shadow-md min-h-fit",
//    button: "bg-mainRed text-white py-2 px-2 rounded-md max-w-[300px]  w-full text-center",
// };
