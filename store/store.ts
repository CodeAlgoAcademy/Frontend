import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from './reduxStorage';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import userReducer from './authSlice';
import modalReducer from './modalSlice';
import addClassReducer from './addClassSlice';
import allClassesReducer from './allClassesSlice';
import currentClassReducer from './currentClassSlice';
import scheduleReducer from './scheduleSlice';
import unitsSlice from './unitsSlice';
import messagesReducer from './messagesSlice';
import notesReducer from './notesSlice';
import fetchReducer from './fetchSlice';
import studentReducer from './studentSlice';
import allCurriculumReducer from './allCurriculumSlice';
import skillsReducer from './skillsSlice';
import newAssignmentReducer from './newAssignmentSlice';
import allAssignmentsReducer from './allAssignments';
import lessonsReducer from './lessonsSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  modal: modalReducer,
  addClass: addClassReducer,
  allClasses: allClassesReducer,
  currentClass: currentClassReducer,
  unit: unitsSlice,
  schedule: scheduleReducer,
  allCurriculum: allCurriculumReducer,
  allLessons: lessonsReducer,
  notes: notesReducer,
  fetch: fetchReducer,
  messages: messagesReducer,
  students: studentReducer,
  skills: skillsReducer,
  addAssignment: newAssignmentReducer,
  allAssignments: allAssignmentsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
