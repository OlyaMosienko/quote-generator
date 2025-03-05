import { JSX } from 'react';

export const formatTextToHTML = (text: string): JSX.Element => {
	const parts = text.split(/(<b>.*?<\/b>|<i>.*?<\/i>)/g);

	return (
		<>
			{parts.map((part, index) =>
				part.match(/<b>(.*?)<\/b>/) ? (
					<strong key={index}>{part.replace(/<\/?b>/g, '')}</strong>
				) : part.match(/<i>(.*?)<\/i>/) ? (
					<em key={index}>{part.replace(/<\/?i>/g, '')}</em>
				) : (
					part
				),
			)}
		</>
	);
};
