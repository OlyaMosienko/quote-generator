import * as yup from 'yup';

export const authFormSchema = yup.object().shape({
	email: yup
		.string()
		.email()
		.required('Email is required')
		.min(7, 'Email should be more than 7 sumbols')
		.max(30, 'Email can not be more than 30 sumbols'),
	password: yup.string().required().min(6).max(30),
});
