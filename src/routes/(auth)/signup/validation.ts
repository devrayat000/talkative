import { z } from 'zod';

export const signupSchema = z
	.object({
		name: z
			.string({ required_error: 'Name is required!' })
			.trim()
			.min(6, 'Name too small!')
			.max(64, 'Name too large!'),
		email: z
			.string({ required_error: 'Email is required!' })
			.trim()
			.min(1, 'Email is required!')
			.email('Invalid email!'),
		password: z
			.string({ required_error: 'Password is required!' })
			.min(8, 'Password too small!')
			.max(32, 'Password too large!'),
		passwordConfirm: z.string()
	})
	.refine((arg) => arg.password === arg.passwordConfirm, {
		path: ['passwordConfirm'],
		message: 'Passwords did not match!'
	});
