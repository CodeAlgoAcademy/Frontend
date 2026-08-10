import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RootState } from "store/store";
import MathFactAssignModal from "./components/mathfactAssignmentModal";
import MathFactsList from "./components/mathlist";
import { MathFactAssignmentDetail } from "types/interfaces/mathfact";

interface MathFactsPageProps {
   onViewReport: () => void;
}

export default function MathFactsPage({ onViewReport }: MathFactsPageProps) {
   const { t } = useTranslation("teacher");
   const classId = useSelector((state: RootState) => state.currentClass?.id);
   const classStudents = useSelector((state: RootState) => (state as any).teacherStudentSlice?.students ?? []);

  const students = useMemo(() => classStudents.map((s: any) => ({
      id: s.student_id ?? s.id,
      name: s.fullName ?? `${s.firstName ?? ""} ${s.lastName ?? ""}`.trim(),
      username: s.username ?? "",
   })), [classStudents]); 


   const [isModalOpen, setIsModalOpen] = useState(false);
   const [editingStudentId, setEditingStudentId] = useState<number | null>(null);
   const [editingStudentName, setEditingStudentName] = useState<string>("");
   const [editingAssignments, setEditingAssignments] = useState<MathFactAssignmentDetail[]>([]);
   const [refreshKey, setRefreshKey] = useState(0);

   const handleEdit = (studentId: number, studentName: string, assignments: MathFactAssignmentDetail[]) => {
      setEditingStudentId(studentId);
      setEditingStudentName(studentName);
      setEditingAssignments(assignments);
      setIsModalOpen(true);
   };

   const handleCloseModal = () => {
      setIsModalOpen(false);
      setEditingStudentId(null);
      setEditingStudentName("");
      setEditingAssignments([]);
   };

   const handleSuccess = () => {
      setRefreshKey((prev) => prev + 1);
      handleCloseModal();
   };

   const handleRefresh = () => {
      setRefreshKey((prev) => prev + 1);
   };

    if (!classId) {
      return (
         <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
            <p className="text-sm text-yellow-700">{t("pleaseSelectClassFirst")}</p>
         </div>
      );
   }

   return (
      <div className="mx-auto max-w-7xl px-6 py-8">
            <div className="mb-8">
            <div className="flex items-center justify-between">
               <div>
                  <div className="flex items-center gap-4">
                     <h1 className="text-3xl font-bold text-gray-900">{t("computationalMath")}</h1>
                     <button 
                        onClick={onViewReport}
                        className="px-4 py-1.5 text-sm font-semibold text-emerald-600 bg-emerald-50 rounded-full hover:bg-emerald-100 transition-colors border border-emerald-200"
                     >
                        📊 {t("viewMasteryReports")}
                     </button>
                  </div>
                  <p className="mt-1 text-gray-500">
                     {t("mathDrillsDescription")}
                  </p>
               </div>
            </div>
         </div>

         <MathFactsList
            key={refreshKey}
            classId={classId}
            students={students}
            onEdit={handleEdit}
         />

         <MathFactAssignModal
            classId={classId}
            isOpen={isModalOpen}
            isEditing={editingAssignments.length > 0}
            assignmentData={{
               studentId: editingStudentId,
               studentName: editingStudentName,
               assignments: editingAssignments,
            }}
            onClose={handleCloseModal}
            onSuccess={handleSuccess}
         />
      </div>
   );
}