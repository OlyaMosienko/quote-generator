import { ReactNode } from 'react';

interface H1Props {
	children: ReactNode;
}

export const H1 = ({ children }: H1Props) => {
	return <h1 className="text-4xl font-medium">{children}</h1>;
};
