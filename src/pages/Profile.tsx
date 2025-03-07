import { Button, H1, Modal, Quote, UserAvatar } from '../components';
import { useProfile, useQuote } from '../hooks';

export const Profile = () => {
	const { userName, isLoading, error: profileError } = useProfile();
	const {
		quote,
		quoteAuthor,
		fetchQuote,
		isModalOpen,
		closeModal,
		error: quoteError,
		message,
	} = useQuote();

	return (
		<section>
			<div className="flex gap-10">
				<UserAvatar userName={userName} />
				<div className="flex flex-col gap-2">
					{isLoading ? (
						<H1>
							Welcome,{' '}
							<span className="inline-block h-10 w-20 bg-gray-100"></span>!
						</H1>
					) : (
						<H1>Welcome, {userName}!</H1>
					)}
					<Button buttonStyle="fill" onClick={fetchQuote}>
						Update
					</Button>
				</div>
			</div>
			<div className="mt-6">
				<Quote
					quote={quote}
					quoteAuthor={quoteAuthor}
					error={quoteError || profileError}
				/>
			</div>

			<Modal isOpen={isModalOpen} onClose={closeModal}>
				<H1>Requesting the quote</H1>
				<div className="my-5">
					<p className="whitespace-pre-line">{message}</p>
				</div>
			</Modal>
		</section>
	);
};
