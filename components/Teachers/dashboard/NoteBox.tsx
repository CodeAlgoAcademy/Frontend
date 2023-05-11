import React, { useCallback, useEffect } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { RootState } from "../../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { INotes } from "../../../types/interfaces";
import { handleChange, sanitizeNotes, resetNotes } from "../../../store/notesSlice";
import { getNotes, updateNotes } from "services/notesService";
import { FaSyncAlt } from "react-icons/fa";

const NoteBox = () => {
   const contentEditableRef = React.createRef<HTMLElement>();
   const dispatch = useDispatch();
   const contentEditableState = useSelector((state: RootState): INotes => state.notes);
   const handleNotes = (evt: ContentEditableEvent) => {
      dispatch(handleChange(evt.target.value));
   };
   const fetchNotes = useCallback(async () => {
      await dispatch(getNotes());
   }, [dispatch]);
   const postNotes = async () => {
      await dispatch(updateNotes());
   };
   useEffect(() => {
      contentEditableState.html == "" && dispatch(resetNotes());
   }, [contentEditableState.html, dispatch]);
   useEffect(() => {
      fetchNotes();
   }, [fetchNotes]);
   return (
      <div className="max-h-[212px] max-w-[380px] overflow-y-auto rounded-md bg-white p-6 shadow-lg">
         <div className="min-h-[114px]">
            <div className="align-center flex justify-between text-[#2073fa]">
               <h3 className="mb-3 text-[20px] font-bold">Notes</h3>
               <span className="animate-pulse cursor-pointer text-lg">
                  <FaSyncAlt />
               </span>
            </div>
            <ul className="ContentEditable list-disc pl-6">
               <ContentEditable
                  innerRef={contentEditableRef}
                  html={contentEditableState?.html}
                  disabled={false}
                  onBlur={() => {
                     dispatch(sanitizeNotes());
                     postNotes();
                  }}
                  onChange={handleNotes}
                  tagName="span"
               />
            </ul>
         </div>
      </div>
   );
};

export default NoteBox;
