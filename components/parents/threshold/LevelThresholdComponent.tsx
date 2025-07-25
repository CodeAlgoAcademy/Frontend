import React, { useState } from "react";


export interface levelThresholdType {
  id: number;         
  level: number;      
  threshold: number;  
}

interface Props {
  threshold: levelThresholdType;
  updateLevelThreshold: (id: number, level: number, value: number) => void;
}

const LevelThresholdComponent = ({ threshold, updateLevelThreshold }: Props) => {
  const [value, setValue] = useState<number>(threshold.threshold);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = parseInt(e.target.value);
    setValue(newVal);
    updateLevelThreshold(threshold.id, threshold.level, newVal);
  };

  return (
    <div className="flex flex-col items-center rounded-md border p-3 shadow-sm w-[100px]">
      <p className="text-sm font-medium">Level {threshold.level}</p>
      <input
        type="number"
        className="mt-2 w-full rounded border px-2 py-1 text-center"
        value={value}
        onChange={handleChange}
        min={0}
      />
      <span className="mt-1 text-xs text-gray-400">Threshold</span>
    </div>
  );
};

export default LevelThresholdComponent;
