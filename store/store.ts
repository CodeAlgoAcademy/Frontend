import { combineReducers, configureStore } from "@reduxjs/toolkit"
import storage from "./reduxStorage"
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist"

import userReducer from "./authSlice"
import modalReducer from "./modalSlice"
import addClassReducer from "./addClassSlice"
import allClassesReducer from "./allClassesSlice"
import currentClassReducer from "./currentClassSlice"
import unitsSlice from "./unitsSlice"
import calendarReducer from "./calendarSlice"
import allCurriculumReducer from './allCurriculumSlice'

const persistConfig = {
	key: "root",
	storage
}

const rootReducer = combineReducers({
	user: userReducer,
	modal: modalReducer,
	addClass: addClassReducer,
	allClasses: allClassesReducer,
	currentClass: currentClassReducer,
	unit: unitsSlice,
	calendar: calendarReducer,
	allCurriculum: allCurriculumReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
			}
		})
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)
