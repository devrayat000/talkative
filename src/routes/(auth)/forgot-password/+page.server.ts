import client from '$lib/pocketbase/client';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { forgotpasswordEmail } from './validation';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const email = formData.get('email')?.toString();

		const parsed = forgotpasswordEmail.safeParse({ email });

		if (!parsed.success) {
			return fail(400, { email, ...parsed.error.flatten() });
		}

		await client.collection('users').requestPasswordReset(parsed.data.email);

		return { success: true };
	}
};
