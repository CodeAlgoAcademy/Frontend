import React, { useEffect } from "react"
import ContentEditable, { ContentEditableEvent } from "react-contenteditable"
import { RootState } from "../store/store"
import { useSelector, useDispatch } from "react-redux"
import { INotes } from "../types/interfaces"
import { handleChange, sanitizeNotes, resetNotes } from "../store/notesSlice"
import { getNotes, updateNotes } from "services/notesService"
import { FaSyncAlt } from "react-icons/fa"

const NoteBox = () => {
  const contentEditableRef = React.createRef<HTMLElement>()
  const dispatch = useDispatch()
  const contentEditableState = useSelector(
    (state: RootState): INotes => state.notes
  )
  const handleNotes = (evt: ContentEditableEvent) => {
    dispatch(handleChange(evt.target.value))
  }
  const fetchNotes = async () => {
    await dispatch(getNotes())
  }
  const postNotes = async () => {
    await dispatch(updateNotes())
  }
  useEffect(() => {
    contentEditableState.html == "" && dispatch(resetNotes())
  }, [contentEditableState.html, dispatch])
  useEffect(() => {
    fetchNotes()
  }, [])
  return (
    <div className="rounded-md shadow-lg p-6 max-w-[380px] bg-white max-h-[212px] overflow-y-auto">
      <div className="min-h-[114px]">
        <div className="flex align-center justify-between">
          <h3 className="text-[20px] font-bold mb-3">Notes</h3>
          <span className="animate-pulse cursor-pointer text-lg">
            <FaSyncAlt />
          </span>
        </div>
        <ul className="list-disc pl-6 ContentEditable">
          <ContentEditable
            innerRef={ contentEditableRef }
            html={ contentEditableState?.html }
            disabled={ false }
            onBlur={ () => {
              dispatch(sanitizeNotes())
              postNotes()
            } }
            onChange={ handleNotes }
            tagName="span"
          />
        </ul>
      </div>
    </div>
  )
}

export default NoteBox
