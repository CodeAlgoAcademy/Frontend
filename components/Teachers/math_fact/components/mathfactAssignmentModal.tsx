import React, { useEffect, useState } from "react";
import mathFactsService from "services/mathfact";
import studentService from "services/studentService";
import { MathFactSet, MathFactAssignmentDetail, CreateAssignmentPayload } from "types/interfaces/mathfact";

interface Student {
   id: number;
   name: string;
   username: string;
}

interface ModalProps {
   classId: string | number;
   isOpen: boolean;
   isEditing: boolean;
   assignmentData?: {
      studentId: number | null;
      studentName: string;
      assignments: MathFactAssignmentDetail[];
   };
   onClose: () => void;
   onSuccess: () => void;
}

export default function MathFactAssignModal({ classId, isOpen, isEditing, assignmentData, onClose, onSuccess }: ModalProps) {
   const [step, setStep] = useState(1);
   const [factSets, setFactSets] = useState<MathFactSet[]>([]);
   const [localStudents, setLocalStudents] = useState<Student[]>([]);

   // Selection States
   const [selectedFactSetIds, setSelectedFactSetIds] = useState<number[]>([]);
   const [isAdaptive, setIsAdaptive] = useState(false);
   const [isTurningOff, setIsTurningOff] = useState(false);

   // Form States
   const [selectedStudentIds, setSelectedStudentIds] = useState<number[]>([]);
   const [questionCount, setQuestionCount] = useState(20);
   const [timeLimit, setTimeLimit] = useState<number | null>(null);
   const [targetAccuracy, setTargetAccuracy] = useState(0.9);
   const [targetAvgTime, setTargetAvgTime] = useState(5.0);

   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const isBulk = assignmentData?.studentId === -1;

   useEffect(() => {
      if (isOpen) {
         loadFactSets();
         fetchStudents();
         setStep(isBulk ? 1 : 2);

         if (!isBulk && assignmentData?.studentId) {
            setSelectedStudentIds([Number(assignmentData.studentId)]);
         }

         if (assignmentData?.assignments && assignmentData.assignments.length > 0) {
            const data = assignmentData.assignments[0];
            setSelectedFactSetIds(assignmentData.assignments.map((a) => a.fact_set.id));
            setQuestionCount(data.question_count);
            setTimeLimit(data.time_limit_seconds);
            setTargetAccuracy(data.target_accuracy);
            setTargetAvgTime(data.target_avg_time);
         } else {
            resetFormFields();
         }
      }
   }, [isOpen, assignmentData]);

   const resetFormFields = () => {
      setSelectedFactSetIds([]);
      setIsAdaptive(false);
      setIsTurningOff(false);
      setQuestionCount(20);
      setTimeLimit(null);
      setTargetAccuracy(0.9);
      setTargetAvgTime(5.0);
   };

   const fetchStudents = async () => {
      try {
         const response = await studentService.getStudents(String(classId));
         const rawList = response.students || response;
         if (Array.isArray(rawList)) {
            setLocalStudents(
               rawList.map((s: any) => ({
                  id: Number(s.student_id ?? s.id),
                  name: `${s.firstName || ""} ${s.lastName || ""}`.trim(),
                  username: s.username || "",
               }))
            );
         }
      } catch (err) {
         console.error(err);
      }
   };

   const loadFactSets = async () => {
      try {
         const data = await mathFactsService.getFactSets(classId);
         setFactSets(data);
      } catch (err) {
         setError("Failed to load sets");
      }
   };

   const toggleFactSet = (id: number) => {
      if (isAdaptive || isTurningOff) return;
      setSelectedFactSetIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
   };

   const handleSubmit = async () => {
      setLoading(true);
      setError(null);

      try {
         // ─── TURN OFF LOGIC (DELETE) ──────────────────────────────────────────
         // ─── TURN OFF LOGIC ──────────────────────────────────────────
         if (isTurningOff) {
            if (selectedStudentIds.length === 0) {
               setError("Please select at least one student.");
               setLoading(false);
               return;
            }

            const allSummaries = await mathFactsService.getAssignments(classId);
            if (!allSummaries || allSummaries.length === 0) {
               onSuccess();
               return;
            }

            const targetIds = selectedStudentIds.map(Number);

            // 1. Fetch full detail for every assignment (parallel)
            const detailedAssignments = await Promise.all(allSummaries.map((a) => mathFactsService.getAssignment(classId, a.id)));

            const updatePromises: Promise<MathFactAssignmentDetail | void>[] = [];

            for (const detail of detailedAssignments) {
               // Which selected students are currently in this assignment?
               const existingStudentIds: number[] = detail.student_records.map((r) => r.student_id);

               const affected = targetIds.some((sid) => existingStudentIds.includes(sid));
               if (!affected) continue; // assignment not linked to selected students

               // New list = all current students EXCEPT the ones being turned off
               const remainingStudentIds = existingStudentIds.filter((sid) => !targetIds.includes(sid));

               if (remainingStudentIds.length === 0) {
                  // No students left → delete the whole assignment
                  updatePromises.push(mathFactsService.deleteAssignment(classId, detail.id).then(() => undefined));
               } else {
                  // Update the assignment with the reduced list
                  updatePromises.push(
                     mathFactsService.updateAssignment(classId, detail.id, {
                        student_ids: remainingStudentIds,
                     })
                  );
               }
            }

            await Promise.all(updatePromises);
            onSuccess();
            return;
         }

         // ─── CREATE / UPDATE LOGIC ─────────────────────────────────────────────
         const factSetIds = isAdaptive ? factSets.map((f) => f.id) : selectedFactSetIds;

         if (factSetIds.length === 0 && !isEditing) {
            setError("Please select at least one operation set.");
            setLoading(false);
            return;
         }

         const studentIds = selectedStudentIds.length > 0 ? selectedStudentIds.map((id) => Number(id)) : undefined;

         if (isEditing && assignmentData?.assignments && !isBulk) {
            for (const assignment of assignmentData.assignments) {
               const payload: Partial<CreateAssignmentPayload> = {
                  fact_set: assignment.fact_set.id,
                  question_count: questionCount,
                  time_limit_seconds: timeLimit,
                  target_accuracy: targetAccuracy,
                  target_avg_time: targetAvgTime,
                  student_ids: studentIds,
               };
               await mathFactsService.updateAssignment(classId, assignment.id, payload);
            }
         } else {
            for (const factSetId of factSetIds) {
               const payload: CreateAssignmentPayload = {
                  fact_set: factSetId,
                  question_count: questionCount,
                  time_limit_seconds: timeLimit,
                  target_accuracy: targetAccuracy,
                  target_avg_time: targetAvgTime,
                  student_ids: studentIds,
                  status: "active",
               };
               await mathFactsService.createAssignment(classId, payload);
            }
         }

         onSuccess();
      } catch (err: any) {
         setError(err.response?.data?.detail || "Submission failed.");
      } finally {
         setLoading(false);
      }
   };

   if (!isOpen) return null;

   const isLastStep = step === 3 || (step === 2 && isTurningOff);

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
         <div className="flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
            {/* Header */}
            <div className="border-b border-gray-100 bg-white px-8 py-6">
               <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-800">
                     Edit Math Facts for {isBulk ? "Multiple Students" : assignmentData?.studentName}
                  </h2>
                  <button onClick={onClose} className="text-2xl text-gray-400 hover:text-gray-600">
                     ×
                  </button>
               </div>

               {/* Stepper */}
               <div className="flex items-center justify-center py-2">
                  <div className="flex w-full max-w-xs items-center">
                     {isBulk && (
                        <>
                           <div
                              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                                 step >= 1 ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-400"
                              }`}
                           >
                              1
                           </div>
                           <div className="mx-2 h-1 flex-1 bg-gray-100">
                              <div className={`h-full bg-blue-500 transition-all ${step > 1 ? "w-full" : "w-0"}`}></div>
                           </div>
                        </>
                     )}
                     <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                           step >= 2 ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-400"
                        }`}
                     >
                        {isBulk ? "2" : "1"}
                     </div>
                     <div className="mx-2 h-1 flex-1 bg-gray-100">
                        <div className={`h-full bg-blue-500 transition-all ${step > 2 ? "w-full" : "w-0"}`}></div>
                     </div>
                     <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                           step >= 3 ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-400"
                        }`}
                     >
                        {isBulk ? "3" : "2"}
                     </div>
                  </div>
               </div>
            </div>

            <div className="flex-1 overflow-y-auto bg-slate-50/30 p-8">
               {step === 1 && (
                  <div className="space-y-4">
                     <label className="text-sm font-bold text-slate-700">Select Students:</label>
                     <div className="max-h-60 divide-y overflow-y-auto rounded-2xl border bg-white shadow-sm">
                        {localStudents.map((s) => (
                           <label key={s.id} className="flex cursor-pointer items-center gap-3 p-4 transition-colors hover:bg-blue-50">
                              <input
                                 type="checkbox"
                                 checked={selectedStudentIds.includes(s.id)}
                                 onChange={() => setSelectedStudentIds((p) => (p.includes(s.id) ? p.filter((i) => i !== s.id) : [...p, s.id]))}
                                 className="h-5 w-5 rounded accent-blue-600"
                              />
                              <span className="text-sm font-semibold text-slate-700">{s.name}</span>
                           </label>
                        ))}
                     </div>
                  </div>
               )}

               {step === 2 && (
                  <div className="space-y-6">
                     <div className="flex items-end justify-between border-b border-slate-100 pb-2">
                        <label className="text-sm font-bold uppercase tracking-tight text-slate-800">Set Operations:</label>
                        <div className="flex gap-4">
                           <button
                              type="button"
                              onClick={() => setSelectedFactSetIds(factSets.map((f) => f.id))}
                              className="text-xs font-bold text-blue-600 hover:underline"
                           >
                              Select All
                           </button>
                           <button
                              type="button"
                              onClick={() => setSelectedFactSetIds([])}
                              className="text-xs font-bold text-blue-600 hover:underline"
                           >
                              Select None
                           </button>
                        </div>
                     </div>

                     <div className="space-y-2">
                        {factSets.map((fs) => (
                           <label
                              key={fs.id}
                              className={`flex cursor-pointer items-center justify-between rounded-2xl border bg-white p-4 transition-all ${
                                 selectedFactSetIds.includes(fs.id) ? "border-blue-500 ring-4 ring-blue-50" : "border-gray-200"
                              } ${isAdaptive || isTurningOff ? "cursor-not-allowed opacity-50 grayscale" : ""}`}
                           >
                              <div className="flex items-center gap-3">
                                 <input
                                    type="checkbox"
                                    disabled={isAdaptive || isTurningOff}
                                    checked={selectedFactSetIds.includes(fs.id)}
                                    onChange={() => toggleFactSet(fs.id)}
                                    className="h-5 w-5 accent-blue-600"
                                 />
                                 <span className="text-sm font-bold text-slate-700">
                                    {fs.name} ({fs.operation_display})
                                 </span>
                              </div>
                              <span className="rounded bg-slate-50 px-2 py-1 font-mono text-xs text-slate-400">
                                 x {fs.operation === "add" ? "+" : "*"} y
                              </span>
                           </label>
                        ))}
                     </div>

                     <div className="text-center text-lg font-bold text-slate-300">OR</div>

                     <div className="space-y-3 border-t border-slate-100 pt-4">
                        <label
                           className={`flex cursor-pointer items-center gap-3 rounded-2xl border bg-white p-4 transition-all ${
                              isAdaptive ? "border-blue-500 bg-blue-50" : ""
                           }`}
                        >
                           <input
                              type="checkbox"
                              checked={isAdaptive}
                              onChange={() => {
                                 setIsAdaptive(!isAdaptive);
                                 setIsTurningOff(false);
                                 if (!isAdaptive) setSelectedFactSetIds([]);
                              }}
                              className="h-5 w-5 accent-blue-600"
                           />
                           <span className="text-sm font-bold text-slate-700">Adaptive math facts ✨</span>
                        </label>

                        <label
                           className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition-all ${
                              isTurningOff ? "border-red-500 bg-red-50" : "border-gray-200 bg-white"
                           }`}
                        >
                           <input
                              type="checkbox"
                              checked={isTurningOff}
                              onChange={() => {
                                 setIsTurningOff(!isTurningOff);
                                 setIsAdaptive(false);
                                 if (!isTurningOff) setSelectedFactSetIds([]);
                              }}
                              className="h-5 w-5 accent-red-600"
                           />
                           <span className={`text-sm font-bold ${isTurningOff ? "text-red-600" : "text-slate-700"}`}>
                              Turn off math facts (Clear assignments)
                           </span>
                        </label>
                     </div>
                  </div>
               )}

               {step === 3 && (
                  <div className="space-y-8 py-4">
                     <div className="space-y-6 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                        <div>
                           <div className="mb-3 flex justify-between text-xs font-bold uppercase text-slate-500">
                              Problems per session: {questionCount}
                           </div>
                           <input
                              type="range"
                              min="5"
                              max="50"
                              step="5"
                              value={questionCount}
                              onChange={(e) => setQuestionCount(Number(e.target.value))}
                              className="w-full accent-blue-500"
                           />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-1">
                              <label className="text-[10px] font-black uppercase text-slate-400">Min. Accuracy (%)</label>
                              <input
                                 type="number"
                                 value={targetAccuracy * 100}
                                 onChange={(e) => setTargetAccuracy(Number(e.target.value) / 100)}
                                 className="w-full rounded-xl border border-slate-100 bg-slate-50 p-3 font-bold text-blue-600 outline-none"
                              />
                           </div>
                           <div className="space-y-1">
                              <label className="text-[10px] font-black uppercase text-slate-400">Max. Time (sec)</label>
                              <input
                                 type="number"
                                 value={targetAvgTime}
                                 onChange={(e) => setTargetAvgTime(Number(e.target.value))}
                                 className="w-full rounded-xl border border-slate-100 bg-slate-50 p-3 font-bold text-blue-600 outline-none"
                              />
                           </div>
                        </div>
                     </div>
                  </div>
               )}
            </div>

            {/* Error Message */}
            {error && (
               <div className="border-t border-red-100 bg-red-50 px-8 py-3">
                  <p className="text-xs font-semibold text-red-600">{error}</p>
               </div>
            )}

            {/* Footer Buttons */}
            <div className="flex gap-4 border-t border-slate-100 bg-white p-8">
               <button
                  type="button"
                  onClick={() => (step === (isBulk ? 1 : 2) ? onClose() : setStep((s) => s - 1))}
                  className="flex-1 rounded-2xl border border-slate-200 py-3 text-sm font-bold text-slate-400 transition-all hover:bg-slate-50"
               >
                  {step === (isBulk ? 1 : 2) ? "Cancel" : "Back"}
               </button>

               <button
                  type="button"
                  disabled={
                     loading ||
                     (step === 1 && selectedStudentIds.length === 0) ||
                     (step === 2 && !isAdaptive && !isTurningOff && selectedFactSetIds.length === 0)
                  }
                  onClick={() => {
                     if (isLastStep) handleSubmit();
                     else setStep((s) => s + 1);
                  }}
                  className={`flex-[2] rounded-2xl py-3 text-sm font-black text-white shadow-xl transition-all disabled:opacity-50 ${
                     isTurningOff ? "bg-red-500 shadow-red-100" : "bg-blue-600 shadow-blue-100 hover:scale-[1.01]"
                  }`}
               >
                  {loading ? "Processing..." : isLastStep ? "Finish Editing" : "Next Step"}
               </button>
            </div>
         </div>
      </div>
   );
}
