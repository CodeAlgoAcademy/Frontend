import React from "react"
import { FaTimes } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store"
import styles from "../../styles/styles"
import Grades from "../grades"
import { closeAddClassModal } from "../../store/modalSlice"
import CreateClass from "./createClass"
import AddStudents from "./addStudents"
const Modal = () => {
	const { addClassModalOpen, showAddStudents } = useSelector((state: RootState) => state.modal)
	const { color } = useSelector((state: RootState) => state.addClass.class)
	const dispatch = useDispatch()

	if (!addClassModalOpen) {
		return <></>
	}
	return (
		<section className={`${styles.modalOverlay} bg-[rgba(0,0,0,.25)]`}>
			{/* modal itself */}
			<main className='w-[90vw] max-w-[900px] mx-auto bg-white rounded-md flex shadow-lg relative'>
				<span
					onClick={() => {
						dispatch(closeAddClassModal())
					}}
					className='text-[30px] font-thin absolute z-10 top-[30px] right-[30px]'>
					<FaTimes />
				</span>
				<aside className={`flex-[0.075] min-h-full bg-[${color}] rounded-tl-md rounded-bl-md`}></aside>

				{!showAddStudents ? <CreateClass /> : <AddStudents />}

				{/* position fixed */}
				<Grades addStudents={true} />
			</main>
		</section>
	)
}

export default Modal
