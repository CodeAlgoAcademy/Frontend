type ViewMode = "numeric" | "percentage";

function scoreColor(correct: number, total: number) {
  if (total === 0) return { bg: "bg-slate-100", text: "text-slate-500" };
  const pct = correct / total;
  if (pct >= 0.8) return { bg: "bg-green-500", text: "text-white" };
  if (pct >= 0.5) return { bg: "bg-amber-400", text: "text-white" };
  return { bg: "bg-red-500", text: "text-white" };
}

function formatValue(correct: number, total: number, mode: ViewMode): string {
  if (mode === "numeric") return `${correct}/${total}`;
  if (total === 0) return "0%";
  return `${Math.round((correct / total) * 100)}%`;
}

interface ScoreCellProps {
  correct: number;
  total: number;
  viewMode: ViewMode;
}

export function ScoreCell({ correct, total, viewMode, onClick }: ScoreCellProps & { onClick?: () => void }) {
   const { bg, text } = scoreColor(correct, total);
   return (
      <div 
         onClick={onClick}
         className={`${bg} ${text} rounded-md py-1.5 px-1 text-[13px] font-semibold min-w-[52px] text-center cursor-pointer hover:opacity-80 transition-all active:scale-95`}
      >
         {formatValue(correct, total, viewMode)}
      </div>
   );
}