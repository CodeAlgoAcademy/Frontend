import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllCurriculums } from "services/curriculumService";


const initialState = {
    curriculum: [],
}

const allCurriculumSlice = createSlice({
    name: "allCurriculum",
    initialState,
    reducers: {}, 
    extraReducers: (builder) => {
        builder.addCase(getAllCurriculums.pending,
            (state: any, action: PayloadAction) => {
                console.log("pending");
            }
        ),
        builder.addCase(getAllCurriculums.fulfilled,
            (state: any, action: PayloadAction) => {
                state.curriculum = action.payload;
            }
            ),
        builder.addCase(getAllCurriculums.rejected,
            (state: any, action: PayloadAction) => {
                console.log(action.payload)
            }
        )
    }
})

export default allCurriculumSlice.reducer