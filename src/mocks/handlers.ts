import { delay, http, HttpResponse } from 'msw';
import db from '../db.json';
import { PORT } from '../constants';
import { LoginRequest, ProfileResponce } from '../types';

export const handlers = [
	// /info
	http.get(`${PORT}/info`, async () => {
		await delay(1500);

		const content = db.info.content;

		return HttpResponse.json({
			success: true,
			data: { info: content },
		});
	}),

	// /login
	http.post(`${PORT}/login`, async ({ request }) => {
		await delay(1500);

		const { email, password } = (await request.json()) as LoginRequest;

		const user = db.profiles.find(
			(u) => u.email === email && u.password === password,
		);

		if (user) {
			return HttpResponse.json({
				success: true,
				data: { token: Math.random().toString(36).substring(2) },
			});
		} else {
			return HttpResponse.json({
				success: false,
				data: { message: 'User not found' },
			});
		}
	}),

	// /logout
	http.delete(`${PORT}/logout`, async ({ request }) => {
		await delay(500);

		const token = new URL(request.url).searchParams.get('token');

		if (!token) {
			return HttpResponse.json(
				{
					success: false,
					message: 'Token is missing',
				},
				{ status: 401 },
			);
		}

		return HttpResponse.json({
			success: true,
			data: {},
		});
	}),

	// /profile
	http.post(`${PORT}/profile`, async ({ request }) => {
		await delay(500);

		const { userMail } = (await request.json()) as ProfileResponce;
		const token = new URL(request.url).searchParams.get('token');

		if (!token) {
			return HttpResponse.json(
				{
					success: false,
					message: 'Token is missing',
				},
			);
		}

		const user = db.profiles.find(
			(u) => u.email === userMail,
		);

		if (user) {
			return HttpResponse.json({
				success: true,
				data: { fullname: user.fullname, userMail },
			});
		} else {
			return HttpResponse.json({
				success: false,
				data: { message: 'User not found' },
			});
		}
	}),
];
