import React from "react";
import { FaSpinner } from "react-icons/fa";
import { useTranslation } from "react-i18next";

interface GeneratingModalProps {
  isOpen: boolean;
  message?: string;
  onClose?: () => void;
}

const GeneratingModal: React.FC<GeneratingModalProps> = ({
  isOpen,
  message,
}) => {
  const { t } = useTranslation("organizer");

  if (!isOpen) {
    return <></>;
  }

  return (
    <section className="fixed top-0 left-0 z-[90] flex h-screen w-[100vw] flex-col items-center justify-center gap-y-4 bg-[rgba(0,0,0,0.5)]">
      <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {message || t("generating")}
        </h2>
        <div className="flex flex-col items-center justify-center">
          <p className="text-gray-600 mb-2">
            {t("pleaseWaitDescription")}
          </p>
          <FaSpinner className="animate-spin text-3xl text-blue-600 mb-4" />
        </div>
      </div>
    </section>
  );
};

export default GeneratingModal;
