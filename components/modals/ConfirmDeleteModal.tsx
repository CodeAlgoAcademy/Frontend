import React from "react";
import { useTranslation } from "react-i18next";

interface ConfirmDeleteModalProps {
   isOpen: boolean;
   onClose: () => void;
   onConfirm: () => void;
   title: string;
   itemName: string;
   isDeleting?: boolean;
   confirmText?: string;
   cancelText?: string;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
   isOpen,
   onClose,
   onConfirm,
   title,
   itemName,
   isDeleting = false,
   confirmText = "Delete",
   cancelText = "Cancel"
}) => {
   if (!isOpen) return null;

   const { t } = useTranslation("modals");

   return (
      <>
         <div className="fixed inset-0 z-40 bg-black bg-opacity-50"></div>
         <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
            <div className="rounded-lg bg-white p-6 shadow-lg border max-w-md w-full mx-4"> 
                <p className="mb-4 text-sm">
                   {title} <span className="font-semibold">{itemName}</span>? 
                   {t("thisActionCannotBeUndone")}
                </p>
               <div className="flex justify-end space-x-2">
                  <button 
                     className="rounded bg-gray-300 px-4 py-2 disabled:opacity-50 text-sm"        
                     onClick={onClose}
                     disabled={isDeleting}
                  >
                     {cancelText}
                  </button>
                   <button
                      className="rounded bg-red-600 px-4 py-2 text-white disabled:opacity-50 text-sm"
                      onClick={onConfirm}
                      disabled={isDeleting}
                   >
                      {isDeleting ? t("deleting") : confirmText}
                  </button>
               </div>
            </div>
         </div>
      </>
   );
};

export default ConfirmDeleteModal;