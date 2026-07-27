import React, { useState, ChangeEvent } from "react";
import { FaTimes } from "react-icons/fa";
import { useAppDispatch } from "store/hooks";
import { editStudent, getStudents } from "store/studentSlice";
import { ISingleStudent } from "types/interfaces";
import { useTranslation } from "react-i18next";

interface EditStudentModalProps {
  student: ISingleStudent;
  setEditStudentModalOpened: (value: string) => void;
}

const EditStudentModal = ({ student, setEditStudentModalOpened }: EditStudentModalProps) => {
  const { t } = useTranslation("teacher");
  const dispatch = useAppDispatch();
  const [editingStudentDetails, setEditingStudentDetails] = useState({
    firstName: student?.firstName,
    lastName: student?.lastName,
    email: student?.email,
    username: student?.username,
  });

  const updateEditingDetails = (e: ChangeEvent<HTMLInputElement>) => {
    setEditingStudentDetails(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmittionOfEditDetails = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = { id: student.id, ...editingStudentDetails };
    await dispatch(editStudent(payload));
    await dispatch(getStudents());
    setEditStudentModalOpened("");
  };

  return (
    <section className="fixed top-0 left-0 z-20 flex h-screen w-full items-center justify-center bg-[rgba(0,0,0,0.4)]">
      <div className="mx-auto w-[90vw] max-w-[350px] rounded-md bg-white p-6 shadow-md">
        <header className="mb-3 flex items-center justify-between">
          <h1 className="font-bold text-mainColor">{t("editStudentDetails")}</h1>
          <span
            className="text-[18px] font-bold text-[darkRed] cursor-pointer"
            onClick={() => setEditStudentModalOpened("")}
          >
            <FaTimes />
          </span>
        </header>
        <form className="flex flex-col gap-y-2" onSubmit={handleSubmittionOfEditDetails}>
          <input
            value={editingStudentDetails.firstName}
            type="text"
            className="w-full border focus:border-mainColor p-3 rounded-md outline-none"
            name="firstName"
            required
            placeholder={t("enterFirstname")}
            onChange={updateEditingDetails}
          />
          <input
            value={editingStudentDetails.lastName}
            type="text"
            className="w-full border focus:border-mainColor p-3 rounded-md outline-none"
            name="lastName"
            required
            placeholder={t("enterLastname")}
            onChange={updateEditingDetails}
          />
          <input
            value={editingStudentDetails.username}
            type="text"
            className="w-full border focus:border-mainColor p-3 rounded-md outline-none"
            name="username"
            required
            placeholder={t("enterUsernameAsterisk")}
            onChange={updateEditingDetails}
          />
          <input
            value={editingStudentDetails.email}
            type="text"
            className="w-full border focus:border-mainColor p-3 rounded-md outline-none"
            name="email"
            required
            placeholder={t("enterEmailAsterisk")}
            onChange={updateEditingDetails}
          />
          <button type="submit" className="mt-3 w-full rounded-md bg-mainColor p-3 text-white active:scale-[0.98]">
             {t("editStudentDetailsBtn")}
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditStudentModal;