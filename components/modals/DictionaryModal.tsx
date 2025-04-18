import React, { useEffect, useMemo, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import Loader from "../UI/loader";
import { MdClose } from "react-icons/md";
import { closeDictionaryModal } from "store/modalSlice";
import { DictionaryDefinitions, DictionaryMeaning } from "types/interfaces";
import { toast } from "sonner";
import axios from "axios";
import { TbError404 } from "react-icons/tb";
import { BsChevronLeft, BsChevronRight, BsSoundwave } from "react-icons/bs";
import { useScreenReader } from "hooks/useScreenReader";
import { cn } from "utils";

const DictionaryModal = () => {
   const modal = useSelector((state: RootState) => state.modal.dictionaryModal);
   const dispatch = useDispatch();
   const { speak, stop, isSpeaking } = useScreenReader({ isCustom: true, bypassScreenReaderCount: true });
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [word, setWord] = useState<string>("");
   const [definitions, setDefinitions] = useState<DictionaryDefinitions[]>([]);
   const [currentDefinition, setCurrentDefinition] = useState<number>(0);
   const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);
   const [speechMode, setSpeechMode] = useState<"read" | "spell" | undefined>(undefined);

   const definition = useMemo(() => definitions[currentDefinition], [currentDefinition, definitions]);

   const prevDef = () => {
      if (currentDefinition === 0) {
         setCurrentDefinition(definitions.length - 1);
      } else if (currentDefinition === definitions.length - 1) {
         setCurrentDefinition(0);
      } else {
         setCurrentDefinition((prev) => prev - 1);
      }
   };

   const nextDef = () => {
      if (currentDefinition === definitions.length - 1) {
         setCurrentDefinition(0);
      } else {
         setCurrentDefinition((prev) => prev + 1);
      }
   };

   const read = () => {
      if (speechMode === "read") {
         stop();
         setSpeechMode(undefined);
      } else {
         speak(definition.definition);
         setSpeechMode("read");
      }
   };

   const spell = () => {
      if (speechMode === "spell") {
         stop();
         setSpeechMode(undefined);
      } else {
         speak(definition.word + " " + definition.word.split("").join(" "));
         setSpeechMode("spell");
      }
   };

   useEffect(() => {
      setWord(modal.word);
      setDefinitions([]);
      setCurrentDefinition(0);
   }, [modal]);

   useEffect(() => {
      if (!word.trim()) return;
      if (debounceTimeout) clearTimeout(debounceTimeout);

      const timeout = setTimeout(
         async () => {
            setIsLoading(true);

            try {
               const response = await axios.get<DictionaryMeaning[]>(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
               const data = response.data?.[0];

               const fetchedDefinitions: DictionaryDefinitions[] = [];
               for (const meaning of data?.meanings || []) {
                  for (const def of meaning.definitions) {
                     fetchedDefinitions.push({
                        word: data.word,
                        partOfSpeech: meaning.partOfSpeech,
                        definition: def.definition,
                        example: def.example,
                     });
                  }
               }

               setDefinitions(fetchedDefinitions);
            } catch (error) {
               toast.error("Word not found");
            } finally {
               setIsLoading(false);
            }
         },
         word === modal.word ? 0 : 500
      );

      setDebounceTimeout(timeout);

      return () => {
         if (debounceTimeout) clearTimeout(debounceTimeout);
      };
   }, [word]);

   if (!modal.isOpen) {
      return <></>;
   }

   return (
      <main className={styles.modalOverlay}>
         <div className={styles.modal}>
            <span className="absolute top-[-30px] right-[-30px] flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full bg-mainBlack text-white">
               <MdClose size={20} onClick={() => dispatch(closeDictionaryModal())} />
            </span>
            <header className="relative">
               <input
                  value={word}
                  onChange={(e) => setWord(e.target.value)}
                  className="w-full rounded-md border-[1.5px] border-gray-600 p-2 text-[.85rem] outline-none focus:border-2 focus:border-mainRed"
                  placeholder="Search definition..."
               />

               <span className="absolute right-4 top-[50%] -translate-y-[50%]">
                  <BiSearch size={24} className="cursor-pointer text-gray-600" />
               </span>
            </header>

            {isLoading ? (
               <div className="flex h-[150px] flex-col items-center justify-center space-y-2 text-center">
                  <Loader size={50} color="red" />

                  <h3 className="text-[1.1rem]">Searching</h3>

                  <p className="max-w-[80%] text-center text-[.8rem] text-gray-600">Please wait while we get your definition for you...</p>
               </div>
            ) : definitions.length === 0 ? (
               <div className="flex h-[150px] flex-col items-center justify-center space-y-2 text-center">
                  <TbError404 size={100} />

                  <p className="max-w-[80%] text-center text-[.8rem] text-gray-600">Word not found.</p>
               </div>
            ) : (
               <div className="mt-4">
                  <p className="text-[.85rem] text-[#333]">
                     <b className="text-black">
                        {definition?.word} {`(${definition?.partOfSpeech})`}:{" "}
                     </b>
                     {definition?.definition}
                  </p>

                  <div className="mt-4 flex items-center justify-between gap-4">
                     <div className="flex items-center gap-2">
                        <Capsule text={"Read"} inProgress={speechMode === "read"} onClick={read} />
                        <Capsule text={"Spell"} inProgress={speechMode == "spell"} onClick={spell} />
                     </div>

                     <span className="flex items-center gap-2">
                        <BsChevronLeft onClick={prevDef} size={15} cursor={"pointer"} />
                        <p className="text-[.9rem]">
                           {currentDefinition + 1} of {definitions.length}
                        </p>
                        <BsChevronRight onClick={nextDef} size={15} cursor={"pointer"} />
                     </span>
                  </div>
               </div>
            )}
         </div>
      </main>
   );
};

const Capsule = ({ text, onClick, inProgress = false }: { text: string; onClick?: () => void; inProgress?: boolean }) => {
   return (
      <div
         onClick={onClick}
         className={cn(
            "flex cursor-pointer items-center gap-2 rounded-full border-2 border-transparent bg-mainRed/20 py-[5px] px-3 transition-all duration-100",
            inProgress && " border-mainRed"
         )}
      >
         <span className="flex h-[20px] w-[20px] items-center justify-center rounded-full bg-mainRed text-white">
            <BsSoundwave />
         </span>

         <p className={cn("text-[.75rem]", inProgress && "text-gray-600")}>{inProgress ? "Pause" : text}</p>
      </div>
   );
};

const styles = {
   modalOverlay: "fixed top-0 left-0 z-[999] flex h-screen w-full items-center justify-center bg-[rgba(0,0,0,0.2)]",
   modal: "z-[9] w-[90vw] max-w-[350px] rounded-md bg-white p-4 shadow-md min-h-fit relative",
   button: "bg-mainRed text-white py-2 px-2 rounded-md max-w-[300px]  w-full text-center",
};

export default DictionaryModal;
