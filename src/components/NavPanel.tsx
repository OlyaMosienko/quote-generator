import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../providers';
import { Button } from './Button';
import { PORT } from '../constants';

export const NavPanel = () => {
	const navigate = useNavigate();
	const [error, setError] = useState('');
	const { token, logout } = useAuth();

	const onSignOut = () => {
		axios
			.delete(`${PORT}/logout?token=${token}`)
			.then(() => {
				sessionStorage.removeItem('token');
				logout();
			})
			.catch((error) => {
				setError(error.message);
			})
			.finally(() => navigate('/'));
	};

	return (
		<nav className="flex gap-1.5 items-center mb-10">
			<Button onClick={() => navigate('/')}>About us</Button>
			{token ? (
				<>
					<Button onClick={() => navigate('/profile')}>Profile</Button>
					<Button onClick={onSignOut}>Sign out</Button>
				</>
			) : (
				<Button onClick={() => navigate('/login')}>Sign in</Button>
			)}
			{error && <p className="text-red-500">{error}</p>}
		</nav>
	);
};
