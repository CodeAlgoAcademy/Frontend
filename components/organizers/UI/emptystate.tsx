import React from "react";
import { useTranslation } from "react-i18next";

interface EmptyStateProps {
  onAddUser: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onAddUser }) => {
  const { t } = useTranslation("organizer");
  return (
    <div className="text-center py-12">
      <div className="text-gray-400 text-6xl mb-4">👥</div>
      <p className="text-gray-500 text-lg mb-2">{t("noUsersFound")}</p>
      <p className="text-gray-400 text-sm mb-6">
        {t("getStartedByAdding")}
      </p>
      <button
        onClick={onAddUser}
        className="px-6 py-2 bg-mainColor text-white rounded-md hover:opacity-90 transition-opacity"
      >
        {t("addYourFirstUser")}
      </button>
    </div>
  );
};

export default EmptyState;