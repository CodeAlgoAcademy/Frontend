import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { createLicense, getAllLicenses } from "services/organizersService";
import ContentBox from "../parents/UI/ContentBox";
import { useTranslation } from "react-i18next";

const CreateLicense = () => {
   const [name, setName] = useState<string>("");
   const [description, setDescription] = useState<string>("");
   const [price, setPrice] = useState<string>("");
   const [duration, setDuration] = useState<string>("");
   const { t } = useTranslation("organizer");

   const dispatch = useDispatch();

   const submit = async (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();

      const data = await dispatch(createLicense({ name, description, price, duration }));

      if (!data?.error) {
         setName("");
         setDescription("");
         setDuration("");
         setPrice("");
         dispatch(getAllLicenses());
      }
   };

   return (
      <ContentBox title={t("createLicense")} size="base" padding="small">
         <form action="" onSubmit={submit} className="max-h-[250px] overflow-y-scroll">
            <div className="flex flex-col gap-[1rem] text-slate-700">
               <div>
                  <p className="font-500 text-[0.98rem]">{t("name")}</p>
                  <input
                     type="text"
                     placeholder={t("enterLicenseName")}
                     className={style.input}
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     required
                  />
               </div>

               <div>
                  <p className="font-500 text-[0.98rem]">{t("description")}</p>
                  <input
                     type="text"
                     placeholder={t("enterLicenseDescription")}
                     className={style.input}
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                     required
                  />
               </div>

               <div>
                  <p className="font-500 text-[0.98rem]">{t("price")}</p>
                  <input
                     type="text"
                     placeholder={t("enterLicensePrice")}
                     className={style.input}
                     value={price}
                     onChange={(e) => setPrice(e.target.value)}
                     required
                  />
               </div>

               <div>
                  <p className="font-500 text-[0.98rem]">{t("duration")}</p>
                  <input
                     type="number"
                     min={1}
                     placeholder={t("enterLicenseDuration")}
                     className={style.input}
                     value={duration}
                     onChange={(e) => setDuration(e.target.value)}
                     required
                  />
               </div>
            </div>

            <button className={style.button} type="submit">
               {t("createLicense")}
            </button>
         </form>
      </ContentBox>
   );
};

const style = {
   input: `px-3 py-[10px] border-b-[2px] outline-none w-full bg-transparent border-b-[#333] text-[#333] placeholder:text-[#333] focus:border-b-mainColor transition-all duration-300`,
   button: "mt-8 ml-auto block min-w-[150px] max-w-[150px] rounded-md bg-mainColor p-2 text-white",
};

export default CreateLicense;
