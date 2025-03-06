import { Navigate } from 'react-router-dom';
import { ProtectedRouteProps } from '../types';

export const ProtectedRoute = ({
	token,
	redirectPath = '/',
	children,
}: ProtectedRouteProps) => {
	if (!token) {
		return <Navigate to={redirectPath} replace />;
	}

	return children;
};
