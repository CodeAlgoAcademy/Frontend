import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import commonEn from "../locales/en/common.json";
import homeEn from "../locales/en/home.json";
import authEn from "../locales/en/auth.json";
import teacherEn from "../locales/en/teacher.json";
import parentEn from "../locales/en/parent.json";
import organizerEn from "../locales/en/organizer.json";
import pagesEn from "../locales/en/pages.json";
import modalsEn from "../locales/en/modals.json";
import pressEn from "../locales/en/press.json";
import blogEn from "../locales/en/blog.json";
import aboutEn from '../locales/fr/about.json'


import commonFr from "../locales/fr/common.json";
import homeFr from "../locales/fr/home.json";
import authFr from "../locales/fr/auth.json";
import teacherFr from "../locales/fr/teacher.json";
import parentFr from "../locales/fr/parent.json";
import organizerFr from "../locales/fr/organizer.json";
import pagesFr from "../locales/fr/pages.json";
import modalsFr from "../locales/fr/modals.json";
import pressFr from "../locales/fr/press.json";
import blogFr from "../locales/fr/blog.json";
import aboutFr from '../locales/fr/about.json'

const resources = {
   en: {
      common: commonEn,
      home: homeEn,
      auth: authEn,
      teacher: teacherEn,
      parent: parentEn,
      organizer: organizerEn,
      pages: pagesEn,
      modals: modalsEn,
      press: pressEn,
      blog: blogEn,
      about: aboutEn,
   },
   fr: {
      common: commonFr,
      home: homeFr,
      auth: authFr,
      teacher: teacherFr,
      parent: parentFr,
      organizer: organizerFr,
      pages: pagesFr,
      modals: modalsFr,
      press: pressFr,
      blog: blogFr,
      about: aboutFr,
   },
};

i18n.use(initReactI18next).init({
   resources,
   lng: "en",
   fallbackLng: "en",
   ns: ["common", "home", "auth", "teacher", "parent", "organizer", "pages", "modals", "press", "blog", "about"],
   defaultNS: "common",
   interpolation: {
      escapeValue: false,
   },
   react: {
      useSuspense: false,
   },
});

export default i18n;

export function detectLanguage(): string {
   if (typeof window === "undefined") return "en";
   try {
      const stored = localStorage.getItem("i18nextLng");
      if (stored && (stored.startsWith("fr") || stored.startsWith("en"))) {
         return stored.substring(0, 2);
      }
   } catch {}
   const browserLang = navigator.language?.substring(0, 2);
   if (browserLang === "fr") return "fr";
   return "en";
}
