import { ReactNode } from 'react';

export const H1 = ({ children }: { children: ReactNode }) => {
	return <h1 className="text-4xl font-medium">{children}</h1>;
};
