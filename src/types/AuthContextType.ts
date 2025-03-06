export interface AuthContextType {
	token: string | null;
	userMail: string | null;
	login: (token: string, userMail: string) => void;
	logout: () => void;
}
