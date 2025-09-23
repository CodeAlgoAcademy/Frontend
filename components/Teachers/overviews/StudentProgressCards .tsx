import { StudentProgress } from "types/interfaces/student.interface";

interface StudentProgressCardsProps {
   students: StudentProgress[];
}

export const StudentProgressCards = ({ students }: StudentProgressCardsProps) => {
   return (
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
         {students.map((student) => (
            <div key={student.student_id} className="rounded-xl bg-white p-5 shadow-md">
               <h3 className="mb-3 text-lg font-bold text-gray-800">{student.student_name}</h3>

               <div className="mb-4">
                  <div className="mb-1 flex items-center justify-between">
                     <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                     <span className="text-sm font-bold text-gray-700">{Math.round(student.overall_progress)}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200">
                     <div className="h-2 rounded-full bg-blue-500" style={{ width: `${student.overall_progress}%` }}></div>
                  </div>
               </div>

               <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-lg bg-green-50 p-3">
                     <div className="text-2xl font-bold text-green-700">{student.completed_count}</div>
                     <div className="text-xs text-green-600">Completed</div>
                  </div>
                  <div className="rounded-lg bg-yellow-50 p-3">
                     <div className="text-2xl font-bold text-yellow-700">{student.in_progress_count}</div>
                     <div className="text-xs text-yellow-600">In Progress</div>
                  </div>
                  <div className="rounded-lg bg-red-50 p-3">
                     <div className="text-2xl font-bold text-red-700">{student.not_started_count}</div>
                     <div className="text-xs text-red-600">Not Started</div>
                  </div>
               </div>

               <div className="mt-4 border-t border-gray-100 pt-3">
                  <h4 className="mb-1 text-sm font-medium text-gray-700">Current Level</h4>
                  <div className="flex items-center justify-between ">
                  <div className="text-sm text-gray-600">{student?.current_level?.level || "No active level"}</div>
                  <div className="mt-1 text-xs text-gray-500">
                    {student?.current_level?.status ? (
                      <>
                      <span className="font-medium capitalize">{student?.current_level?.status.replace("_", " ")}</span>
                      </>):
                      (<></>)}
                  </div>
                  </div>
               </div>
               {/* )} */}
            </div>
         ))}
      </div>
   );
};
