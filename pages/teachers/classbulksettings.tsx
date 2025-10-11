import TeacherLayout from "@/components/layouts/TeacherLayout";
import ClassLevelThresholdBulk from "@/components/Teachers/classlevel/levelthreshold";
import ClassScreenTimeBulk from "@/components/Teachers/classlevel/screentime";
import React, { useState } from "react";

const ClassBulkSettings = () => {
  const [activeTab, setActiveTab] = useState<"level" | "screentime">("level");

  const handleUpdateSuccess = () => {
    console.log("Bulk update successful");
  };

  return (
    <TeacherLayout>
    <div className="p-6">
      <div className="flex space-x-1 mb-8 border-b border-gray-200">
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === "level"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("level")}
        >
          Bulk Level Thresholds
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === "screentime"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("screentime")}
        >
          Bulk Screen Time
        </button>
      </div>
      <div className="flex justify-center">
        {activeTab === "level" && (
          <ClassLevelThresholdBulk onEditSuccess={handleUpdateSuccess} />
        )}
        {activeTab === "screentime" && (
          <ClassScreenTimeBulk />
        )}
      </div>
    </div>
    </TeacherLayout>
  );
};

export default ClassBulkSettings;