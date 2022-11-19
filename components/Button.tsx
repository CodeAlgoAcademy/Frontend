import React from "react"

const Button = ({ text, color }: { text: string; color: string }) => {
	return (
		<button type='button' style={ { backgroundColor: color } } className='min-w-[130px] font-bold h-[44px] text-white rounded-3xl px-8 hover:opacity-80'>
			{ text }
		</button>
	)
}

export default Button
