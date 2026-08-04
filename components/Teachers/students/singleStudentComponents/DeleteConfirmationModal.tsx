import React from "react";
import { ISingleStudent } from "types/interfaces";
import { useTranslation } from "react-i18next";

interface DeleteConfirmationModalProps {
  student: ISingleStudent;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
}

const DeleteConfirmationModal = ({
  student,
  onCancel,
  onConfirm,
}: DeleteConfirmationModalProps) => {
  const { t } = useTranslation("teacher");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <p className="mb-4 text-sm">
          {t("areYouSureDelete")}{" "}
          <span className="font-semibold">
            {student.firstName} {student.lastName}
          </span>
          ?
        </p>
        <div className="flex justify-end space-x-2">
          <button
            className="rounded bg-gray-300 px-4 py-2"
            onClick={onCancel}
          >
            {t("cancel")}
          </button>
          <button
            className="rounded bg-red-600 px-4 py-2 text-white"
            onClick={onConfirm}
          >
            {t("deleteStudent")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;