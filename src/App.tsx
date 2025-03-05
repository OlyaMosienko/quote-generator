import { Navigate, Route, Routes } from 'react-router-dom';
import { Home } from './pages';
import { NavPanel } from './components';

export const App = () => {
	return (
		<main className="container max-w-4/6 min-h-screen mx-auto px-4 py-12 font-sans text-gray-950">
			<NavPanel />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<div>Login</div>} />
				<Route path="/profile" element={<div>Profile</div>} />
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</main>
	);
};
