import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import styles from "../../../styles/styles";
import Grades from "./grades";
import { closeAddClassModal, closeColorModal } from "../../../store/modalSlice";
import CreateClass from "./createClass";
import AddStudents from "./addStudents";
import { addFile, clearFields } from "store/addClassSlice";
const Modal = () => {
   const { addClassModalOpen, showAddStudents } = useSelector((state: RootState) => state.modal);
   const { color } = useSelector((state: RootState) => state.addClass.class);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(addFile({}));
   }, [dispatch]);

   return (
      <section className={`${styles.modalOverlay} bg-[rgba(0,0,0,.25)] ${!addClassModalOpen && "hidden"}`} data-testid="addClassModal">
         {/* modal itself */}
         <main className="relative mx-auto flex h-fit max-h-[95vh] w-[90vw] max-w-[900px] overflow-hidden overflow-y-scroll rounded-md bg-white shadow-lg">
            <span
               onClick={() => {
                  dispatch(closeAddClassModal());
                  dispatch(clearFields());
               }}
               className="absolute top-[30px] right-[30px] text-[30px] font-thin text-red-600"
               data-testid="close-modal"
            >
               <FaTimes />
            </span>
            <aside className={`flex-[0.075]  rounded-tl-md rounded-bl-md`} style={{ backgroundColor: color }}></aside>

            {!showAddStudents ? <CreateClass /> : <AddStudents />}

            {/* position fixed */}
            <Grades addStudents={true} />
         </main>
      </section>
   );
};

export default Modal;
