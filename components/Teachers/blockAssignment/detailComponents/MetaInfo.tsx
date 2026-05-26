import { format } from "date-fns";

interface MetaInfoProps {
  startDateRaw: string | null;
  questionCount: number;
  studentCount: number;
}

export function MetaInfo({ startDateRaw, questionCount, studentCount }: MetaInfoProps) {
  const startDate = startDateRaw
    ? format(new Date(startDateRaw), "MM/dd/yyyy, hh:mm aa").toUpperCase()
    : "N/A";

  return (
    <div className="flex flex-wrap gap-8 mb-4">
      <div className="flex items-center gap-1.5">
        <span className="text-[13px] text-slate-400">Start Date</span>
        <span className="text-[13px] font-bold text-blue-600">{startDate}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-[13px] text-slate-400">End Date</span>
        <span className="text-[13px] font-bold text-slate-400">N/A</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-[13px] text-slate-400">Parameter</span>
        <span className="text-[13px] font-bold text-blue-600">{questionCount || "All"} Questions</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-[13px] text-slate-400">Progress</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-[13px] text-slate-400">Students</span>
        <span className="text-[13px] font-bold text-blue-600">
          {studentCount} Student{studentCount !== 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
}