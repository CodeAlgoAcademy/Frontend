import React from "react";
import { cn } from "utils";
import { X } from "lucide-react";

export interface ConfirmationModalProps {
   isOpen: boolean;
   onClose: () => void;
   onConfirm: () => void;
   title: string;
   message: string;
   confirmText: string;
   cancelText: string;
   type: "cancel" | "reactivate";
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
   isOpen,
   onClose,
   onConfirm,
   title,
   message,
   confirmText,
   cancelText,
   type
}) => {
   if (!isOpen) return null;

   const handleConfirm = () => {
      onConfirm();
      onClose();
   };

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
         <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={onClose}
         />
         <div className="relative z-50 w-full max-w-md transform overflow-hidden rounded-lg bg-white shadow-xl transition-all">
            <div className={cn(
               "flex items-center justify-between px-6 py-4",
               type === "cancel" ? "bg-red-50" : "bg-green-50"
            )}>
               <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
               <button
                  onClick={onClose}
                  className="rounded-full p-1 hover:bg-gray-200 transition-colors"
               >
                  <X className="h-5 w-5 text-gray-500" />
               </button>
            </div>
            
            <div className="px-6 py-4">
               <p className="text-sm text-gray-600">{message}</p>
            </div>
            
            <div className="flex justify-end gap-3 bg-gray-50 px-6 py-4">
               <button
                  onClick={onClose}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
               >
                  {cancelText}
               </button>
               <button
                  onClick={handleConfirm}
                  className={cn(
                     "rounded-md px-4 py-2 text-sm font-medium text-white transition-colors",
                     type === "cancel" 
                        ? "bg-red-600 hover:bg-red-700" 
                        : "bg-green-600 hover:bg-green-700"
                  )}
               >
                  {confirmText}
               </button>
            </div>
         </div>
      </div>
   );
};

export default ConfirmationModal;