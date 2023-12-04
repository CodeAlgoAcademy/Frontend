import { ILocalStorageItems } from "types/interfaces/localstorage.interface";

export enum AnnouncementStates {
   ADDED = "added",
   REMOVED = "removed",
}

export const getAnnouncementSession = (): AnnouncementStates | undefined => {
   if (typeof window === "undefined") return;
   const item = sessionStorage.getItem(ILocalStorageItems.announcement) as AnnouncementStates;
   return item;
};

export const addAnnouncementSession = () => {
   if (typeof window === "undefined") return;
   sessionStorage.setItem(ILocalStorageItems.announcement, AnnouncementStates.ADDED);
};

export const removeAnnouncementSession = () => {
   if (typeof window === "undefined") return;
   sessionStorage.setItem(ILocalStorageItems.announcement, AnnouncementStates.REMOVED);
};
