import { Provider } from "react-redux";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/Home";
import InfoPage from "./pages/Info";

import LeftNavbar from "./components/UIComponents/LeftNavbar/LeftNavbar";
import PageFooter from "./components/UIComponents/PageFooter/PageFooter";

import store from "./store/store";

import "./sass/base-styles/base-styles.scss";
import "./sass/common-styles/common-styles.scss";
import "./sass/utility-classes/utility-classes.scss";

function App(): JSX.Element {
	return (
		<Provider store={store}>
				<HashRouter>
					<main className="app">
						<LeftNavbar />
						<Routes>
							<Route path="/home" element={<HomePage/>}/>
							<Route path="/info" element={<InfoPage/>}/>
							<Route path="*" element={<Navigate to="/home" replace={true}/>}/>
						</Routes>
						<PageFooter />
					</main>
				</HashRouter>
		</Provider>
	);
}

export default App;
