import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AssignmentDetails } from "../types/interfaces"

const initialState: AssignmentDetails = {
	title: "",
	schedule: "now",
	order: "random",
	number: 0,
	skills: [],
	students: []
}

const newAssignmentSlice = createSlice({
	name: "newAssignment",
	initialState,
	reducers: {}
})

export default newAssignmentSlice.reducer
export const {} = newAssignmentSlice.actions
