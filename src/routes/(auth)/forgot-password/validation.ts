import { z } from 'zod';

export const forgotpasswordSchema = z.object({
	email: z
		.string({ required_error: 'Email is required!' })
		.trim()
		.email('Invalid Email!')
});
