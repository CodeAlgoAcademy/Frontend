import React from "react"
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
	reducers: {
		saveAssignment: (state: AssignmentDetails, action: PayloadAction<string>) => {}
	}
})

export default newAssignmentSlice.reducer
export const { saveAssignment } = newAssignmentSlice.actions
