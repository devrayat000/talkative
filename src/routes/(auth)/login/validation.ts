import { z } from 'zod';

export const loginSchema = z.object({
	identity: z
		.string({ required_error: 'Username or Email is required!' })
		.trim()
		.min(1, 'Username or Email is required!'),
	password: z
		.string({ required_error: 'Password is required!' })
		.min(1, 'Password is required!')
});
