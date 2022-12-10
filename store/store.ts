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
<<<<<<< HEAD
import allCurriculumReducer from './allCurriculumSlice'
=======
import notesReducer from "./notesSlice"
>>>>>>> 641ed93de3b13363193b0d306a9676686ce308a8

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
<<<<<<< HEAD
	allCurriculum: allCurriculumReducer
=======
	notes: notesReducer
>>>>>>> 641ed93de3b13363193b0d306a9676686ce308a8
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
