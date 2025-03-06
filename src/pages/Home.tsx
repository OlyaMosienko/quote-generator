import { useEffect, useState } from 'react';
import axios from 'axios';
import { H1, Loader } from '../components';
import { formatTextToHTML } from '../helpers';
import { InfoResponse } from '../types';
import { PORT } from '../constants';

export const Home = () => {
	const [aboutContent, setAboutContent] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		axios
			.get<{ success: boolean; data: InfoResponse }>(`${PORT}/info`)
			.then((response) => {
				if (response.data.success) {
					setAboutContent(response.data.data.info);
				} else {
					setError('Error loading information :(');
				}
			})
			.catch(() => setError('Request failed :('))
			.finally(() => setIsLoading(false));
	}, []);

	return (
		<section>
			<H1>Little story about the company</H1>
			{isLoading ? (
				<Loader />
			) : (
				<article className="mt-6">
					{error ? (
						<p className="text-red-500">{error}</p>
					) : (
						<p>{aboutContent && formatTextToHTML(aboutContent)}</p>
					)}
				</article>
			)}
		</section>
	);
};
