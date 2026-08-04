import React, { ChangeEvent, useState } from "react";
import { MdClose } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { closeAddChildModal } from "store/modalSlice";
import { addChild, getChildren, resetChild, resetScreenTime, updateChild } from "store/parentChildSlice";
import { RootState } from "store/store";
import { useTranslation } from "react-i18next";

const AddChildModal = () => {
   const { fullName, codingExperience, dob, password, username } = useSelector((state: RootState) => state.parentChild);
   const [showPassword, setShowPassword] = useState<boolean>(false);
   const { t } = useTranslation("parent");
   const { t: tCommon } = useTranslation("common");

   const dispatch = useDispatch();
   const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(updateChild({ key: e.target.name, value: e.target.value }));
   };

   const addSingleChild = async (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(resetScreenTime());
      const data = await dispatch(addChild());
      await dispatch(getChildren());
      dispatch(closeAddChildModal());
   };

   return (
      <main className="fixed top-0 left-0 z-[6] flex min-h-screen w-full items-center justify-center bg-[rgba(0,0,0,0.5)]">
         <div className="z-20 w-[92vw] max-w-[900px] rounded-md bg-white p-8" data-testid="add-child-modal">
            <header className="flex items-center justify-between">
                <h2 className="text-mainColor text-[1.1rem] font-bold">{t("addChild")}</h2>
               <i
                  className="text-[22px] font-bold text-red-600"
                  onClick={() => {
                     dispatch(closeAddChildModal());
                  }}
               >
                  <MdClose />
               </i>
            </header>
            <form action="" onSubmit={addSingleChild}>
               <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2">
                   <div>
                      <label htmlFor="" className="mb-2 block">
                         {t("fullName")}
                      </label>
                      <input
                         type="text"
                         className={styles.input}
                         name="fullName"
                         placeholder={t("enterChildFullName")}
                         value={fullName}
                         required
                         onChange={onChange}
                      />
                   </div>
                   <div>
                      <label htmlFor="" className="mb-2 block">
                         {t("enterChildUsername").replace("Enter Child's ", "").replace("Enter child's ", "")}
                      </label>
                      <input
                         type="text"
                         className={styles.input}
                         name="username"
                         placeholder={t("enterChildUsername")}
                         value={username}
                         required
                         onChange={onChange}
                      />
                   </div>

                   <div>
                       <label htmlFor="" className="mb-2 block">
                          {tCommon("password")}
                       </label>
                      <div className="relative flex items-center">
                         <input
                            type={showPassword ? "text" : "password"}
                            className={`${styles.input} pr-10`}
                            name="password"
                            placeholder={t("enterChildPassword")}
                            value={password}
                            required
                            onChange={onChange}
                         />
                         <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 text-gray-500 hover:text-gray-700"
                            tabIndex={-1}
                            aria-label={showPassword ? t("hidePassword") : t("showPassword")}
                         >
                            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                         </button>
                      </div>
                   </div>

                   <div>
                       <label htmlFor="" className="mb-2 block">
                          {t("dateOfBirth")}
                       </label>
                      <input
                         type="date"
                         className={styles.input}
                         name="dob"
                         placeholder={t("enterChildDateOfBirth")}
                         value={dob}
                         required
                         onChange={onChange}
                      />
                   </div>
                   <div>
                      <label htmlFor="" className="mb-2 block">
                         {t("experienceLevel")}
                      </label>
                      <select
                         className={styles.input}
                         name="codingExperience"
                         placeholder={t("enterChildDateOfBirth")}
                         value={codingExperience}
                         required
                         onChange={(e) => {
                            const value = e.target.selectedOptions[0].value;
                            dispatch(updateChild({ key: "codingExperience", value }));
                         }}
                      >
                         <option value="" disabled>
                            {t("selectExperience")}
                         </option>
                         <option value="experienced">{tCommon("experienced")}</option>
                         <option value="standard">{tCommon("standard")}</option>
                         <option value="beginner">{tCommon("beginner")}</option>
                         <option value="amateur">{tCommon("amateur")}</option>
                      </select>
                   </div>
                </div>
                <button className={`${styles.input} bg-mainColor mt-4 block w-full text-white`}>{t("addChild")}</button>
            </form>
         </div>
      </main>
   );
};

const styles = {
   input: "w-full rounded-md border-[1.5px] px-4 py-2 placeholder:text-gray-800 outline-0 focus:border-mainColor",
};

export default AddChildModal;