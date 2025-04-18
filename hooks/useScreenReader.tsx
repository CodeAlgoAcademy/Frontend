import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

export function useScreenReader({ isCustom, bypassScreenReaderCount }: { isCustom?: boolean; bypassScreenReaderCount?: boolean }) {
   const screenReaderCount = useSelector((state: RootState) => state.accessibility.features["screen reader"]);

   const [isSpeaking, setIsSpeaking] = useState(false);
   const synth = typeof window !== "undefined" ? window.speechSynthesis : null;

   const extractPageText = () => {
      return document.body.innerText;
   };

   const speak = (text: string) => {
      if (!synth) return;
      if (synth.speaking) {
         synth.cancel(); // Stop previous speech before starting a new one
      }
      if (!screenReaderCount && !bypassScreenReaderCount) return;

      if (!text.trim()) return;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = screenReaderCount == 1 ? 1 : screenReaderCount == 2 ? 1.5 : 0.5;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);

      synth.speak(utterance);
   };

   const stop = () => {
      if (synth) {
         synth.cancel();
         setIsSpeaking(false);
      }
   };

   useEffect(() => {
      if (!screenReaderCount) {
         stop();
      } else {
         if (isCustom) {
            speak(extractPageText());
         }
      }
   }, [screenReaderCount]);

   return { speak, isSpeaking, stop };
}
