import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import assignmentServices from "services/block_assignments";
import SkillPickerModal from "./SkillPickerModal";
import StudentPickerModal from "./StudentPickerModal";

const today = () => format(new Date(), "MM/dd/yyyy");

interface SelectedTopic {
   id: number;
   name: string;
}

interface Student {
   id: number;
   name: string;
   username: string;
}

interface NewAssignmentFormProps {
   classId: string | number;
   students: Student[];
   onSuccess: () => void;
   onCancel: () => void;
   editData?: any;
}

export default function NewAssignmentForm({ classId, students, onSuccess, onCancel, editData }: NewAssignmentFormProps) {
   const [questionOrder, setQuestionOrder] = useState<"random" | "in_sequence">(editData?.question_order || "in_sequence");
   const [questionCount, setQuestionCount] = useState(editData?.question_count || 0);
   const [startNow, setStartNow] = useState(true);
   const [scheduledAt, setScheduledAt] = useState("");
   const [showSkillPicker, setShowSkillPicker] = useState(false);
   const [showStudentPicker, setShowStudentPicker] = useState(false);
   const [submitting, setSubmitting] = useState(false);
   const [error, setError] = useState("");
   const [title, setTitle] = useState(editData?.title || today());

   const [selectedTopics, setSelectedTopics] = useState<SelectedTopic[]>(editData?.topics || []);
   const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);

   const removeTopic = (id: number) => setSelectedTopics((p) => p.filter((t) => t.id !== id));

   useEffect(() => {
      if (!editData) return;

      setTitle(editData.title || today());
      setQuestionOrder(editData.question_order || "in_sequence");
      setQuestionCount(editData.question_count || 0);
      setSelectedTopics(editData.topics || []);

      const assignedIdentifiers = new Set((editData.student_records || []).map((r: any) => r.student_id || r.id));
      const assignedUsernames = new Set((editData.student_records || []).map((r: any) => r.username || r.student_username));

      const initialStudents = students.filter((s) => assignedIdentifiers.has(s.id) || assignedUsernames.has(s.username));

      setSelectedStudents(initialStudents);

      setStartNow(editData.status !== "scheduled");
      setScheduledAt(editData.scheduled_at ? new Date(editData.scheduled_at).toISOString().slice(0, 16) : "");
   }, [editData, students]);

   const handleSubmit = async () => {
      if (!title.trim()) return setError("Title is required.");
      if (selectedTopics.length === 0) return setError("Select at least one skill.");
      if (!startNow && !scheduledAt) return setError("Pick a scheduled date.");

      setError("");
      setSubmitting(true);

      const payload = {
         title: title.trim(),
         topic_ids: selectedTopics.map((t) => t.id),
         question_order: questionOrder,
         question_count: questionCount,
         start_now: startNow,
         scheduled_at: startNow ? null : scheduledAt || null,
         student_ids: selectedStudents.map((s) => s.id),
      };

      try {
         if (editData) {
            await assignmentServices.updateAssignment(classId, editData.id, payload);
         } else {
            await assignmentServices.createAssignment(classId, payload);
         }
         onSuccess();
      } catch (err: any) {
         const serverError = err?.response?.data;
         if (serverError?.details && typeof serverError.details[0] === "object") {
            setError(serverError.details[0].message || "A server error occurred.");
         } else {
            setError(serverError?.detail || "Failed to save assignment. Please try again.");
         }
      } finally {
         setSubmitting(false);
      }
   };

   return (
      <>
         {showSkillPicker && (
            <SkillPickerModal
               classId={classId}
               selectedTopics={selectedTopics}
               onClose={() => setShowSkillPicker(false)}
               onConfirm={(topics) => {
                  setSelectedTopics(topics);
                  setShowSkillPicker(false);
               }}
            />
         )}

         {showStudentPicker && (
            <StudentPickerModal
               classId={classId}
               selectedIds={new Set(selectedStudents.map((s) => s.id))}
               onClose={() => setShowStudentPicker(false)}
               onConfirm={(selectedList) => {
                  setSelectedStudents(selectedList);
                  setShowStudentPicker(false);
               }}
            />
         )}

         <div className="mx-auto max-w-[900px] px-5 py-6">
            <div className="mb-4 flex justify-between">
               <button
                  className="cursor-pointer border-none bg-none p-0 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
                  onClick={onCancel}
               >
                  ← Go Back
               </button>
               <button className="cursor-pointer rounded-lg border border-slate-200 bg-none px-3.5 py-1.5 text-[13px] text-slate-600 transition-colors hover:bg-gray-50">
                  🕐 Assignment History
               </button>
            </div>

            <h1 className="mb-7 text-[28px] font-bold text-slate-900">{editData ? "Edit Assignment" : "New Assignment"}</h1>

            <div className="mb-10">
               <label className="mb-2 block text-sm text-slate-600">Assignment title</label>
               <div className="flex max-w-[460px] items-center overflow-hidden rounded-lg border border-slate-200 bg-white">
                  <input
                     className="flex-1 border-none bg-transparent px-3.5 py-3 text-sm text-slate-900 outline-none"
                     value={title}
                     maxLength={40}
                     onChange={(e) => setTitle(e.target.value)}
                  />
                  <span className="px-3.5 text-xs text-slate-400">{title.length}/40</span>
               </div>
            </div>

            <div className="mb-10">
               <div className="mb-3.5 text-lg font-bold text-slate-900">Skill</div>
               {selectedTopics.length > 0 && (
                  <div className="mb-2.5 text-[13px] font-semibold text-blue-600">{selectedTopics.length} skill(s) selected</div>
               )}
               <div className="flex flex-wrap items-center gap-2">
                  {selectedTopics.map((topic) => (
                     <div
                        key={topic.id}
                        className="inline-flex items-center rounded-lg border-[1.5px] border-blue-200 bg-white py-1.5 pl-2.5 pr-0 text-[13px] text-blue-800"
                     >
                        <span className="mr-1.5 text-sm">🎯</span>
                        <span className="max-w-[130px] overflow-hidden text-ellipsis whitespace-nowrap font-medium">{topic.name}</span>
                        <span className="mx-2 text-base text-blue-200">|</span>
                        <button
                           className="cursor-pointer border-none bg-none px-2.5 py-0 text-xs font-bold text-red-500 transition-colors hover:text-red-600"
                           onClick={() => removeTopic(topic.id)}
                        >
                           ✕
                        </button>
                     </div>
                  ))}
                  <button
                     className="inline-flex cursor-pointer items-center rounded-lg border-[1.5px] border-dashed border-slate-300 bg-white px-3.5 py-1.5 text-[13px] font-semibold text-slate-600 transition-colors hover:bg-gray-50"
                     onClick={() => setShowSkillPicker(true)}
                  >
                     <span className="mr-1 text-base">⊕</span> Select Skill(s)
                  </button>
               </div>
            </div>

            <div className="mb-10">
               <div className="mb-3.5 text-lg font-bold text-slate-900">Student(s)</div>
               {selectedStudents.length > 0 && (
                  <div className="mb-2.5 text-[13px] font-semibold text-blue-600">{selectedStudents.length} student(s) selected</div>
               )}
               <div className="flex flex-wrap items-center gap-2">
                  {selectedStudents.map((s) => (
                     <div
                        key={s.id}
                        className="inline-flex items-center rounded-lg border-[1.5px] border-blue-200 bg-white py-1.5 pl-2.5 pr-0 text-[13px] text-blue-800"
                     >
                        <span className="mr-1.5 text-sm">👤</span>
                        <span className="max-w-[130px] overflow-hidden text-ellipsis whitespace-nowrap font-medium">{s.username}</span>
                        <span className="mx-2 text-base text-blue-200">|</span>
                        <button
                           className="cursor-pointer border-none bg-none px-2.5 py-0 text-xs font-bold text-red-500 transition-colors hover:text-red-600"
                           onClick={() => setSelectedStudents((prev) => prev.filter((item) => item.id !== s.id))}
                        >
                           ✕
                        </button>
                     </div>
                  ))}
                  <button
                     className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border-[1.5px] border-dashed border-slate-300 bg-white px-3.5 py-1.5 text-[13px] font-semibold text-slate-600 transition-colors hover:bg-gray-50"
                     onClick={() => setShowStudentPicker(true)}
                  >
                     <span className="mr-1 text-base">⊕</span> Select Student(s)
                  </button>
               </div>
            </div>

            <div className="mb-10">
               <div className="mb-3.5 text-lg font-bold text-slate-900">Parameters</div>
               <div className="mb-5">
                  <div className="mb-2.5 text-sm font-medium text-slate-700">Order of questions</div>
                  <div className="flex gap-6">
                     <label className="flex cursor-pointer items-center text-sm text-slate-700">
                        <input
                           type="radio"
                           name="order"
                           checked={questionOrder === "random"}
                           onChange={() => setQuestionOrder("random")}
                           className="mr-1.5 accent-blue-600"
                        />
                        Random
                     </label>
                     <label className="flex cursor-pointer items-center text-sm text-slate-700">
                        <input
                           type="radio"
                           name="order"
                           checked={questionOrder === "in_sequence"}
                           onChange={() => setQuestionOrder("in_sequence")}
                           className="mr-1.5 accent-blue-600"
                        />
                        In Sequence
                     </label>
                  </div>
               </div>
               <div>
                  <div className="mb-2.5 text-sm font-medium text-slate-700">Number of questions to complete</div>
                  <div className="mt-1 flex items-center gap-3">
                     <input
                        type="number"
                        className="w-[60px] rounded-md border border-slate-200 p-2 text-center text-sm outline-none transition-colors focus:border-blue-600"
                        value={questionCount}
                        min={0}
                        max={100}
                        onChange={(e) => setQuestionCount(Math.max(0, parseInt(e.target.value) || 0))}
                     />
                     <input
                        type="range"
                        min={0}
                        max={100}
                        value={questionCount}
                        onChange={(e) => setQuestionCount(Number(e.target.value))}
                        className="w-full max-w-[500px] flex-1 accent-blue-600"
                     />
                     <span className="min-w-[28px] text-xs text-slate-400">{questionCount === 0 ? "All" : questionCount}</span>
                  </div>
               </div>
            </div>

            <div className="mb-7">
               <div className="mb-3.5 text-lg font-bold text-slate-900">Scheduling</div>
               <div className="flex gap-6">
                  <label className="flex cursor-pointer items-center text-sm text-slate-700">
                     <input type="radio" name="schedule" checked={startNow} onChange={() => setStartNow(true)} className="mr-1.5 accent-blue-600" />
                     Start assignment now
                  </label>
                  <label className="flex cursor-pointer items-center text-sm text-slate-700">
                     <input type="radio" name="schedule" checked={!startNow} onChange={() => setStartNow(false)} className="mr-1.5 accent-blue-600" />
                     Schedule for later date
                  </label>
               </div>
               {!startNow && (
                  <input
                     type="datetime-local"
                     className="mt-3 rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-700 outline-none transition-colors focus:border-blue-600"
                     value={scheduledAt}
                     onChange={(e) => setScheduledAt(e.target.value)}
                  />
               )}
            </div>

            {error && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-600">{error}</div>}

            <div className="flex gap-3 pt-2">
               <button
                  className="cursor-pointer rounded-lg border-[1.5px] border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-gray-50"
                  onClick={onCancel}
               >
                  Cancel
               </button>
               <button
                  className={`cursor-pointer rounded-lg border-none bg-blue-600 px-8 py-2.5 text-sm font-bold text-white transition-all hover:bg-blue-700 active:scale-95 ${
                     submitting ? "cursor-not-allowed opacity-50" : ""
                  }`}
                  disabled={submitting}
                  onClick={handleSubmit}
               >
                  {submitting ? "Saving…" : editData ? "Save Changes" : "Create"}
               </button>
            </div>
         </div>
      </>
   );
}
