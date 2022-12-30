import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllLessons } from 'services/lessonService';

const initialState = {
    lessons: [],
}



const lessonsSlice = createSlice({
  name: "allLessons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllLessons.pending, 
      (state: any, action: PayloadAction) => {
        console.log('pending')
      }),
    builder.addCase(getAllLessons.fulfilled, 
      (state: any, action: PayloadAction) => {
        state.lessons = action.payload;
      }
      ),
    builder.addCase(getAllLessons.rejected, 
      (state: any, action: PayloadAction) => {
        console.log(action.payload)
      }
      )
  }
})

export default lessonsSlice.reducer