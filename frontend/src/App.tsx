import { Provider } from "react-redux";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/Home";
import store from "./store/store";

const globalStyles = `
	html, body, #root {
		height: 100%;
	}

	body {
		margin: 0;
		background-color: black;
	}
`;

function App(): JSX.Element {
	return (
		<Provider store={store}>
				<HashRouter>
						<main>
							<style>{globalStyles}</style>
							<Routes>
								<Route path="/home" element={<HomePage/>}/>
								<Route path="*" element={<Navigate to="/home" replace={true}/>}/>
							</Routes>
						</main>
				</HashRouter>
		</Provider>
	);
}

export default App;