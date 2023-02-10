import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IUser, IUserData } from '../types/interfaces';
import { RootState } from './store';
import {
  loginUser,
  signUpUser,
  loginWithGoogle,
  updateFirstname,
  updateLastname,
  updateEmail,
  signUpWithGoogle,
  updateAccountType,
} from 'services/authService';
import { countryList } from '@/components/signup/countries';
import { setTimeStamp } from 'utils/getTokens';

const initialState: IUser = {
  id: 0,
  firstname: '',
  lastname: '',
  username: '',
  email: '',
  isActive: false,
  createdAt: '',
  updatedAt: '',
  access_token: '',
  refresh_token: '',
  // sign up stuffs
  country: '',
  // peculiar to students
  grade: '',
  // peculiar to teachers
  schoolCountry: '',
  schoolName: '',
  is_parent: false,
  is_student: false,
  is_teacher: false,
  auth: {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    // peculiar to students
    grade: '',
    // peculiar to teachers
    schoolCountry: countryList[0],
    schoolName: '',
    is_parent: false,
    is_student: true,
    is_teacher: false,
    country: countryList[0],
    username: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: () => {
      localStorage.removeItem('token');
    },
    clearFields: (state: IUser) => {
      return { ...state, auth: {...initialState.auth, email: state.auth.email, is_student: state.auth.is_student, is_parent: state.auth.is_parent, is_teacher:state.auth.is_teacher} };
    },
    updateUser: (
      state: IUser | any,
      action: PayloadAction<{
        key: string;
        value: string;
      }>,
    ) => {
      if (action.payload.key === 'accountType') {
        state.auth.is_parent = action.payload.value === 'Parent' ? true : false;
        state.auth.is_teacher = action.payload.value === 'Teacher' ? true : false;
        state.auth.is_student = action.payload.value === 'Student' ? true : false;
      } else {
        state.auth[action.payload.key as keyof typeof state.auth] = action.payload.value;
      }
    },
    resetAuthUser: (state: IUser) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state: IUser, _) => {
      console.log('pending');
    });
    builder.addCase(loginUser.fulfilled, (state: IUser, action: PayloadAction<IUser>) => {
      localStorage.setItem(
        'token',
        JSON.stringify({
          access_token: action.payload.access_token,
          refresh_token: action.payload.refresh_token,
          user_type: action.payload.is_student ? "student" : action.payload.is_teacher ? "teacher" : action.payload.is_parent ? "parent" : ""
        }),
      );
      setTimeStamp();

      return {
        ...state,
        ...action.payload,
      };
    });
    builder.addCase(loginUser.rejected, (state: IUser, { payload }: PayloadAction) => {
      console.log(payload);
    });
    // builder.addCase(signUpUser.pending, (state: IUser) => {
    //   console.log('pending');
    // });
    // builder.addCase(signUpUser.fulfilled, (state: IUser, action: PayloadAction<IUser>) => {
    //   localStorage.setItem(
    //     'token',
    //     JSON.stringify({
    //       access_token: action.payload?.access_token,
    //       refresh_token: action.payload?.refresh_token,
    //     }),
    //   );
    //   setTimeStamp();
    //   return {
    //     ...state,
    //     ...action.payload,
    //   };
    // });
    // builder.addCase(signUpUser.rejected, (state: IUser, { payload }: PayloadAction) => {});
    builder.addCase(loginWithGoogle.pending, (state: IUser) => {});
    builder.addCase(loginWithGoogle.fulfilled, (state: IUser, action: PayloadAction<IUser>) => {
      localStorage.setItem(
        'token',
        JSON.stringify({
          access_token: action.payload?.access_token,
          refresh_token: action.payload?.refresh_token,
        }),
      );
      setTimeStamp();

      return {
        ...state,
        ...action.payload,
      };
    });
    builder.addCase(loginWithGoogle.rejected, (state: IUser, { payload }: PayloadAction) => {
      console.log(payload);
    });
    builder.addCase(signUpWithGoogle.pending, (state: IUser) => {
      console.log('pending');
    });
    builder.addCase(signUpWithGoogle.fulfilled, (state: IUser, action: PayloadAction<IUser>) => {
      console.log(action);
      localStorage.setItem(
        'token',
        JSON.stringify({
          access_token: action.payload.access_token,
          refresh_token: action.payload.refresh_token,
        }),
      );
      setTimeStamp();

      return {
        ...state,
        ...action.payload,
      };
    });
    builder.addCase(signUpWithGoogle.rejected, (state: IUser, { payload }) => {
      console.log(payload);
    });
    builder.addCase(updateFirstname.pending, () => {
      console.log('pending');
    });
    builder.addCase(updateFirstname.fulfilled, (state: IUser, action: PayloadAction<IUser>) => {
      return { ...state, ...action.payload };
    });
    builder.addCase(updateFirstname.rejected, (state: IUser, { payload }: PayloadAction) => {
      console.log(payload);
    });
    builder.addCase(updateLastname.pending, () => {
      console.log('pending');
    });
    builder.addCase(updateLastname.fulfilled, (state: IUser, action: PayloadAction<IUser>) => {
      return { ...state, ...action.payload };
    });
    builder.addCase(updateEmail.pending, () => {
      console.log('pending');
    });
    builder.addCase(updateEmail.fulfilled, (state: IUser, action: PayloadAction<IUser>) => {
      return { ...state, ...action.payload };
    });
    builder.addCase(updateEmail.rejected, (state: IUser, { payload }: PayloadAction) => {
      console.log(payload);
    });
    builder.addCase(updateAccountType.pending, () => {});
    builder.addCase(updateAccountType.fulfilled, (state: IUser, action: PayloadAction<IUser>) => {
      return { ...state, ...action.payload };
    });
    builder.addCase(updateAccountType.rejected, (state: IUser, { payload }: PayloadAction) => {
      console.log(payload);
    });
  },
});

// Action creators are generated for each case reducer function
export const { logOut, clearFields, updateUser, resetAuthUser } = userSlice.actions;

export default userSlice.reducer;
