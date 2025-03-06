import { useLayoutEffect, useState } from 'react';
import axios from 'axios';
import { Button, H1, Loader } from '../components';
import { ProfileResponce } from '../types';
import { PORT } from '../constants';
import { useAuth } from '../providers';

export const Profile = () => {
	const [userName, setUserName] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const { token, userMail } = useAuth();

	useLayoutEffect(() => {
		axios
			.post<{ success: boolean; data: ProfileResponce }>(`${PORT}/profile?token=${token}`, { userMail }
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
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const userInitials = userName?.split(' ').map(substr => substr.slice(0,1)).join('');

	return (
		<section>
			<div className='flex gap-10'>
			<div className='w-24 h-24 bg-gray-100 rounded-[100%] flex flex-col items-center justify-center text-4xl font-medium'>
				{userInitials}
			</div>
			<div className='flex flex-col gap-2'>
				<H1>Welcome, {userName}!</H1>
				<Button buttonStyle='fill'>Update</Button>
			</div>
			</div>
			<div className='mt-6'>quote</div>
		</section>
	);
};
