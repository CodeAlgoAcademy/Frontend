import { LinearProgress } from "@mui/material";
import React from "react";

const StudentTable = ({ details }: { details: object[] }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.headingRow}>
          <th className={styles.headingColumn}>Lesson</th>
          <th className={styles.headingColumn}>Progress</th>
          <th className={styles.headingColumn}>Assignment</th>
          <th className={styles.headingColumn}>Status</th>
          <th className={styles.headingColumn}>Due Date</th>
        </tr>
      </thead>
      <tbody className="p-3">
        {details?.map((course: any, index: number) => (
          <tr key={index} className={styles.bodyRow}>
            <td className={styles.bodyColumn}>{course.unit}</td>

            <td className={styles.progress}>
              <LinearProgress
                variant="determinate"
                value={+course.progress}
                sx={{ borderRadius: 5 }}
                color="success"
              />
              <p>0%</p>
            </td>
            <td>
              <td className={styles.assignment}>
                <LinearProgress
                  variant="determinate"
                  value={+course.title}
                  sx={{ borderRadius: 5 }}
                  color="success"
                />
                <p>{course.title}%</p>
              </td>
            </td>

            <td className={styles.bodyColumn}>{course.status}</td>
            <td className={styles.bodyColumn}>{course.end_date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentTable;

const styles = {
  table: "table-auto w-full",
  headingRow: "p-4 text-left text-sm",
  headingColumn: "font-medium p-4",
  bodyRow: "even:bg-slate-100 odd:bg-white p-2  overflow-x-scroll",
  bodyColumn: "py-3 px-2 text-xs capitalize",
  progress: "py-3 px-2 text-[11px] grid grid-cols-2 items-center space-x-3",
  assignment: "py-3 px-2 text-[11px] grid grid-cols-2 items-center space-x-3",
};
