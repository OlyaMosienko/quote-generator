import { useState } from 'react';
import axios from 'axios';
import { PORT } from '../constants';
import { useAuth } from '../providers';

export const useQuote = () => {
	const [quote, setQuote] = useState<string | null>(null);
	const [quoteAuthor, setQuoteAuthor] = useState<string | null>(null);
	const [message, setMessage] = useState('Step 1: Requesting author...');
	const [error, setError] = useState<string | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [controller, setController] = useState<AbortController | null>(null);

	const { token } = useAuth();

	const fetchQuote = async () => {
		if (!token) return;
		setError(null);
		setQuote(null);
		setIsModalOpen(true);

		const newController = new AbortController();
		setController(newController);

		setMessage('Step 1: Requesting author...');

		try {
			const authorResponse = await axios.get<{
				success: boolean;
				data: { authorId: number; name: string };
			}>(`${PORT}/author?token=${token}`, { signal: newController.signal });

			if (!authorResponse.data.success) {
				throw new Error('Error loading author');
			}

			const { authorId, name } = authorResponse.data.data;
			setMessage(
				'Step 1: Requesting author... Completed!\nStep 2: Requesting quote...',
			);

			const quoteResponse = await axios.get<{
				success: boolean;
				data: { quote: string };
			}>(`${PORT}/quote?token=${token}&authorId=${authorId}`, {
				signal: newController.signal,
			});

			if (!quoteResponse.data.success) {
				throw new Error('Error loading quote');
			}

			setQuote(quoteResponse.data.data.quote);
			setQuoteAuthor(name);
			setMessage(
				'Step 1: Requesting author... Completed!\nStep 2: Requesting quote... Completed!',
			);
		} catch (err) {
			if (axios.isCancel(err)) {
				setError('Operation canceled by the user.');
			} else {
				setError('Request failed');
			}
		} finally {
			setIsModalOpen(false);
		}
	};

	const closeModal = () => {
		setIsModalOpen(false);
		if (controller) {
			controller.abort();
		}
	};

	return { quote, quoteAuthor, message, error, isModalOpen, fetchQuote, closeModal };
};
