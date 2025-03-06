import { ReactNode } from 'react';
import { AuthResponce } from './AuthResponce';

export interface ProtectedRouteProps extends AuthResponce {
	redirectPath?: string;
	children: ReactNode;
}
