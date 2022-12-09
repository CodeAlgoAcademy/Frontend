import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CurrentClassState } from "../types/interfaces"

const initialState: CurrentClassState = {
	className: "",
	color: ""
}

const currentClassSlice = createSlice({
	name: "currentClass",
	initialState,
	reducers: {
		updateCurrentClass: (state: CurrentClassState, action: PayloadAction<CurrentClassState>) => action.payload
	}
})

export default currentClassSlice.reducer
export const { updateCurrentClass } = currentClassSlice.actions
