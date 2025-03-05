import { http, HttpResponse } from 'msw';

export const handlers = [
	http.get('http://localhost:5000/info', () => {
		return HttpResponse.json({
			success: true,
			data: { content: 'Some information about the <b>company</b>.' },
		});
	}),
];
