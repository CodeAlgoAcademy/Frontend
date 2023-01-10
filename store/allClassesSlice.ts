import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllClasses } from 'services/classesService';
import { IAllClasses, IClass } from '../types/interfaces';

const initialState: IAllClasses = {
  classes: [],
};

const allClassesSlice = createSlice({
  name: 'allClasses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllClasses.pending, (state: IAllClasses, action: PayloadAction) => {
      console.log('pending');
    }),
      builder.addCase(
        getAllClasses.fulfilled,
        (state: IAllClasses, action: PayloadAction<IClass[]>) => {
          state.classes = action.payload;
        },
      ),
      builder.addCase(getAllClasses.rejected, (state: IAllClasses, action: PayloadAction) => {
        console.log(action.payload);
      });
  },
});

export default allClassesSlice.reducer;
