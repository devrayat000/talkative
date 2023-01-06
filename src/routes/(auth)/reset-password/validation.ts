import { z } from 'zod';

export const resetpasswordBaseSchema = z.object({
	password: z
		.string({ required_error: 'Password is required!' })
		.min(8, 'Password too small!')
		.max(32, 'Password too large!'),
	passwordConfirm: z.string()
});

export const resetpasswordSchema = resetpasswordBaseSchema
	.extend({
		passwordResetToken: z.string()
	})
	.refine((arg) => arg.password === arg.passwordConfirm, {
		path: ['passwordConfirm'],
		message: 'Passwords did not match!'
	});
