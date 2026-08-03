import React from "react";
import { ISingleStudent } from "types/interfaces";
import ModalFooter from "./ModalFooter";

interface StudentSelectStepProps {
   students: ISingleStudent[];
   selectedIds: string[];
   toggleStudent: (id: string) => void;
   toggleSelectAll: () => void;
   onCancel: () => void;
   onNext: () => void;
}

const StudentSelectStep = ({ students, selectedIds, toggleStudent, toggleSelectAll, onCancel, onNext }: StudentSelectStepProps) => (
   <div>
      {!students || students?.length === 0 ? (
         <p className="grid h-40 place-content-center text-sm text-gray-500">There are no students to move.</p>
      ) : (
         <div className="overflow-hidden rounded-xl border border-gray-100">
            <div className="grid grid-cols-[40px_1fr_1fr] items-center gap-x-3 bg-gray-50 px-4 py-3">
               <input
                  type="checkbox"
                  className="h-[18px] w-[18px] cursor-pointer rounded accent-blue-600"
                  checked={selectedIds.length === students?.length && students.length > 0}
                  onChange={toggleSelectAll}
               />
               <span className="text-[14px] font-semibold text-gray-700">Student</span>
               <span className="text-[14px] font-semibold text-gray-700">Username</span>
            </div>
            <ul className="max-h-[45vh] overflow-y-auto">
               {students?.map((student) => {
                  const isSelected = selectedIds.includes(student.id);
                  return (
                     <li key={student.id}>
                        <label className="grid cursor-pointer grid-cols-[40px_1fr_1fr] items-center gap-x-3 border-t border-gray-100 px-4 py-3 transition-colors hover:bg-gray-50">
                           <input
                              type="checkbox"
                              className="h-[18px] w-[18px] cursor-pointer rounded accent-blue-600"
                              checked={isSelected}
                              onChange={() => toggleStudent(student.id)}
                           />
                           <span className="truncate text-[15px] font-medium text-blue-600">
                              {student.firstName} {student.lastName}
                           </span>
                           <span className="truncate text-[15px] text-gray-700">{student.username}</span>
                        </label>
                     </li>
                  );
               })}
            </ul>
         </div>
      )}

      <ModalFooter onBack={onCancel} backLabel="Cancel" onPrimary={onNext} primaryLabel="Next step" primaryDisabled={selectedIds.length === 0} />
   </div>
);

export default StudentSelectStep;