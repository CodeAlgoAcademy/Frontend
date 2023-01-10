import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"
import { Notification } from "types/interfaces/notifications"
import { RootState } from "./store"

type NotificationsState = {
    notifications: Notification[]
}

const initialState: NotificationsState = {
    notifications: [],
}

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        displayNotification: (state: NotificationsState, { payload }: PayloadAction<Notification>) => {
            state.notifications.push(payload)
            console.log(payload)
        },
        dismissNotification: (state: NotificationsState, { payload }: PayloadAction<Notification["id"]>) => {
            const index = state.notifications.findIndex((notification) => notification.id === payload)

            if (index !== -1) {
                state.notifications.splice(index, 1)
            }
        },
        reset: () => {
            return initialState
        }
    },
})

export const useToasts = () => useSelector((state: RootState) => state.notifications.notifications)

export const {reset, displayNotification, dismissNotification} = notificationsSlice.actions;

export default notificationsSlice.reducer;