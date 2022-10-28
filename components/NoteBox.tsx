import React, { useState, useEffect } from "react"
import sanitizeHtml from "sanitize-html"
import ContentEditable, { ContentEditableEvent } from "react-contenteditable"

const NoteBox = () => {
	const contentEditableRef = React.createRef<HTMLElement>()
	const [contentEditableState, setContentEditableState] = useState({ html: "<ul><li>Hello</li><li>World</li></ul>" })
	const sanitizeConf = {
		allowedTags: ["b", "i", "em", "strong", "span", "li", "ul"],
		allowedAttributes: { a: ["href"] }
	}
	const sanitize = () => {
		contentEditableState.html && setContentEditableState({ html: sanitizeHtml(contentEditableState.html, sanitizeConf) })
	}
	const handleChange = (evt: ContentEditableEvent) => {
		setContentEditableState({ html: evt.target.value })
	}
	useEffect(() => {
		contentEditableState.html == "" && setContentEditableState({ html: "<ul><li> </li></ul>" })
	}, [setContentEditableState, contentEditableState.html])
	return (
		<div className='rounded-md shadow-lg p-6 max-w-[380px] bg-white max-h-[212px] overflow-y-auto'>
			<div className='min-h-[114px]'>
				<div className='flex align-center justify-between'>
					<h3 className='text-[20px] font-bold mb-3'>Notes</h3>
					<span className='animate-pulse cursor-pointer'>
						<svg width='16' height='20' viewBox='0 0 16 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M12 0L15 3L12.713 5.288L9.713 2.288L12 0ZM0 11.988V14.988H3L11.299 6.701L8.299 3.701L0 11.988ZM0 17.988H16V19.988H0V17.988Z'
								fill='#828282'
							/>
						</svg>
					</span>
				</div>
				<ul className='list-disc pl-6 ContentEditable'>
					<ContentEditable
						innerRef={contentEditableRef}
						html={contentEditableState?.html}
						disabled={false}
						onChange={handleChange}
						onBlur={sanitize}
						tagName='span'
					/>
				</ul>
			</div>
		</div>
	)
}

export default NoteBox
