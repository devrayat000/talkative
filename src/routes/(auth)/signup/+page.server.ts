import client from '$lib/pocketbase/client';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { signupSchema } from './validation';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const name = formData.get('name')?.toString();
		const email = formData.get('email')?.toString();
		const password = formData.get('password')?.toString();
		const passwordConfirm = formData.get('passwordConfirm')?.toString();

		const parsed = signupSchema.safeParse({
			name,
			email,
			password,
			passwordConfirm
		});

		if (!parsed.success) {
			return fail(400, {
				name,
				email,
				password,
				passwordConfirm,
				...parsed.error.flatten()
			});
		}

		await client.collection('users').create({
			...parsed.data,
			emailVisibility: true
		});
		await client.collection('users').requestVerification(parsed.data.email);

		return { success: true };
	}
};
