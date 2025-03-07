import { ReactNode } from 'react';
import { Button } from './Button';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
			<div className="bg-white rounded-sm p-7 w-full max-w-md relative">
				{children}
				<Button buttonStyle="fill" onClick={onClose}>
					Close
				</Button>
			</div>
		</div>
	);
};
