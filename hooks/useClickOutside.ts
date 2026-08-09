import { useEffect, useRef } from "react";

const useClickOutside = <T extends HTMLElement>(handler: () => void) => {
   const ref = useRef<T>(null);
   const handlerRef = useRef(handler);
   handlerRef.current = handler;

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (ref.current && !ref.current.contains(event.target as Node)) {
            handlerRef.current();
         }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
   }, []);

   return ref;
};

export default useClickOutside;
