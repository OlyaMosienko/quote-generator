import { useEffect, useState } from 'react';
import axios from 'axios';
import { H1 } from '../components';
import { formatTextToHTML } from '../helpers';

interface InfoResponse {
	content: string;
}

export const Home = () => {
	const [aboutContent, setAboutContent] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		axios
			.get<{ success: boolean; data: InfoResponse }>('http://localhost:5000/info')
			.then((response) => {
				console.log(response);

				if (response.data.success) {
					setAboutContent(response.data.data.content);
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
				<div className="mt-6">Loading...</div>
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
