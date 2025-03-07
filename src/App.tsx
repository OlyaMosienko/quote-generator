import { Navigate, Route, Routes } from 'react-router-dom';
import { Authentication, Home, Profile } from './pages';
import { NavPanel, ProtectedRoute } from './components';
import { useAuth } from './providers';

export const App = () => {
	const { token } = useAuth();

	return (
		<main className="container max-w-4/6 min-h-screen mx-auto px-4 py-12 font-sans text-gray-950">
			<NavPanel />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Authentication />} />
				<Route
					path="/profile"
					element={
						<ProtectedRoute token={token}>
							<Profile />
						</ProtectedRoute>
					}
				/>
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</main>
	);
};
