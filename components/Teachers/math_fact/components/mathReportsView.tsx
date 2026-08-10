import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { RootState, AppDispatch } from "store/store";
import { fetchMathAnalytics, fetchMathOverview } from "store/mathFactsSlice";
import StudentMiniHeatmap from "./StudentMiniHeatmap";
import MasteryHeatmap from "./MasteryHeatmap";

type Operation = "multiply" | "add" | "subtract" | "divide" | "all";

interface ErrorPair {
   operand_a: number;
   operand_b: number;
   total: number;
   errors: number;
}

interface StudentAnalytics {
   student_id: number;
   student_name: string;
   data: ErrorPair[];
}

const OPERATIONS: { value: Operation; labelKey: string }[] = [
   { value: "all", labelKey: "all" },
   { value: "multiply", labelKey: "multiplication" },
   { value: "add", labelKey: "addition" },
   { value: "subtract", labelKey: "subtraction" },
   { value: "divide", labelKey: "division" },
];

const OP_DISPLAY_LABEL: Record<string, string> = {
   multiply: "multiplication",
   add: "addition",
   subtract: "subtraction",
   divide: "division",
};

const ACTIVE_OPS: Exclude<Operation, "all">[] = ["multiply", "add", "subtract", "divide"];

export default function MathReportsView({ classId }: { classId: string | number }) {
   const { t } = useTranslation("teacher");
   const dispatch = useDispatch<AppDispatch>();

   const { analytics, overview, analyticsLoading, loading } = useSelector((state: RootState) => state.mathFacts);

   const [selectedStudent, setSelectedStudent] = useState<string | number>("all");
   const [selectedOperation, setSelectedOperation] = useState<Operation>("all");

   useEffect(() => {
      dispatch(fetchMathOverview(classId));
   }, [classId, dispatch]);

   useEffect(() => {
      dispatch(
         fetchMathAnalytics({
            classId,
            studentId: selectedStudent,
            operation: selectedOperation,
         })
      );
   }, [classId, selectedStudent, selectedOperation, dispatch]);

   const studentRows = analytics as unknown as StudentAnalytics[];

   const activeOps: Exclude<Operation, "all">[] = selectedOperation === "all" ? ACTIVE_OPS : [selectedOperation];

   const hasNoData = !analyticsLoading && studentRows.every((s) => s.data.length === 0);

   const isAllStudents = selectedStudent === "all";

   return (
      <div className="space-y-6">
         <div className="flex flex-wrap items-center gap-3">
            <select
               className="min-w-[160px] rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
               value={selectedStudent}
               onChange={(e) => setSelectedStudent(e.target.value)}
               disabled={loading}
            >
               <option value="all">{t("allStudents")}</option>
               {overview.map((s) => (
                  <option key={s.id} value={s.id}>
                     {s.full_name}
                  </option>
               ))}
            </select>

            <div className="flex gap-1 rounded-lg bg-slate-100 p-1">
               {OPERATIONS.map((op) => (
                  <button
                     key={op.value}
                     onClick={() => setSelectedOperation(op.value)}
                     className={`rounded-md px-3 py-1.5 text-sm transition-all ${
                        selectedOperation === op.value ? "bg-white font-semibold text-green-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                     }`}
                  >
                     {t(op.labelKey)}
                  </button>
               ))}
            </div>
         </div>

         {analyticsLoading && <div className="py-10 text-center text-sm text-slate-400">{t("loadingMasteryData")}</div>}

         {!analyticsLoading && isAllStudents && (
            <div className="space-y-8">
               {activeOps.map((op) => (
                  <div key={op}>
                     {selectedOperation === "all" && (
                        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">{t(OP_DISPLAY_LABEL[op])}</h3>
                     )}

                     <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        {studentRows.map((student) => (
                           <StudentMiniHeatmap
                              key={`${student.student_id}-${op}`}
                              studentName={student.student_name}
                              operation={op}
                              data={student.data.filter((d: any) => d.operation === op)}
                              onSelect={() => setSelectedStudent(student.student_id)}
                           />
                        ))}
                     </div>
                  </div>
               ))}
            </div>
         )}

         {!analyticsLoading && !isAllStudents && (
            <div className={`grid gap-8 ${activeOps.length > 1 ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"}`}>
               {activeOps.map((op) => {
                  const opData: ErrorPair[] = studentRows.flatMap((s) => s.data.filter((d: any) => d.operation === op));

                  return <MasteryHeatmap key={op} data={opData} operation={OP_DISPLAY_LABEL[op]} />;
               })}
            </div>
         )}

         {!analyticsLoading && hasNoData && (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white py-20 text-center">
               <p className="text-slate-400">
                  {selectedStudent === "all"
                     ? t("noDataRecordedYet")
                     : t("studentNoSessionsYet")}
               </p>
            </div>
         )}
      </div>
   );
}
