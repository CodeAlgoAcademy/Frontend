import { useRef, useEffect, useState } from "react";

type ViewMode = "numeric" | "percentage";

interface LegendAndViewToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export function LegendAndViewToggle({ viewMode, onViewModeChange }: LegendAndViewToggleProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (!showDropdown) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  const legendItems = [
    { color: "bg-slate-300", label: "Not Started" },
    { color: "bg-red-500", label: "Below 50%" },
    { color: "bg-amber-400", label: "50% - 80%" },
    { color: "bg-green-500", label: "Above 80%" },
  ];

  return (
    <div className="flex justify-between items-center mb-5 rounded-lg p-3">
      <div className="flex items-center gap-36 flex-wrap">
        {legendItems.map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <span className={`w-3 h-3 rounded-full ${color} inline-block`} />
            <span className="text-[13px] text-slate-600">{label}</span>
          </div>
        ))}
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2 border border-slate-200 rounded-lg px-3.5 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <span>{viewMode === "numeric" ? "View Numerically" : "View Percentage"}</span>
          <span className="text-slate-400">▾</span>
        </button>

        {showDropdown && (
          <div className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-10 overflow-hidden min-w-[160px]">
            <button
              className={`w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-slate-50 ${
                viewMode === "numeric" ? "text-blue-600 font-semibold bg-blue-50" : "text-slate-600"
              }`}
              onClick={() => { onViewModeChange("numeric"); setShowDropdown(false); }}
            >
              View Numerically
            </button>
            <button
              className={`w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-slate-50 border-t border-slate-100 ${
                viewMode === "percentage" ? "text-blue-600 font-semibold bg-blue-50" : "text-slate-600"
              }`}
              onClick={() => { onViewModeChange("percentage"); setShowDropdown(false); }}
            >
              View Percentage
            </button>
          </div>
        )}
      </div>
    </div>
  );
}