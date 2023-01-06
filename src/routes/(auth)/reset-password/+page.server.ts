import client from '$lib/pocketbase/client';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { resetpasswordSchema } from './validation';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const token = formData.get('token')?.toString();
		const password = formData.get('password')?.toString();
		const passwordConfirm = formData.get('passwordConfirm')?.toString();

		const parsed = resetpasswordSchema.safeParse({
			token,
			password,
			passwordConfirm
		});

		if (!parsed.success) {
			return fail(400, {
				password,
				passwordConfirm,
				...parsed.error.flatten()
			});
		}

		const success = await client
			.collection('users')
			.confirmPasswordReset(
				parsed.data.passwordResetToken,
				parsed.data.password,
				parsed.data.passwordConfirm
			);

		return { success };
	}
};
