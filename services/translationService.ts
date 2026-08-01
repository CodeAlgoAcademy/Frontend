import http from "axios.config";

export async function fetchUserLanguage(): Promise<string> {
   try {
      const { data } = await http.get(`/auth/language/`);
      return data.preferred_language || "en";
   } catch {
      return "en";
   }
}

export async function updateUserLanguage(lang: string): Promise<void> {
   try {
      await http.patch(`/auth/language/`, { preferred_language: lang });
   } catch {}
}

export async function fetchTranslations(lang: string, ns: string): Promise<Record<string, string>> {
   try {
      const { data } = await http.get(`/i18n/translations/`, {
         params: { lang, ns },
      });
      return data;
   } catch {
      return {};
   }
}
