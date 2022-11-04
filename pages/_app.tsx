import { Provider } from "react-redux"
import { store, persistor } from "../store/store"
import { PersistGate } from "redux-persist/integration/react"
import { Layout } from "../components"

import "../styles/globals.css"
import "../styles/GeneralNav.css"
import type { AppProps } from "next/app"

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</PersistGate>
		</Provider>
	)
}
export default MyApp
