import React from "react";
import { useTranslation } from "react-i18next";
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
}: TeacherClassStepProps) => {
   const { t } = useTranslation("teacher");
   return (
   <div>
      <p className="mb-4 text-[14px] text-gray-500">
         {t("movingTo")}{" "}
         <span className="font-semibold text-gray-800">
            {selectedTeacher?.firstName} {selectedTeacher?.lastName}
         </span>
      </p>

      <ClassroomSelect
         value={newClassId}
         onChange={setNewClassId}
         options={teacherClasses}
         placeholder={teacherClassesLoading ? t("loadingClasses") : t("selectAClassroom")}
         disabled={teacherClassesLoading}
         testId="new-class-select"
      />

      {!teacherClassesLoading && teacherClasses.length === 0 && (
         <p className="mt-3 text-[13px] text-gray-500">{t("teacherNoActiveClasses")}</p>
      )}

      <ModalFooter
         onBack={onBack}
         onPrimary={onConfirm}
         primaryLabel={isSubmitting ? t("moving") : t("moveStudents")}
         primaryDisabled={!newClassId || isSubmitting}
         testId="move-students-confirm"
      />
   </div>
   );
};

export default TeacherClassStep;