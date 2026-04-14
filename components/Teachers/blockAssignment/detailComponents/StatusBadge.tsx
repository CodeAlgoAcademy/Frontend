export function StatusBadge({ status }: { status: string }) {
  if (status === "completed")
    return <span className="text-green-500 text-[11px] font-semibold mt-0.5">✓ Completed</span>;
  if (status === "in_progress")
    return <span className="text-blue-500 text-[11px] font-semibold mt-0.5">🕐 In Progress</span>;
  return <span className="text-slate-400 text-[11px] font-semibold mt-0.5">🕐 Not Started</span>;
}