import client from '$lib/pocketbase/client';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { resetpasswordSchema } from './validation';

export const load: PageServerLoad = async ({ url }) => {
	if (!url.searchParams.has('passwordResetToken')) {
		return redirect(302, '/forgot-password');
	}
	return { success: true };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const passwordResetToken = formData.get('passwordResetToken')?.toString();
		const password = formData.get('password')?.toString();
		const passwordConfirm = formData.get('passwordConfirm')?.toString();

		const parsed = resetpasswordSchema.safeParse({
			passwordResetToken,
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

		if (success) {
			return redirect(303, '/login');
		}

		return { success };
	}
};
