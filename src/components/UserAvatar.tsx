import { UserAvatarProps } from '../types';

export const UserAvatar = ({ userName }: UserAvatarProps) => {
	const userInitials = userName
		?.split(' ')
		.map((substr) => substr.slice(0, 1))
		.join('');

	return (
		<div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-4xl font-medium">
			{userInitials}
		</div>
	);
};
