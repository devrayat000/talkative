import { z } from 'zod';

export const forgotpasswordEmail = z.object({
	email: z
		.string({ required_error: 'Email is required!' })
		.trim()
		.min(1, 'Email is required!')
});
