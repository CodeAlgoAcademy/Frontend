import React from "react";

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse">
      <div className="flex justify-between mb-4">
        <div className="h-8 bg-gray-200 rounded w-32"></div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              {[...Array(6)].map((_, i) => (
                <th key={i} className="h-4 bg-gray-200 rounded w-1/6 px-4 py-2"></th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr key={index}>
                {[...Array(6)].map((_, i) => (
                  <td key={i} className="h-4 bg-gray-200 rounded w-full px-4 py-2"></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoadingSkeleton;