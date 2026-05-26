export const formatTime = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }).toLowerCase();
};

export const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

export const computeStats = (answers: any[]) => {
  const correctCount = answers?.filter((a: any) => a.is_correct).length ?? 0;
  const totalCount = answers?.length ?? 0;
  const pct = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
  const perfColor =
    pct >= 80 ? "text-green-600" : pct >= 50 ? "text-yellow-600" : "text-red-600";
  return { correctCount, totalCount, pct, perfColor };
};