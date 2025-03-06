import { useState, ReactNode } from 'react';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [token, setToken] = useState<string | null>(sessionStorage.getItem('token'));
	const [userMail, setUserMail] = useState<string | null>(sessionStorage.getItem('userMail'));

	const login = (token: string, mail: string) => {
		sessionStorage.setItem('token', token);
		sessionStorage.setItem('userMail', mail);
		setToken(token);
		setUserMail(mail);
	};

	const logout = () => {
		sessionStorage.removeItem('token');
		sessionStorage.removeItem('userMail');
		setToken(null);
		setUserMail(null);
	};

	return (
		<AuthContext.Provider value={{ token, userMail, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
