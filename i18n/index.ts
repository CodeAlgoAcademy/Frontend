import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import http from "axios.config";
import { getAccessToken } from "utils/getTokens";

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
import aboutEn from "../locales/en/about.json";

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
import aboutFr from "../locales/fr/about.json";

const staticResources = {
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

async function fetchTranslations(lang: string, ns: string): Promise<Record<string, string>> {
   try {
      const { data } = await http.get(`/i18n/translations/`, {
         params: { lang, ns },
      });
      if (data && Object.keys(data).length > 0) {
         return data;
      }
   } catch {}
   return {};
}

i18n.use(LanguageDetector)
   .use(initReactI18next)
   .init({
      resources: staticResources,
      fallbackLng: "en",
      ns: ["common", "home", "auth", "teacher", "parent", "organizer", "pages", "modals", "press", "blog", "about"],
      defaultNS: "common",
      interpolation: {
         escapeValue: false,
      },
      react: {
         useSuspense: false,
      },
      detection: {
         order: ["localStorage", "navigator"],
         lookupLocalStorage: "i18nextLng",
         caches: ["localStorage"],
      },
      saveMissing: true,
      missingKeyHandler: (lngs: readonly string[], ns: string, key: string) => {
         const lang = lngs[0]?.substring(0, 2) || "en";
         http.post(`/i18n/missing-key/`, {
            lang,
            ns,
            key,
         }).catch(() => {});
      },
   });

export async function loadTranslations(lang: string): Promise<void> {
   const namespaces = i18n.options.ns as string[];
   for (const ns of namespaces) {
      const existing = i18n.getResourceBundle(lang, ns);
      if (existing && Object.keys(existing).length > 0) continue;
      const remote = await fetchTranslations(lang, ns);
      if (remote && Object.keys(remote).length > 0) {
         i18n.addResourceBundle(lang, ns, remote, true);
      }
   }
}

export function syncLanguageToBackend(lang: string): void {
   const token = getAccessToken();
   if (!token) return;
   http.patch(
      `/auth/language/`,
      { preferred_language: lang },
      { headers: { Authorization: `Bearer ${token}` } }
   ).catch(() => {});
}

export function detectLanguage(): string {
   return i18n.language?.substring(0, 2) || "en";
}

export default i18n;
