import { QuoteProps } from '../types';

export const Quote = ({ quote, quoteAuthor, error }: QuoteProps) => {
	if (error) {
		return <p className="text-red-500">{error}</p>;
	}

	if (quote && quoteAuthor) {
		return (
			<p>
				<em>&#171;{quote}&#187;</em> &#8212;&nbsp;{quoteAuthor}
			</p>
		);
	}

	return null;
};
