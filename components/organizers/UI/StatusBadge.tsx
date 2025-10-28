import React from "react";

interface StatusBadgeProps {
  status?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const isActive = status?.toLowerCase() === 'active';
  
  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
      isActive 
        ? 'bg-green-100 text-green-800' 
        : 'bg-gray-100 text-gray-800'
    }`}>
      {status}
    </span>
  );
};

export default StatusBadge;