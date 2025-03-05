import { useNavigate } from 'react-router-dom';
import { Button } from './Button';

export const NavPanel = () => {
	const navigate = useNavigate();

	return (
		<nav className="flex gap-1.5 items-center mb-10">
			<Button onClick={() => navigate('/')}>About us</Button>
			<Button onClick={() => navigate('/profile')}>Profile</Button>
			<Button onClick={() => navigate('/login')}>Sign in</Button>
		</nav>
	);
};
