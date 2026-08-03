import React from "react";
import { FaChevronDown } from "react-icons/fa";

interface ClassroomOption {
   id: string | number;
   className: string;
   grade?: string | number;
}

interface ClassroomSelectProps {
   value: string | number;
   onChange: (value: string) => void;
   options: ClassroomOption[];
   placeholder: string;
   disabled?: boolean;
   testId?: string;
}

const ClassroomSelect = ({ value, onChange, options, placeholder, disabled, testId }: ClassroomSelectProps) => (
   <div className="relative">
      <select
         className="w-full appearance-none rounded-full border border-gray-200 bg-white px-5 py-3.5 text-[15px] font-medium text-gray-800 outline-none focus:border-blue-400 disabled:bg-gray-50"
         value={value}
         onChange={(e) => onChange(e.target.value)}
         disabled={disabled}
         data-testid={testId}
      >
         <option value="">{placeholder}</option>
         {options?.map((cls) => (
            <option key={cls.id} value={cls.id}>
               {cls.className}
               {cls.grade ? ` - Grade ${cls.grade}` : ""}
            </option>
         ))}
      </select>
      <FaChevronDown className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-gray-400" />
   </div>
);

export default ClassroomSelect;