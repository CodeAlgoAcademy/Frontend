import React from "react";

interface ErrorPair {
  operand_a: number;
  operand_b: number;
  total: number;
  errors: number;
}

interface Props {
  data: ErrorPair[];
  operation: string;
}

const LEGEND = [
  { label: "Mastered (90–100%)",  bg: "bg-green-500" },
  { label: "Improving (70–89%)",  bg: "bg-yellow-300" },
  { label: "Struggling (50–69%)", bg: "bg-orange-400" },
  { label: "Critical Gap (<50%)", bg: "bg-red-500" },
  { label: "Not Attempted",       bg: "bg-gray-200" },
];

const RANGE = Array.from({ length: 11 }, (_, i) => i);

function getAccuracy(cell: ErrorPair): number {
  if (cell.total === 0) return 0;
  return ((cell.total - cell.errors) / cell.total) * 100;
}

function getColorClass(cell: ErrorPair | undefined): string {
  if (!cell || cell.total === 0) return "bg-gray-200";
  const acc = getAccuracy(cell);
  if (acc >= 90) return "bg-green-500";
  if (acc >= 70) return "bg-yellow-300";
  if (acc >= 50) return "bg-orange-400";
  return "bg-red-500";
}

function getOperatorSymbol(operation: string): string {
  const op = operation.toLowerCase();
  if (op === "multiplication") return "×";
  if (op === "addition") return "+";
  if (op === "subtraction") return "−";
  if (op === "division") return "÷";
  return "+";
}

export default function MasteryHeatmap({ data, operation }: Props) {
  const symbol = getOperatorSymbol(operation);

  const cellMap: Record<string, ErrorPair> = {};
  data.forEach((d) => {
    cellMap[`${d.operand_a}_${d.operand_b}`] = d;
  });

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200">
      <h3 className="font-semibold text-slate-700 mb-4 capitalize">
        {operation} Mastery Heatmap
      </h3>

      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: `auto repeat(11, 1fr)` }}
      >
        <div className="text-right pr-2 text-xs font-bold text-gray-400">
          {symbol}
        </div>
        {RANGE.map((n) => (
          <div key={n} className="text-center text-xs font-bold text-gray-400">
            {n}
          </div>
        ))}

        {RANGE.map((row) => (
          <React.Fragment key={row}>
            <div className="text-right pr-2 text-xs font-bold text-gray-400 leading-6">
              {row}
            </div>
            {RANGE.map((col) => {
              const cell = cellMap[`${row}_${col}`];
              const accuracy = cell ? Math.round(getAccuracy(cell)) : null;
              const attempts = cell?.total ?? 0;

              return (
                <div
                  key={col}
                  className={`h-6 w-full rounded-sm ${getColorClass(cell)} border border-white group relative`}
                >
                  <span className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-10 pointer-events-none">
                    {row} {symbol} {col}
                    {cell
                      ? ` · ${accuracy}% accuracy · ${attempts} attempt${attempts !== 1 ? "s" : ""}`
                      : " · not attempted"}
                  </span>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        {LEGEND.map(({ label, bg }) => (
          <div key={label} className="flex items-center gap-1.5 text-xs text-gray-500">
            <div className={`h-3 w-3 rounded-sm ${bg}`} />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}