import React, { useState, ChangeEvent, useEffect } from "react";
import { generateUsername } from "utils/generateUsername";
import { useDispatch, useSelector } from "react-redux";
import { IInputFields, ISingleStudent } from "types/interfaces";
import style from "styles/styles";
import { FaTimes, FaChevronLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { addStudentToOrganizationClass, getOrganizationClasses, getStudentOrganizationUsers } from "services/organizersService";
import GeneratingModal from "./GeneratingModal";
import SuccessModal from "./SuccessModal";
import { RootState } from "store/store";
import { useTranslation } from "react-i18next";

interface OrgClass {
   id: number;
   className: string;
   grade?: string;
   teacher?: {
      firstName: string;
      lastName: string;
   };
}

const AddStudentModal = ({ setIsOpen }: { setIsOpen: (open: boolean) => void }) => {
   const { t } = useTranslation("organizer");
   const dispatch = useDispatch();
   const { selectedOrganization } = useSelector((state: RootState) => state.organizer);
   const [formData, setFormData] = useState<ISingleStudent>({
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      dob: "",
      id: "",
      password: "",
   });
   const [selectedClassId, setSelectedClassId] = useState<number | "">("");
   const [showPassword, setShowPassword] = useState<boolean>(false);
   const [orgClasses, setOrgClasses] = useState<OrgClass[]>([]);
   const [loadingClasses, setLoadingClasses] = useState<boolean>(true);
   const [isGenerating, setIsGenerating] = useState<boolean>(false);
   const [successModalOpen, setSuccessModalOpen] = useState<boolean>(false);
   const [addedStudentId, setAddedStudentId] = useState<string>("");
   const { email, firstName, lastName, username, dob, password } = formData;

   useEffect(() => {
      const fetchClasses = async () => {
         try {
            const result = await dispatch(getOrganizationClasses()).unwrap();
            setOrgClasses(result);
         } catch (error) {
            console.error("Failed to fetch classes:", error);
         } finally {
            setLoadingClasses(false);
         }
      };
      fetchClasses();
   }, [dispatch]);

   const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value,
      }));
   };

   const inputFields: IInputFields[] = [
      {
         type: "text",
         name: "firstName",
         placeholder: t("enterStudentFirstName"),
         value: firstName,
      },
      {
         type: "text",
         name: "lastName",
         placeholder: t("enterStudentLastNameInitial"),
         value: lastName,
      },
      {
         type: "email",
         name: "email",
         placeholder: t("enterStudentEmailPlaceholder"),
         value: email,
      },
      {
         type: "date",
         name: "dob",
         placeholder: t("enterDob"),
         value: dob,
      },
      {
         type: "password",
         name: "password",
         placeholder: t("enterPasswordPlaceholder"),
         value: password,
      },
      {
         type: "text",
         name: "username",
         placeholder: t("enterUsernamePlaceholder"),
         value: username,
      },
   ];

   const onSubmit = async (e: any) => {
      e.preventDefault();

      if (!firstName || !lastName || !selectedClassId) {
         return;
      }

      setIsGenerating(true);

      try {
         const result = await dispatch(
            addStudentToOrganizationClass({
               classId: selectedClassId as number,
               firstName,
               lastName,
               email,
               username,
               password,
               dob,
            })
         ).unwrap();

         setIsOpen(false);
         setAddedStudentId(result?.studentId || "");
         setSuccessModalOpen(true);
         dispatch(getStudentOrganizationUsers() as any);
      } catch (error) {
         console.error("Failed to add student:", error);
      } finally {
         setIsGenerating(false);
      }
   };

   return (
      <>
         <section className={`${style.modalOverlay} bg-[rgba(0,0,0,.25)]`} data-testid="add-student-modal">
            <main className="relative mx-auto flex h-fit max-h-[95vh] w-[90vw] max-w-[900px] overflow-hidden overflow-y-scroll rounded-md bg-white shadow-lg">
               <span
                  onClick={() => setIsOpen(false)}
                  className="absolute top-[30px] right-[30px] z-10 text-[30px] font-thin text-red-600"
               >
                  <FaTimes />
               </span>
               <aside
                  className={`min-h-full flex-[0.075] rounded-tl-md rounded-bl-md`}
                  style={{ backgroundColor: "#FFE977" }}
               ></aside>

               <form className="h-full flex-[0.9] py-8" onSubmit={onSubmit}>
                  <header className="mb-6 flex w-full items-center gap-x-2 px-8 text-mainColor">
                     <span
                        className="text-[20px] font-bold"
                        onClick={() => setIsOpen(false)}
                     >
                        <FaChevronLeft />
                     </span>
                     <h1 className="text-[20px] font-bold md:text-[30px]">{t("addNewStudentTitle")}</h1>
                  </header>

                  <section className="px-8">
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("selectClass")}
                     </label>
                     <select
                        value={selectedClassId}
                        onChange={(e) => setSelectedClassId(Number(e.target.value) || "")}
                        className={`${style.input} w-full`}
                        required
                        disabled={loadingClasses}
                     >
                        <option value="">
                           {loadingClasses ? t("loadingClasses") : t("selectClassPlaceholder")}
                        </option>
                        {orgClasses.map((cls) => (
                           <option key={cls.id} value={cls.id}>
                              {cls.className} - {cls.teacher?.firstName} {cls.teacher?.lastName} ({cls.grade || "N/A"})
                           </option>
                        ))}
                     </select>
                  </section>

                  <section className="grid gap-[1rem] px-8 pt-4 md:grid-cols-2">
                     {inputFields?.map((inputField: IInputFields, index: number) => {
                        const { name, type, placeholder, value } = inputField;

                        if (name === "password") {
                           return (
                              <div key={index} className="relative flex items-center">
                                 <input
                                    type={showPassword ? "text" : "password"}
                                    name={name}
                                    placeholder={placeholder}
                                    value={value}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
                                    className={`${style.input} w-full pr-10`}
                                    required
                                 />
                                 <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-3 text-gray-500 hover:text-gray-700"
                                    tabIndex={-1}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                 >
                                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                 </button>
                              </div>
                           );
                        }

                        return (
                           <input
                              key={index}
                              type={type}
                              name={name}
                              placeholder={placeholder}
                              value={value}
                              onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
                              className={style.input}
                              required={name === "firstName" || name === "lastName"}
                           />
                        );
                     })}
                     <button
                        type="button"
                        className=" rounded-md bg-mainColor px-2 py-3 text-white shadow-md active:scale-[0.91]"
                        onClick={() => {
                           if (firstName || lastName) {
                              const randomName = generateUsername(firstName, lastName);
                              setFormData({ ...formData, username: randomName });
                           }
                        }}
                     >
                        {t("generateUsername")}
                     </button>
                  </section>

                  <section className="flex w-full flex-col items-end justify-between gap-y-4 px-8 pt-6 md:flex-row md:items-center md:gap-y-0">
                     <div></div>
                     <button
                        type="submit"
                        className="min-w-[150px] rounded-[30px] bg-mainColor py-3 px-4 text-[16px] text-white hover:shadow-md"
                        disabled={!selectedClassId || isGenerating}
                     >
                        {isGenerating ? t("processing") : t("addStudentBtn")}
                     </button>
                  </section>
               </form>
            </main>
         </section>
         <GeneratingModal isOpen={isGenerating} message={t("generating")} />
         <SuccessModal
            isOpen={successModalOpen}
            onClose={() => setSuccessModalOpen(false)}
            message={t("studentAddedSuccessfully")}
            studentId={addedStudentId}
            organizationId={selectedOrganization?.id}
         />
      </>
   );
};

export default AddStudentModal;
