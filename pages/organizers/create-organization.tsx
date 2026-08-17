import OrganizerLayout from "@/components/layouts/OrganizerLayout";
import Button from "@/components/UI/Button";
import styles from "@/styles/styles";
import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { addOrganization, fetchOrganiztions } from "services/organizersService";
import { useTranslation } from "react-i18next";

const CreateOrganization = () => {
   const { t } = useTranslation("organizer");
   const [name, setName] = useState<string>("");
   const [invite_code, setInviteCode] = useState<string>("");
   const [description, setDescription] = useState<string>("");

   const dispatch = useDispatch();

   const submit = async (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();

      const data = await dispatch(addOrganization({ name, description, invite_code }));

      if (!data?.error) {
         setName("");
         setInviteCode("");
         setDescription("");
         dispatch(fetchOrganiztions());
      }
   };

   return (
      <OrganizerLayout>
         <form action="" onSubmit={submit}>
            <div className="mt-8">
               <h2 className="text-mainColor text-[1.6rem] font-bold">{t("createOrganization")}</h2>

               <div className="mt-8 grid grid-cols-2 gap-x-[1rem] gap-y-[1.5rem]">
                  <div>
                     <p className="font-500 text-[0.98rem]">{t("name")}</p>
                     <input
                        type="text"
                        placeholder={t("enterOrgName")}
                        className={style.input}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                     />
                  </div>

                  <div>
                     <p className="font-500 text-[0.98rem]">{t("code")}</p>
                     <input
                        type="text"
                        placeholder={t("enterOrgCode")}
                        className={style.input}
                        value={invite_code}
                        onChange={(e) => setInviteCode(e.target.value)}
                        required
                     />
                  </div>

                  <div className="col-span-2">
                     <p className="font-500 text-[0.98rem]">{t("description")}</p>
                     <textarea
                        placeholder={t("enterOrgDescription")}
                        className={style.input + " h-[150px] resize-none"}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                     />
                  </div>
               </div>
            </div>

            <div className="mt-8">
               <button type="submit" className="bg-mainColor ml-auto block w-full max-w-[170px] rounded-md py-2 text-white active:scale-95">
                  {t("submit")}
               </button>
            </div>
         </form>
      </OrganizerLayout>
   );
};

const style = {
   input: `px-3 py-[10px] border-b-[2px] outline-none w-full bg-transparent border-b-[#333] text-[#333] placeholder:text-[#333] focus:border-b-mainColor transition-all duration-300`,
};

export default CreateOrganization;
