import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getNotes, updateNotes } from "services/notesService"
import sanitizeHtml from "sanitize-html"
import { INotes } from "../types/interfaces"

const initialState: INotes = {
	html: ""
}
const sanitizeConf = {
	allowedTags: ["b", "i", "em", "strong", "span", "li", "ul"],
	allowedAttributes: { a: ["href"] }
}
const notesSlice = createSlice({
	name: "notes",
	initialState,
	reducers: {
		handleChange: (state: INotes, action: PayloadAction<string>) => {
			return { html: action.payload }
		},
		sanitizeNotes: (state: INotes) => {
			if (state.html) {
				return { html: sanitizeHtml(state.html, sanitizeConf) }
			}
		},
		resetNotes: (state: INotes) => {
			return { html: "<ul><li> </li></ul>" }
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getNotes.pending, (state: INotes, action: PayloadAction) => {
			console.log("pending")
		}),
			builder.addCase(getNotes.fulfilled, (state: INotes, action: PayloadAction<{ text: string }>) => {
				console.log(action.payload)
				state.html = action.payload.text
			}),
			builder.addCase(getNotes.rejected, (state: INotes, action: PayloadAction) => {
				console.error("Notes failed to fetch data")
			})
		builder.addCase(updateNotes.pending, (state: INotes, action: PayloadAction) => {
			console.log("pending")
		}),
			builder.addCase(updateNotes.fulfilled, (state: INotes, action: PayloadAction<{ text: string }>) => {
				console.log(action.payload)
			}),
			builder.addCase(updateNotes.rejected, (state: INotes, action: PayloadAction) => {
				console.log(action.payload)
			})
	}
})

export default notesSlice.reducer
export const { handleChange, sanitizeNotes, resetNotes } = notesSlice.actions
