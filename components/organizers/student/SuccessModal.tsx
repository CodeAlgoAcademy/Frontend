import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { closeSuccessModal } from "store/modalSlice";
import { RootState } from "store/store";
import pdf from "../../../public/assets/teachers/pdf.png";
import Image from "next/image";
import { getAccessToken } from "utils/getTokens";
import { useTranslation } from "react-i18next";

interface OrganizerSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  studentId?: string;
  organizationId?: number | string;
}

const OrganizerSuccessModal: React.FC<OrganizerSuccessModalProps> = ({
  isOpen,
  onClose,
  message,
  studentId,
  organizationId,
}) => {
  const { t } = useTranslation("organizer");
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) {
    return <></>;
  }

  const handleDownloadPDF = async () => {
    if (!organizationId) return;

    const accessToken = getAccessToken();
    if (!accessToken) {
      console.error("No access token available");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch(
        `/api/organizers/students/${organizationId}/print-student-logins`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const pdfUrl = window.URL.createObjectURL(blob);

      const newWindow = window.open(pdfUrl, "_blank");
      if (!newWindow) {
        alert(t("allowPopupsForPdf"));
      }

      setTimeout(() => window.URL.revokeObjectURL(pdfUrl), 1000);
      onClose();
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert(t("pdfGenerationFailed"));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadCSV = () => {
    if (!organizationId) return;

    const accessToken = getAccessToken();
    if (!accessToken) {
      console.error("No access token available");
      return;
    }

    const link = document.createElement("a");
    link.href = `${process.env.NEXT_PUBLIC_API_URL || ""}/organization/${organizationId}/users/students/export/csv/`;
    link.setAttribute("download", `organization-${organizationId}-students.csv`);

    const tempLink = document.createElement("a");
    tempLink.href = `/api/organizers/students/${organizationId}/export-csv`;
    tempLink.setAttribute("download", `organization-${organizationId}-students.csv`);

    fetch(`/api/organizers/students/${organizationId}/export-csv`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("CSV download failed");
        return response.blob();
      })
      .then((blob) => {
        const csvUrl = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = csvUrl;
        a.download = `organization-${organizationId}-students.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(csvUrl);
        document.body.removeChild(a);
      })
      .catch((error) => {
        console.error("Error downloading CSV:", error);
        alert(t("csvDownloadFailed"));
      });
  };

  return (
    <main className={styles.modalOverlay}>
      <div className={styles.modal}>
        <header className="mb-6 flex items-center justify-between gap-3">
          <p className="flex-1 text-center text-[1.2rem] font-bold text-mainRed">
            {t("studentAddedSuccessfully")}
          </p>
          <i
            className="cursor-pointer text-[1.5rem] text-red-600"
            onClick={onClose}
          >
            <MdClose />
          </i>
        </header>
        <div>
          <div className="mb-6 text-center">
            <p className="mb-3 text-sm text-gray-600">{message}</p>
            <div className="m-auto h-[120px] w-[120px] p-3">
              <Image src={pdf} alt="pdf" />
            </div>
            <div className="flex flex-col gap-3 m-3">
              <button
                className={
                  styles.pdfButton +
                  " disabled:opacity-60 disabled:cursor-not-allowed"
                }
                onClick={handleDownloadPDF}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    {t("generating")}
                  </span>
                ) : (
                  t("downloadPdfLoginCards")
                )}
              </button>
              <button
                className={styles.csvButton}
                onClick={handleDownloadCSV}
              >
                {t("downloadCsv")}
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              <strong>{t("pdfNoteLabel")}:</strong> {t("pdfNoteText")}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default OrganizerSuccessModal;

const styles = {
  modalOverlay:
    "fixed top-0 left-0 z-[999] flex h-screen w-full items-center justify-center bg-[rgba(0,0,0,0.2)]",
  modal:
    "z-[9] w-[90vw] max-w-[500px] rounded-md bg-white pt-4 pb-7 px-8 shadow-md min-h-fit",
  pdfButton:
    "bg-blue-600 hover:bg-blue-700 text-white py-2 px-2 rounded-md max-w-[300px] w-full m-auto inline-flex items-center justify-center",
  csvButton:
    "bg-green-600 hover:bg-green-700 text-white py-2 px-2 rounded-md max-w-[300px] w-full m-auto inline-flex items-center justify-center",
};
