import React from "react";
import ClassroomSelect from "./ClassroomSelect";
import ModalFooter from "./ModalFooter";

interface TeacherClassStepProps {
   selectedTeacher: any;
   teacherClasses: any[];
   teacherClassesLoading: boolean;
   newClassId: string | number;
   setNewClassId: (value: string) => void;
   isSubmitting: boolean;
   onBack: () => void;
   onConfirm: () => void;
}

const TeacherClassStep = ({
   selectedTeacher,
   teacherClasses,
   teacherClassesLoading,
   newClassId,
   setNewClassId,
   isSubmitting,
   onBack,
   onConfirm,
}: TeacherClassStepProps) => (
   <div>
      <p className="mb-4 text-[14px] text-gray-500">
         Moving to{" "}
         <span className="font-semibold text-gray-800">
            {selectedTeacher?.firstName} {selectedTeacher?.lastName}
         </span>
      </p>

      <ClassroomSelect
         value={newClassId}
         onChange={setNewClassId}
         options={teacherClasses}
         placeholder={teacherClassesLoading ? "Loading classes..." : "Select a classroom"}
         disabled={teacherClassesLoading}
         testId="new-class-select"
      />

      {!teacherClassesLoading && teacherClasses.length === 0 && (
         <p className="mt-3 text-[13px] text-gray-500">This teacher doesn&apos;t have any active classes.</p>
      )}

      <ModalFooter
         onBack={onBack}
         onPrimary={onConfirm}
         primaryLabel={isSubmitting ? "Moving..." : "Move Students"}
         primaryDisabled={!newClassId || isSubmitting}
         testId="move-students-confirm"
      />
   </div>
);

export default TeacherClassStep;