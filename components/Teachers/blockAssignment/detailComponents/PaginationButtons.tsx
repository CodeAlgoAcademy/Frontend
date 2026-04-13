interface PaginationButtonsProps {
  onPrev: () => void;
  onNext: () => void;
  isPrevDisabled: boolean;
  isNextDisabled: boolean;
}

export function PaginationButtons({ onPrev, onNext, isPrevDisabled, isNextDisabled }: PaginationButtonsProps) {
  return (
    <div className="flex gap-2">
      <button
        disabled={isPrevDisabled}
        onClick={onPrev}
        className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-xs text-slate-500 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        ◀
      </button>
      <button
        disabled={isNextDisabled}
        onClick={onNext}
        className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-xs text-slate-500 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        ▶
      </button>
    </div>
  );
}