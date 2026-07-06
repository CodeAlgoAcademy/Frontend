import React from "react";

interface ErrorPair {
   operand_a: number;
   operand_b: number;
   total: number;
   errors: number;
}

interface Props {
   studentName: string;
   operation: string;
   data: ErrorPair[];
   onSelect: () => void;
}

const RANGE = Array.from({ length: 11 }, (_, i) => i);

const OP_SYMBOL: Record<string, string> = {
   multiply: "×",
   add: "+",
   subtract: "−",
   divide: "÷",
};

function getAccuracy(cell: ErrorPair): number {
   if (cell.total === 0) return 0;
   return ((cell.total - cell.errors) / cell.total) * 100;
}

function getCellClasses(cell: ErrorPair | undefined): string {
   const base = "text-center rounded-sm px-0.5 py-px";
   if (!cell || cell.total === 0) return `${base} bg-gray-100 text-gray-400`;
   const acc = getAccuracy(cell);
   if (acc >= 90) return `${base} bg-green-500 text-white`;
   if (acc >= 70) return `${base} bg-yellow-300 text-yellow-900`;
   if (acc >= 50) return `${base} bg-orange-400 text-white`;
   return `${base} bg-red-500 text-white`;
}

function getResult(op: string, a: number, b: number): string {
   if (op === "multiply") return String(a * b);
   if (op === "add") return String(a + b);
   if (op === "subtract") return String(a - b);
   if (op === "divide") return b !== 0 ? String(Math.round((a / b) * 10) / 10) : "—";
   return "";
}

export default function StudentMiniHeatmap({ studentName, operation, data, onSelect }: Props) {
   const symbol = OP_SYMBOL[operation] ?? operation;

   const cellMap: Record<string, ErrorPair> = {};
   data.forEach((d) => {
      cellMap[`${d.operand_a}_${d.operand_b}`] = d;
   });

   return (
      <div
         className="cursor-pointer rounded-xl border border-slate-200 bg-white p-3 transition-all hover:border-green-400 hover:shadow-md"
         onClick={onSelect}
      >
         <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-700">{studentName}</span>
            <span className="text-xs text-slate-400 hover:text-green-600">View detail →</span>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[8.5px]">
               <thead>
                  <tr>
                     <th className="w-4 pr-1 text-right font-bold text-slate-400">{symbol}</th>
                     {RANGE.map((n) => (
                        <th key={n} className="px-0.5 text-center font-bold text-slate-400">
                           {n}
                        </th>
                     ))}
                  </tr>
               </thead>
               <tbody>
                  {RANGE.map((row) => (
                     <tr key={row}>
                        <td className="pr-1 text-right font-bold leading-tight text-slate-400">{row}</td>
                        {RANGE.map((col) => {
                           const cell = cellMap[`${row}_${col}`];
                           const result = getResult(operation, row, col);
                           const acc =
                              cell && cell.total > 0
                                 ? Math.round(getAccuracy(cell)) + "% accuracy · " + cell.total + " attempt" + (cell.total !== 1 ? "s" : "")
                                 : "not attempted";

                           return (
                              <td key={col} className={getCellClasses(cell)} title={`${row}${symbol}${col}=${result} · ${acc}`}>
                                 {row}
                                 {symbol}
                                 {col}={result}
                              </td>
                           );
                        })}
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
}
