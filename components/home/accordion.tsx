import React from "react";
import { ChevronRight, Lightbulb } from "lucide-react";

export const SimpleAccordion = ({ guide, index }: { guide: any; index: number }) => {
   const [open, setOpen] = React.useState(false);
   return (
      <div className="rounded-xl border border-gray-200 bg-white px-6 py-4">
         <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between text-left">
            <div className="flex items-center gap-3">
               <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                  <Lightbulb className="h-4 w-4 text-blue-600" />
               </div>
               <span className="font-semibold text-gray-900">{guide.question}</span>
            </div>
            <ChevronRight className={`h-5 w-5 text-gray-500 transition-transform ${open ? "rotate-90" : ""}`} />
         </button>
         {open && <div className="mt-4 pl-11 text-gray-600">{guide.answer}</div>}
      </div>
   );
};