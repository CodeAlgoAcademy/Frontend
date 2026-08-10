import React from "react";
import { useTranslation } from "react-i18next";

type Tab = "active" | "completed" | "archived";

interface TabsSectionProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const tabs: Tab[] = ["active", "completed", "archived"];

const tabLabelKeys: Record<Tab, string> = {
  active: "tabActive",
  completed: "tabCompleted",
  archived: "tabArchived",
};

export default function TabsSection({ activeTab, onTabChange }: TabsSectionProps) {
  const { t } = useTranslation("teacher");
  return (
    <div className="flex gap-1 border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-4 py-2 text-sm font-medium transition-all border-b-2 -mb-px ${
            activeTab === tab 
              ? 'text-gray-900 border-gray-900' 
              : 'text-gray-400 border-transparent hover:text-gray-600'
          }`}
        >
          {t(tabLabelKeys[tab])}
        </button>
      ))}
    </div>
  );
}