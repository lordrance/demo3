import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import store from "./store/index.ts";
import Designer from "./views/designer/index.tsx";
import Home from "./views/home/index.tsx";

const App = () => {
	return (
		<BrowserRouter>
			<Provider store={store}>
				<Routes>
					<Route path="/" element={<Navigate to="/home" />} />
					<Route path="/home/*" element={<Home />} />
					<Route path="/designer" element={<Designer />} />
				</Routes>
			</Provider>
		</BrowserRouter>
	);
};

export default App;
