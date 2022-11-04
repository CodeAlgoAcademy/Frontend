import React from "react"

const Button = ({ text, color }: { text: string; color: string }) => {
	return (
		<button type='button' style={{ backgroundColor: color }} className='w-[180px] font-bold h-[44px] text-white rounded-3xl'>
			{text}
		</button>
	)
}

export default Button
