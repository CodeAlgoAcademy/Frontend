import i18n from "i18next";

export function getLocale(): string {
   return i18n.language || "en";
}

export function formatDate(date: Date | string | number, options?: Intl.DateTimeFormatOptions): string {
   const d = new Date(date);
   const locale = getLocale();
   const defaultOptions: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      ...options,
   };
   return new Intl.DateTimeFormat(locale, defaultOptions).format(d);
}

export function formatDateTime(date: Date | string | number): string {
   return formatDate(date, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
   });
}

export function formatTime(date: Date | string | number): string {
   const d = new Date(date);
   const locale = getLocale();
   return new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
   }).format(d);
}

export function formatNumber(value: number, options?: Intl.NumberFormatOptions): string {
   const locale = getLocale();
   return new Intl.NumberFormat(locale, options).format(value);
}

export function formatCurrency(value: number, currency: string = "USD"): string {
   const locale = getLocale();
   return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
   }).format(value);
}

export function formatRelativeTime(date: Date | string | number): string {
   const d = new Date(date);
   const now = new Date();
   const diffMs = now.getTime() - d.getTime();
   const diffSec = Math.floor(diffMs / 1000);
   const diffMin = Math.floor(diffSec / 60);
   const diffHr = Math.floor(diffMin / 60);
   const diffDay = Math.floor(diffHr / 24);

   const locale = getLocale();
   const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

   if (diffDay > 0) return rtf.format(-diffDay, "day");
   if (diffHr > 0) return rtf.format(-diffHr, "hour");
   if (diffMin > 0) return rtf.format(-diffMin, "minute");
   return rtf.format(-diffSec, "second");
}

export function getMonthName(monthIndex: number): string {
   const locale = getLocale();
   const date = new Date(2024, monthIndex, 1);
   return new Intl.DateTimeFormat(locale, { month: "long" }).format(date);
}

export function getMonthNames(): string[] {
   return Array.from({ length: 12 }, (_, i) => getMonthName(i));
}
