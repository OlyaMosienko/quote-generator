import { useState, useEffect } from 'react';
import axios from 'axios';
import { PORT } from '../constants';
import { useAuth } from '../providers';
import { ProfileResponce } from '../types';

export const useProfile = () => {
	const [userName, setUserName] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const { token, userMail } = useAuth();

	useEffect(() => {
		axios
			.post<{ success: boolean; data: ProfileResponce }>(
				`${PORT}/profile?token=${token}`,
				{ userMail },
			)
			.then((response) => {
				if (response.data.success) {
					setUserName(response.data.data.fullname);
				} else {
					setError('Error loading information :(');
				}
			})
			.catch(() => setError('Request failed :('))
			.finally(() => setIsLoading(false));
	}, [token, userMail]);

	return { userName, isLoading, error };
};
