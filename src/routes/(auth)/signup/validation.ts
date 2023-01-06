import { z } from 'zod';
import { forgotpasswordSchema } from '../forgot-password/validation';
import { resetpasswordBaseSchema } from '../reset-password/validation';

export const signupSchema = z
	.object({
		name: z
			.string({ required_error: 'Name is required!' })
			.trim()
			.min(6, 'Name too small!')
			.max(64, 'Name too large!')
	})
	.merge(forgotpasswordSchema)
	.merge(resetpasswordBaseSchema)
	.refine((arg) => arg.password === arg.passwordConfirm, {
		path: ['passwordConfirm'],
		message: 'Passwords did not match!'
	});
