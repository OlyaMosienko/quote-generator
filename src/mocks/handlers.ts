import { delay, http, HttpResponse } from 'msw';

const URL = 'http://localhost:5000';

export const handlers = [
	http.get(`${URL}/info`, async () => {
		await delay(1500);

		return HttpResponse.json({
			success: true,
			data: { content: 'Some information about the <b>company</b>.' },
		});
	}),
];
