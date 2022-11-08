import { createSlice } from "@reduxjs/toolkit"
import { IAllClasses } from "../types/interfaces"

const initialState: IAllClasses = {
	classes: [
		{
			teacher: {
				teacherEmail: "",
				teacherName: ""
			},
			students: [
				{
					studentName: "Triumfia Fulks",
					studentEmail: "triumfia@codealgo.com",
					studentId: "123459abcde"
				},
				{
					studentName: "Sedric Hibler",
					studentEmail: "sedric@codealgo.com",
					studentId: "123459abcde"
				}
			],
			classDetails: {
				className: "Class A",
				grade: "4",
				subject: "React JS",
				coTeachers: "",
				roomNumber: "9",
				color: "#F6B86F"
			}
		},
		{
			teacher: {
				teacherEmail: "",
				teacherName: ""
			},
			students: [
				{
					studentName: "Triumfia Fulks",
					studentEmail: "triumfia@codealgo.com",
					studentId: "123459abcde"
				},
				{
					studentName: "Sedric Hibler",
					studentEmail: "sedric@codealgo.com",
					studentId: "123459abcde"
				}
			],
			classDetails: {
				className: "Class B",
				grade: "4",
				subject: "React JS",
				coTeachers: "",
				roomNumber: "9",
				color: "#AADE98"
			}
		},
		{
			teacher: {
				teacherEmail: "",
				teacherName: ""
			},
			students: [
				{
					studentName: "Triumfia Fulks",
					studentEmail: "triumfia@codealgo.com",
					studentId: "123459abcde"
				},
				{
					studentName: "Sedric Hibler",
					studentEmail: "sedric@codealgo.com",
					studentId: "123459abcde"
				}
			],
			classDetails: {
				className: "Class C",
				grade: "4",
				subject: "React JS",
				coTeachers: "",
				roomNumber: "9",
				color: "#92C7F7"
			}
		},
		{
			teacher: {
				teacherEmail: "",
				teacherName: ""
			},
			students: [
				{
					studentName: "Daniel Adejare",
					studentEmail: "adejaredaniel12@gmail.com",
					studentId: "123456789abcde"
				}
			],
			classDetails: {
				className: "Class D",
				grade: "K",
				subject: "React JS",
				coTeachers: "",
				roomNumber: "9",
				color: "#FFE977"
			}
		}
	]
}

const allClassesSlice = createSlice({
	name: "allClasses",
	initialState,
	reducers: {}
})

export default allClassesSlice.reducer
