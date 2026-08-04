import React from 'react';

export default function MasteryGrid({ operation, data }: { operation: string, data: any[] }) {
  const range = Array.from({ length: 11 }, (_, i) => i);

  return (
    <div className="bg-white p-4 rounded-xl border">
      <h3 className="font-bold mb-4 capitalize">{operation} Mastery</h3>
      <div className="grid grid-cols-12 gap-1">
        <div className=""></div>
        {range.map(n => <div key={n} className="text-center text-xs font-bold text-gray-400">{n}</div>)}
        
        {range.map(row => (
          <React.Fragment key={row}>
            <div className="text-right pr-2 text-xs font-bold text-gray-400">{row}</div>
            {range.map(col => {
              const gap = data.find(d => d.operand_a === row && d.operand_b === col);
              const color = gap?.errors > 5 ? 'bg-red-400' : gap?.errors > 0 ? 'bg-orange-200' : 'bg-green-100';
              return (
                <div key={col} className={`h-6 w-6 rounded-sm ${color} border border-white group relative`}>
                    <span className="hidden group-hover:block absolute bottom-full bg-black text-white text-[10px] p-1 rounded">
                        {row}x{col}: {gap?.errors || 0} errors
                    </span>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}