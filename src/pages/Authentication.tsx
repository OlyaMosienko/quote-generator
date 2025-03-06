import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useAuth } from '../providers';
import { authFormSchema } from '../schemas';
import { LoginRequest, AuthResponce } from '../types';
import { Button, Loader } from '../components';
import { PORT } from '../constants';

export const Authentication = () => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	});
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();
	const { login } = useAuth();

	const onSubmit = ({ email, password }: LoginRequest) => {
		setIsLoading(true);

		axios
			.post<{ success: boolean; data: AuthResponce }>(`${PORT}/login`, {
				email,
				password,
			})
			.then((response) => {
				if (response.data.success) {
					const token = response.data.data.token;

					if (token) {
						sessionStorage.setItem('token', JSON.stringify(token));
						login(token, email);
						navigate('/profile');
					} else {
						setError('Token is missing in the response');
					}
				} else {
					setError(
						response.data.data.message || 'Error loading information :(',
					);
				}
			})
			.catch(() => setError('Authentication failed :('))
			.finally(() => {
				setIsLoading(false);
			});

		reset();
	};

	const formError = errors?.email?.message || errors?.password?.message;

	return (
		<>
			<form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
				<label className="flex flex-col gap-1">
					Email address
					<input
						className="px-3 py-1.5 bg-transparent border-2 border-gray-200 rounded-md"
						type="text"
						placeholder="Enter Email"
						{...register('email')}
					/>
					{errors?.email?.message ? (
						<span className="text-xs text-red-500">
							{errors?.email?.message}
						</span>
					) : (
						<span className="text-xs text-gray-500">
							We&apos;ll never share your email with anyone else
						</span>
					)}
				</label>
				<label className="flex flex-col gap-1">
					Password
					<input
						className="px-3 py-1.5 bg-transparent border-2 border-gray-200 rounded-md"
						type="password"
						placeholder="Password"
						{...register('password')}
					/>
					{errors?.password?.message && (
						<span className="text-xs text-red-500">
							{errors?.password?.message}
						</span>
					)}
				</label>
				<Button type="submit" buttonStyle="fill" disabled={!!formError}>
					Submit
				</Button>
				{isLoading && <Loader />}
			</form>
			{error && <span className="text-xs text-red-500">{error}</span>}
		</>
	);
};
