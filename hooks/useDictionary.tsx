import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openDictionaryModal } from "store/modalSlice";
import { RootState } from "store/store";

const useDictionary = () => {
   const isEnabled = useSelector((state: RootState) => state.accessibility.features["dictionary"]);
   const dispatch = useDispatch();
   const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

   useEffect(() => {
      const handleSelection = () => {
         const selection = window?.getSelection?.()?.toString().trim();

         // If selection is invalid or contains spaces, clear any existing timeout
         if (!selection || selection.includes(" ")) {
            if (debounceTimeout) clearTimeout(debounceTimeout);
            return;
         }

         // Clear any previous timeout (prevents modal from opening too soon)
         if (debounceTimeout) clearTimeout(debounceTimeout);

         // Set new timeout to open modal after 3 seconds
         const timeout = setTimeout(() => {
            dispatch(openDictionaryModal(selection));
         }, 1000);

         setDebounceTimeout(timeout);
      };

      if (isEnabled) {
         document.addEventListener("mouseup", handleSelection);
      }

      return () => {
         document.removeEventListener("mouseup", handleSelection);
         if (debounceTimeout) clearTimeout(debounceTimeout);
      };
   }, [isEnabled, dispatch, debounceTimeout]);

   return null;
};

export default useDictionary;
