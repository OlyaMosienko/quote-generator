import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	buttonStyle?: 'border' | 'fill';
}

export const Button = ({
	buttonStyle = 'border',
	type = 'button',
	children,
	...rest
}: ButtonProps) => {
	const styles =
		buttonStyle === 'border'
			? 'max-w-max px-3 py-1.5 bg-transparent border-2 border-gray-200 rounded-md hover:bg-blue-500 hover:border-blue-500 hover:text-white cursor-pointer'
			: 'max-w-max px-3 py-1.5 bg-blue-500 text-white border-2 border-blue-500 rounded-md hover:bg-transparent hover:border-gray-200 hover:text-black cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

	return (
		<button className={styles} type={type} {...rest}>
			{children}
		</button>
	);
};
