import React from "react";
import { FaTimes } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useMoveStudents } from "./useMoveStudents";
import SelectedBadge from "./SelectedBadge";
import StudentSelectStep from "./StudentSelectStep";
import DestinationTypeStep from "./DestinationTypeStep";
import TeacherSelectStep from "./TeacherSelectStep";
import TeacherClassStep from "./TeacherClassStep";
import ClassroomSelect from "./ClassroomSelect";
import ModalFooter from "./ModalFooter";

const MoveStudentModal = ({ setIsOpen }: { setIsOpen: (value: boolean) => void }) => {
   const { t } = useTranslation("teacher");
   const close = () => setIsOpen(false);
   const m = useMoveStudents(close);

   const stepTitles: Record<number, string> = {
      1: t("moveStudents"),
      2: t("moveHowQuestion"),
      3: m.destinationType === "own" ? t("selectAClassroom") : t("selectATeacher"),
      4: t("selectAClassroom"),
   };

   return (
      <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" data-testid="move-student-modal">
         <main className="relative flex h-fit max-h-[90vh] w-full max-w-[560px] flex-col overflow-hidden rounded-2xl bg-white p-8 shadow-2xl">
            <button type="button" onClick={close} className="absolute right-6 top-6 text-[20px] text-gray-400 transition-colors hover:text-gray-600">
               <FaTimes />
            </button>

            <h1 className="pr-8 text-[22px] font-bold text-gray-900">{stepTitles[m.step]}</h1>
            {m.step > 1 && <SelectedBadge count={m.selectedIds.length} />}

            <div className="mt-5 flex-1 overflow-y-auto">
               {m.step === 1 && (
                  <StudentSelectStep
                     students={m.students || []}
                     selectedIds={m.selectedIds}
                     toggleStudent={m.toggleStudent}
                     toggleSelectAll={m.toggleSelectAll}
                     onCancel={close}
                     onNext={() => m.setStep(2)}
                  />
               )}

               {m.step === 2 && (
                  <DestinationTypeStep sourceOrgId={m.sourceOrgId} onSelect={m.selectDestination} onBack={m.goBack} />
               )}

               {m.step === 3 && m.destinationType === "own" && (
                  <div>
                      <ClassroomSelect
                         value={m.targetClassId}
                         onChange={m.setTargetClassId}
                         options={m.targetClasses}
                         placeholder={t("selectAClassroom")}
                         testId="target-class-select"
                      />
                     {m.targetClasses.length === 0 && (
                        <p className="mt-3 text-[13px] text-gray-500">{t("noOtherClassrooms")}</p>
                     )}
                     <ModalFooter
                        onBack={m.goBack}
                        onPrimary={m.handleMove}
                        primaryLabel={m.isSubmitting ? t("moving") : t("moveStudents")}
                        primaryDisabled={!m.targetClassId || m.isSubmitting}
                        testId="move-students-confirm"
                     />
                  </div>
               )}

               {m.step === 3 && m.destinationType === "teacher" && (
                  <TeacherSelectStep
                     teachers={m.teachers}
                     teachersLoading={m.teachersLoading}
                     teacherQuery={m.teacherQuery}
                     setTeacherQuery={m.setTeacherQuery}
                     isDropdownOpen={m.isTeacherDropdownOpen}
                     setIsDropdownOpen={m.setIsTeacherDropdownOpen}
                     selectedTeacher={m.selectedTeacher}
                     onSelectTeacher={m.selectTeacher}
                     onBack={m.goBack}
                     onNext={() => m.setStep(4)}
                  />
               )}

               {m.step === 4 && m.destinationType === "teacher" && (
                  <TeacherClassStep
                     selectedTeacher={m.selectedTeacher}
                     teacherClasses={m.teacherClasses}
                     teacherClassesLoading={m.teacherClassesLoading}
                     newClassId={m.newClassId}
                     setNewClassId={m.setNewClassId}
                     isSubmitting={m.isSubmitting}
                     onBack={m.goBack}
                     onConfirm={m.handleMove}
                  />
               )}
            </div>
         </main>
      </section>
   );
};

export default MoveStudentModal;