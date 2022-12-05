import React, { useEffect } from "react"
import ContentEditable, { ContentEditableEvent } from "react-contenteditable"
import { RootState } from "../store/store"
import { useSelector, useDispatch } from "react-redux"
import { INotes } from "../types/interfaces"
import { handleChange, sanitizeNotes, resetNotes } from "../store/notesSlice"
import { getNotes, updateNotes } from "services/notesService"


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
    const data = await dispatch(getNotes())
    if (!data?.error?.message) {
    }
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
          <span className="animate-pulse cursor-pointer">
            <svg
              width="16"
              height="20"
              viewBox="0 0 16 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 0L15 3L12.713 5.288L9.713 2.288L12 0ZM0 11.988V14.988H3L11.299 6.701L8.299 3.701L0 11.988ZM0 17.988H16V19.988H0V17.988Z"
                fill="#828282"
              />
            </svg>
          </span>
        </div>
        <ul className="list-disc pl-6 ContentEditable">
          <ContentEditable
            innerRef={ contentEditableRef }
            html={ contentEditableState?.html }
            disabled={ false }
            onChange={ handleNotes }
            onBlur={ () => { dispatch(sanitizeNotes()) } }
            tagName="span"
          />
        </ul>
      </div>
    </div>
  )
}

export default NoteBox
