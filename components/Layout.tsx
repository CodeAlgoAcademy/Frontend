import React, { ReactNode } from "react"
import Head from "next/head"

interface Props {
	children?: ReactNode
}
const Layout = ({ children }: Props) => {
	return (
		<div>
			<Head>
				<title>CodeAlgo Academy</title>
			</Head>
			<main>{children}</main>
		</div>
	)
}

export default Layout
