   import { LinearProgress } from "@mui/material";
   import React from "react";
   import { AssignmentDetails, IChildProgress, IChildTopics, ISingleStudent } from "types/interfaces";

   interface StudentTableProps {
      details?: AssignmentDetails[];
      student: ISingleStudent;
      progress: IChildTopics;
   }

   const StudentTable = ({ details, student, progress }: StudentTableProps) => {
      return (
         <div className="max-h-[300px] w-full overflow-x-scroll overflow-y-scroll md:max-h-fit">
            <header className="flex items-center gap-x-2 px-[17px] pt-3" data-testid="student-table">
               <p className="text-[14px]">
                  <span className="font-bold">Email: </span> {student.email}
               </p>
               <p className="text-[14px]">
                  <span className="font-bold">Username: </span> {student.username}
               </p>
            </header>
            <div className="max-h-[200px] overflow-y-scroll">
               <table className={styles.table}>
                  {/* <thead>
                     <tr className={styles.headingRow}>
                        <th className={styles.headingColumn}>Level</th>
                        <th className={styles.headingColumn}>Lesson</th>
                        <th className={styles.headingColumn}>Progress</th>
                     </tr>
                  </thead> */}
                  <thead>
                     <tr className={styles.headingRow}>
                        <th className={styles.headingColumn}>Standard Name</th>
                        <th className={styles.headingColumn}>Standard Code</th>
                        <th className={styles.headingColumn}>Progress</th>
                     </tr>
                  </thead>

                  <tbody className="p-3">
   {progress?.topic
   ?.slice() // makes a shallow copy
   .sort((a: IChildProgress, b: IChildProgress) => a.level - b.level)
   ?.map((course: IChildProgress, index: number) => (
      <tr key={index} className={styles.bodyRow}>
         <td className={styles.bodyColumn}>{course?.standard_name}</td>
         <td className={styles.bodyColumn}>
         <p>{course?.title || course?.standard_code}</p>
         </td>
         <td className={styles.progress}>
         <LinearProgress
            variant="determinate"
            value={course?.progress * 100}
            sx={{ borderRadius: 5 }}
            color="success"
         />
         <p>{course?.progress * 100}%</p>
         </td>
      </tr>
   ))}
   </tbody>

                  {/* <tbody className="p-3">
                     {progress?.topic
                        ?.sort((a: IChildProgress, b: IChildProgress) => a.level - b.level)
                        ?.map((course: IChildProgress, index: number) => (
                           <tr className={styles.bodyRow}>
                              <td className={styles.bodyColumn}>{course?.level}</td>

                              <td className={styles.bodyColumn}>
                                 <p>{course?.title}</p>
                              </td>

                              <td className={styles.progress}>
                                 <LinearProgress variant="determinate" value={course?.progress * 100} sx={{ borderRadius: 5 }} color="success" />
                                 <p>{course?.progress * 100}%</p>
                              </td>
                           </tr>
                        ))}
                  </tbody> */}
               </table>
            </div>
         </div>
      );
   };

   export default StudentTable;

   const styles = {
      table: "table-auto w-full",
      headingRow: "p-4 text-left text-sm",
      headingColumn: "font-medium p-4 ",
      bodyRow: "even:bg-slate-100 odd:bg-white p-2  overflow-x-scroll",
      bodyColumn: "py-3 px-4 font-medium text-sm capitalize ",
      progress: "py-3 px-2 text-[11px] grid grid-cols-2 items-center space-x-3",
      assignment: "py-3 px-2 text-[11px] grid grid-cols-2 items-center space-x-3 text-center",
   };
