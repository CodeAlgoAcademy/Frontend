import React, { useEffect, useState } from "react";

export interface levelThresholdType {
  id: number;
  level: number;
  grade: string;
}
interface Props { 
  threshold: levelThresholdType;
  updateLevelThreshold: (id: number, level: number, grade: string) => void;
}

const LevelThresholdComponent = ({ threshold, updateLevelThreshold }: Props) => {
  const [inputValue, setInputValue] = useState<string>(threshold.level.toString());
  
  useEffect(() => {
    setInputValue(threshold.level.toString());
  }, [threshold.level]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value === '') return;
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 1) {
      updateLevelThreshold(threshold.id, numValue, threshold.grade);
    }
  };

  const handleBlur = () => {
    const numValue = parseInt(inputValue);
    if (isNaN(numValue) || numValue < 1) {
      setInputValue(threshold.level.toString());
    }
  };

  return (
    <div className="flex flex-col items-center rounded-md border p-3 shadow-sm w-[140px]">
      <p className="text-sm font-medium">{threshold.grade}</p>
      <input
        type="number"
        className="mt-2 w-full rounded border px-2 py-1 text-center"
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        min="1"
      />
      <span className="mt-1 text-xs text-gray-400">Max Level Allowed</span>
    </div>
  );
};

export default LevelThresholdComponent;