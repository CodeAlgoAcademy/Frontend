import { useDebouncedCallback } from "hooks/useDebounce";
import React, { useEffect, useState } from "react";

export interface LevelThresholdInputProps {
  id: number;
  level: number;
  grade: string;
}
interface Props { 
  threshold: LevelThresholdInputProps;
  updateLevelThreshold: (id: number, level: number, grade: string) => void;
   isLoading?: boolean;
}

const LevelThresholdInput = ({ threshold, updateLevelThreshold, isLoading }: Props) => {
  const [inputValue, setInputValue] = useState(threshold.level.toString());
  
  const debouncedUpdate = useDebouncedCallback(updateLevelThreshold, 800);

  useEffect(() => {
    setInputValue(threshold.level.toString());
  }, [threshold.level]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    if (value === '') return;
    
    const numValue = parseInt(value);
    if (!isNaN(numValue)) {
      debouncedUpdate(threshold.id, numValue, threshold.grade);
    }
  };

  const handleBlur = () => {
    debouncedUpdate.flush();
    const numValue = parseInt(inputValue);
    if (isNaN(numValue)) {
      setInputValue(threshold.level.toString());
    }
  };

  return (
    <div className="flex flex-col items-center rounded-md border p-3 shadow-sm w-[140px]">
      <p className="text-sm font-medium">{threshold.grade}</p>
      <input
        type="number"
        className={`mt-2 w-full rounded border px-2 py-1 text-center ${
          isLoading ? 'opacity-50' : ''
        }`}
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        min="1"
        disabled={isLoading}
      />
      <span className="mt-1 text-xs text-gray-400">Max Level Allowed</span>
      {isLoading && (
        <div className="mt-1 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 animate-pulse" />
        </div>
      )}
    </div>
  );
};

export default LevelThresholdInput;